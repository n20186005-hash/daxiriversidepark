import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(import.meta.url);
const root = resolve(dirname(here), '..');
const problems = [];
const notes = [];

async function walk(directory) {
  const entries = await readdir(directory);
  const files = [];
  for (const entry of entries) {
    if (['node_modules', 'dist', '.git'].includes(entry)) continue;
    const path = join(directory, entry);
    const info = await stat(path);
    if (info.isDirectory()) files.push(...(await walk(path)));
    else files.push(path);
  }
  return files;
}

const files = await walk(root);
const relativeFiles = new Set(files.map((file) => relative(root, file).replaceAll('\\', '/')));
const required = [
  'package.json',
  'astro.config.ts',
  'wrangler.jsonc',
  'src/pages/index.astro',
  'src/pages/parking.astro',
  'src/pages/bike.astro',
  'src/pages/facilities.astro',
  'src/layouts/GuideLayout.astro',
  'src/components/Breadcrumbs.astro',
  'src/components/FaqList.astro',
  'src/components/TopicNav.astro',
  'src/middleware.ts',
  'src/pages/api/health.json.ts',
  'src/pages/api/weather.json.ts',
  'src/lib/weather.ts',
  'src/lib/weather-advice.ts',
  'src/components/Weather.astro',
  'src/styles/global.css',
  'public/robots.txt',
  'public/sitemap.xml',
  'public/manifest.webmanifest',
  'PHOTO-CREDITS.md',
];

for (const file of required) {
  if (!relativeFiles.has(file)) problems.push(`缺少必要檔案：${file}`);
}

const packageJson = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
if (packageJson.packageManager !== 'pnpm@10.13.1') problems.push('packageManager 未固定為 pnpm@10.13.1');
for (const dependency of ['astro', '@astrojs/cloudflare', 'tailwindcss', '@tailwindcss/vite']) {
  if (!packageJson.dependencies?.[dependency]) problems.push(`缺少依賴：${dependency}`);
}

const textFiles = files.filter((file) => ['.astro', '.ts', '.css', '.md', '.json', '.jsonc', '.xml', '.svg', '.webmanifest'].includes(extname(file)));
const contents = new Map();
for (const file of textFiles) contents.set(file, await readFile(file, 'utf8'));

const allSource = [...contents.entries()]
  .filter(([file]) => file.includes(`${join('src', '')}`))
  .map(([, content]) => content)
  .join('\n');

if (!allSource.includes('lang="zh-Hant-TW"')) problems.push('頁面語系未設定為 zh-Hant-TW');
if (!allSource.includes('daxiriversidepark.com')) problems.push('專案內未找到正式網域');
if (!allSource.includes('照片：桃園市政府工務局')) problems.push('頁面未顯示照片來源標示');

