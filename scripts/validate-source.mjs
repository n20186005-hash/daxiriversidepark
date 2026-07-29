import { readFile, readdir, stat } from 'node:fs/promises';
import { extname, join, relative, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
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
  'src/pages/api/health.json.ts',
  'src/styles/global.css',
  'public/robots.txt',
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
const componentSources = [...contents.entries()]
  .filter(([file]) => file.endsWith('.astro'))
  .map(([, content]) => content)
  .join('\n');
const ids = new Set([...componentSources.matchAll(/\bid=["'`]([^"'`{]+)["'`]/g)].map((match) => match[1]));
const anchors = new Set([...componentSources.matchAll(/\bhref=["'`]#([^"'`]+)["'`]/g)].map((match) => match[1]));
for (const anchor of anchors) {
  if (!ids.has(anchor)) problems.push(`找不到站內錨點目標：#${anchor}`);
}
notes.push(`已核對 ${anchors.size} 個站內錨點`);

const simplifiedToTraditional = {
  这: '這', 为: '為', 个: '個', 们: '們', 来: '來', 后: '後', 里: '裡', 进: '進', 从: '從', 还: '還',
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

const visibleFiles = [...contents.entries()].filter(([file]) =>
  file.endsWith('.astro') || file.endsWith(`${join('data', 'site.ts')}`) || file.endsWith('manifest.webmanifest'),
);
for (const [file, content] of visibleFiles) {
  const found = Object.keys(simplifiedToTraditional).filter((char) => content.includes(char));
  if (found.length) problems.push(`疑似簡體字：${relative(root, file)}（${found.join('、')}）`);
}

if (!indexSource.includes('export const prerender = true')) problems.push('首頁未設定為靜態預渲染');
if (!allSource.includes('export const prerender = false')) problems.push('未找到 Worker 動態端點');

if (problems.length) {
  console.error('來源檢查失敗：');
  for (const problem of problems) console.error(`- ${problem}`);
  process.exit(1);
}

console.log('來源檢查通過。');
for (const note of notes) console.log(`- ${note}`);
console.log(`- 已掃描 ${textFiles.length} 個文字檔案`);
console.log('- 已確認繁體語系、正式網域、照片標示與 Worker 端點');