const imageRefs = new Set([...allSource.matchAll(/["'`](\/images\/[^"'`\s}]+)/g)].map((match) => match[1]));
for (const ref of imageRefs) {
  const local = `public${ref}`;
  if (!relativeFiles.has(local)) problems.push(`圖片引用不存在：${ref}`);
}
notes.push(`已核對 ${imageRefs.size} 個本機圖片引用`);

const remoteImageTags = [...allSource.matchAll(/<img\b[^>]*\bsrc=["']https?:\/\//gi)];
if (remoteImageTags.length) problems.push(`發現 ${remoteImageTags.length} 個外連 <img>，實景照片應本機化`);

const indexPath = join(root, 'src/pages/index.astro');
const indexSource = contents.get(indexPath) ?? '';
const astroSources = [...contents.entries()].filter(([file]) => file.endsWith('.astro'));
const isPageFile = (file) => file.includes(`${join('src', 'pages')}`);

// 每個 .astro 檔自己的區塊 id，以及它匯入的元件（用來解析頁面內的裸錨點）。
const idsByFile = new Map();
const importsByFile = new Map();
for (const [file, content] of astroSources) {
  idsByFile.set(file, new Set([...content.matchAll(/\bid=["'`]([^"'`{]+)["'`]/g)].map((match) => match[1])));
  importsByFile.set(
    file,
    [...content.matchAll(/from\s+['"]([^'"]+\.astro)['"]/g)].map((match) => resolve(dirname(file), match[1])),
  );
}

const ids = new Set([...idsByFile.values()].flatMap((set) => [...set]));

/** 遞迴收集某檔案加上它匯入的元件所擁有的區塊 id。 */
function scopeIds(file, seen = new Set()) {
  if (seen.has(file)) return new Set();
  seen.add(file);
  const scope = new Set(idsByFile.get(file) ?? []);
  for (const imported of importsByFile.get(file) ?? []) {
    for (const id of scopeIds(imported, seen)) scope.add(id);
  }
  return scope;
}

const homeScopeIds = scopeIds(indexPath);

// 共用元件會被所有頁面使用，裸錨點在子頁面可能失效，因此強制改用 /#anchor；
// 頁面檔的裸錨點則解析該頁自己的區塊 id + 它匯入的元件。
const sharedComponents = [
  join(root, 'src/components/Header.astro'),
  join(root, 'src/components/Footer.astro'),
];
let anchorCount = 0;
for (const [file, content] of astroSources) {
  // 同時涵蓋 href="…" 與導覽資料的 href: '…' 寫法，兩者都會產生實際連結。
  for (const match of content.matchAll(/\bhref(?::\s*|=)["'`]([^"'`]*)["'`]/g)) {
    const href = match[1];
    if (href.startsWith('/#')) {
      anchorCount += 1;
      if (!homeScopeIds.has(href.slice(2))) problems.push(`找不到首頁錨點目標：${relative(root, file)} → ${href}`);
      continue;
    }
    if (!href.startsWith('#')) continue;
    anchorCount += 1;
    if (sharedComponents.includes(file)) {
      problems.push(`共用元件請改用 /#${href.slice(1)}，避免在主題專頁失效：${relative(root, file)}`);
      continue;
    }
    if (!isPageFile(file)) continue;
    if (!scopeIds(file).has(href.slice(1))) {
      problems.push(`找不到頁內錨點目標：${relative(root, file)} → ${href}`);
    }
  }
}
notes.push(`已核對 ${anchorCount} 個站內錨點（含跨頁 /# 錨點）`);

const simplifiedToTraditional = {
  这: '這', 为: '為', 个: '個', 们: '們', 来: '來', 后: '後', 进: '進', 从: '從', 还: '還',
  发: '發', 长: '長', 开: '開', 关: '關', 门: '門', 车: '車', 场: '場', 时: '時', 点: '點', 页: '頁',
  现: '現', 见: '見', 过: '過', 与: '與', 无: '無', 应: '應', 气: '氣', 国: '國', 图: '圖', 区: '區',
  东: '東', 乐: '樂', 线: '線', 网: '網', 体: '體', 会: '會', 变: '變', 设: '設', 头: '頭', 儿: '兒',
  单: '單', 话: '話', 数: '數', 对: '對', 处: '處', 万: '萬', 边: '邊', 并: '並', 间: '間', 将: '將',
  爱: '愛', 实: '實', 写: '寫', 条: '條', 约: '約', 样: '樣', 经: '經', 许: '許', 动: '動', 归: '歸',
  览: '覽', 转: '轉', 园: '園', 导: '導', 户: '戶', 请: '請', 亲: '親', 费: '費', 达: '達', 读: '讀',
  听: '聽', 买: '買', 卖: '賣', 岁: '歲', 压: '壓', 况: '況', 绝: '絕', 选: '選', 阶: '階', 备: '備',
  类: '類', 骑: '騎', 弃: '棄', 态: '態', 维: '維', 统: '統', 标: '標', 观: '觀', 质: '質', 权: '權',
  历: '歷', 广: '廣', 层: '層', 阳: '陽',
};

// 「里」與「動」在臺灣官方地址（如「瑞興里」）與常用詞（如「活動」）中
// 屬於正確的繁體字，並非簡體字之誤用，不列入簡體字誤用判定。
delete simplifiedToTraditional.里;
delete simplifiedToTraditional.动;

// 使用者可見文字一律檢查簡體字誤用：頁面、元件、資料層與建議引擎都要涵蓋。
const visibleFiles = [...contents.entries()].filter(([file]) =>
  file.endsWith('.astro') || file.endsWith('.ts') || file.endsWith('manifest.webmanifest'),
);
for (const [file, content] of visibleFiles) {
  const found = Object.keys(simplifiedToTraditional).filter((char) => content.includes(char));
  if (found.length) problems.push(`疑似簡體字：${relative(root, file)}（${found.join('、')}）`);
}

if (!indexSource.includes('export const prerender = true')) problems.push('首頁未設定為靜態預渲染');
if (!allSource.includes('export const prerender = false')) problems.push('未找到 Worker 動態端點');

// 天氣模組：資料層須指向官方開放資料來源，端點須為動態，UI 須具備建議與 7 日預報區塊。
const weatherSource = contents.get(join(root, 'src/lib/weather.ts')) ?? '';
if (!weatherSource.includes('https://api.open-meteo.com')) problems.push('天氣資料層未指向 Open-Meteo 開放資料來源');
if (!weatherSource.includes('https://opendata.cwa.gov.tw')) problems.push('天氣資料層未標示中央氣象署警報來源');

const weatherAdvice = contents.get(join(root, 'src/lib/weather-advice.ts')) ?? '';
if (!weatherAdvice.includes('export const buildAdvice')) problems.push('天氣建議引擎未匯出 buildAdvice');
if (!weatherAdvice.includes('export type Terrain')) problems.push('天氣建議引擎未定義景點環境別型別');

const weatherComponent = contents.get(join(root, 'src/components/Weather.astro')) ?? '';
for (const marker of ['data-weather-risk-card', 'data-weather-day-template', 'data-advice-card']) {
  if (!weatherComponent.includes(marker)) problems.push(`天氣模組缺少區塊：${marker}`);
}
notes.push('已確認天氣模組（即時觀測、建議引擎、風險提醒、7 日預報）');

// SEO：品牌標題、地標結構化資料、主題區塊與轉址守衛。
const siteSource = contents.get(join(root, 'src/data/site.ts')) ?? '';
const titleMatch = siteSource.match(/title:\s*'([^']+)'/);
if (!titleMatch || !titleMatch[1].startsWith('大溪河濱公園')) {
  problems.push('網站標題未以品牌主關鍵字「大溪河濱公園」開頭');
}

const layoutSource = contents.get(join(root, 'src/layouts/BaseLayout.astro')) ?? '';
if (!layoutSource.includes("'@type': ['TouristAttraction', 'Park']")) {
  problems.push('結構化資料未標示 Park 型別，難以對應 Google 地圖地標');
}
if (!layoutSource.includes('amenityFeature')) problems.push('結構化資料缺少 amenityFeature 設施資訊');

const middlewareSource = contents.get(join(root, 'src/middleware.ts')) ?? '';
if (!middlewareSource.includes('301')) problems.push('middleware 未設定 301 轉址');
if (!middlewareSource.includes('localhost')) problems.push('middleware 未排除本機網域，會讓本機開發被轉址到 https');

for (const sectionId of ['weather', 'facilities', 'transport', 'bike']) {
  if (!ids.has(sectionId)) problems.push(`缺少主題區塊 id：${sectionId}`);
}

// 多頁架構：三個主題專頁各自成頁、靜態預渲染、使用共用版型，並互相內鏈。
const topicPaths = [...siteSource.matchAll(/path:\s*'(\/[a-z-]+)'/g)].map((match) => match[1]);
if (topicPaths.length !== 3) problems.push(`主題專區應為 3 個，實際設定 ${topicPaths.length} 個`);

for (const topicPath of topicPaths) {
  const pageFile = join(root, `src/pages${topicPath}.astro`);
  const pageSource = contents.get(pageFile) ?? '';
  if (!pageSource) {
    problems.push(`缺少主題專頁檔案：src/pages${topicPath}.astro`);
    continue;
  }
  if (!pageSource.includes('export const prerender = true')) problems.push(`${topicPath} 未設定為靜態預渲染`);
  if (!pageSource.includes('GuideLayout')) problems.push(`${topicPath} 未使用 GuideLayout，會缺少麵包屑與 FAQ`);
  if (!pageSource.includes(`topicId="${topicPath.slice(1)}"`)) problems.push(`${topicPath} 的 GuideLayout topicId 不相符`);

  const siblings = topicPaths.filter((path) => path !== topicPath);
  if (!siblings.some((sibling) => pageSource.includes(`href="${sibling}"`))) {
    problems.push(`${topicPath} 未與其他主題專頁互相內鏈`);
  }

  // 頁內目錄的 id 必須對應頁面中實際存在的區塊。
  const ownIds = idsByFile.get(pageFile) ?? new Set();
  for (const match of pageSource.matchAll(/id:\s*'([a-z0-9-]+)',\s*label:/g)) {
    if (!ownIds.has(match[1])) problems.push(`${topicPath} 目錄指向不存在的區塊：第 ${relative(root, pageFile)} → #${match[1]}`);
  }
}

// 主題專頁共同版型要負責麵包屑、回首頁與相關專區。
const guideLayoutSource = contents.get(join(root, 'src/layouts/GuideLayout.astro')) ?? '';
if (!guideLayoutSource.includes('href="/"')) problems.push('GuideLayout 未提供連回首頁總覽的連結');
for (const marker of ['Breadcrumbs', 'TopicNav', 'FaqList']) {
  if (!guideLayoutSource.includes(marker)) problems.push(`GuideLayout 未使用 ${marker} 元件`);
}

const sitemapSource = contents.get(join(root, 'public/sitemap.xml')) ?? '';
for (const path of ['/', ...topicPaths]) {
  if (!sitemapSource.includes(`<loc>https://daxiriversidepark.com${path}</loc>`)) {
    problems.push(`sitemap.xml 缺少 ${path}`);
  }
}
// public/sitemap.xml 與 src/pages/sitemap.xml.ts 同路徑時，Astro 會跳過路由並在建置時警告。
if (relativeFiles.has('src/pages/sitemap.xml.ts')) {
  problems.push('src/pages/sitemap.xml.ts 與 public/sitemap.xml 路徑衝突，請只保留其中一份');
}
notes.push('已確認品牌標題、Park 結構化資料、主題區塊與 301 轉址守衛');
notes.push('已確認三個主題專頁、交叉內鏈、頁內目錄與 sitemap.xml');

if (problems.length) {
  console.error('來源檢查失敗：');
  for (const problem of problems) console.error(`- ${problem}`);
  process.exit(1);
}

console.log('來源檢查通過。');
for (const note of notes) console.log(`- ${note}`);
console.log(`- 已掃描 ${textFiles.length} 個文字檔案`);
console.log('- 已確認繁體語系、正式網域、照片標示與 Worker 端點');
