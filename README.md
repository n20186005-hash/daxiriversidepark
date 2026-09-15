# DaxiRiversidePark.com

大溪河濱公園的旅遊指南：一個總覽首頁，加上停車、單車、設施三個主題專區。網站使用台灣繁體中文、官方實景照片，技術為 Astro + Tailwind CSS + TypeScript，部署至 Cloudflare Workers。

## 技術規格

- Astro 7（Server output）
- Tailwind CSS 4（Vite plugin）
- TypeScript strict
- Cloudflare adapter / Workers runtime
- pnpm
- 無資料庫、無登入、無 CMS
- 原生 JavaScript 互動，零前端框架 hydration

## 本機開發

```bash
corepack enable
pnpm install
pnpm dev
```

開啟 `http://localhost:4321`。

## 檢查與建置

```bash
pnpm validate:source
pnpm check
pnpm build
pnpm preview
```


## 架構說明

- 首頁、三個主題專頁（`/parking`、`/bike`、`/facilities`）、404 與 sitemap 皆採靜態預渲染，部署後由 Cloudflare 靜態資產層快速提供。
- 主題專頁共用 `src/layouts/GuideLayout.astro`，統一處理麵包屑、頁內目錄、相關專區、FAQ 與 CTA，避免三頁各寫一套版型。
- 導覽（`Header`）與頁尾（`Footer`）使用絕對路徑：首頁區塊寫成 `/#weather`，主題專頁寫成 `/parking`，因此在任何頁面都不會失效。
- `/api/health.json` 與 `/api/weather.json` 保持動態渲染，於 Cloudflare Worker 上執行。
- 頁面內容直接維護於 TypeScript／Astro 檔案，不連接資料庫或 CMS。
- 實景照片全部放在 `public/images/`，不依賴第三方圖片外連。
- `public/sitemap.xml` 為手寫靜態檔，也是 sitemap 的唯一來源（`robots.txt` 早已宣告此路徑），新增頁面時請同步更新；不要再建立 `src/pages/sitemap.xml.ts`，同名時 Astro 會跳過該路由並在建置時警告。

## 天氣模組

首頁 `#weather` 區塊提供即時觀測、可執行建議與未來 7 天預報。

- **預報資料**：Open-Meteo（`https://api.open-meteo.com/v1/forecast`），免金鑰、CC BY 4.0。免費方案僅供非商業用途，商業使用請依 Open-Meteo 官方方案辦理。
- **請求路徑**：瀏覽器只呼叫本站 `/api/weather.json`，由 Worker 代理上游 API。這同時符合 `public/_headers` 的 CSP `connect-src 'self'`，也避免第三方金鑰或網域暴露在前端。
- **建議引擎**：`src/lib/weather-advice.ts` 依天氣條件與景點環境別輸出「出行穿搭／遊玩安排／隨身物品／風險提醒」。不滿足條件的項目不會輸出，不下雨就不會出現雨具建議。
- **環境別擴充**：`Terrain` 已定義 `river`、`coastal`、`mountain`、`forest`、`urban`、`cave`、`desert`。新增景點只要在 `TERRAIN_RULES` 補一筆規則，建議引擎不需修改。
- **快取**：端點回應 `s-maxage=1800`（30 分鐘），大幅降低上游請求量。
- **容錯**：上游逾時或異常時，端點回傳 `503`，前端顯示替代訊息，不影響頁面其餘內容。

### 啟用中央氣象署氣象警報（選用）

未設定金鑰時，警報區塊自動隱藏，其餘天氣建議照常運作。

1. 至 <https://opendata.cwa.gov.tw/> 註冊並取得 API 金鑰。
2. 於 Cloudflare 專案 **Settings → Build → Variables and Secrets** 新增建置期變數 `CWA_API_KEY`。
3. 重新部署即生效。金鑰於建置時寫入 Worker 端程式碼，不會傳送到瀏覽器。

## 部署到 Cloudflare Workers

專案使用 `@astrojs/cloudflare` adapter（SSR / `output: 'server'`），**部署前必須先執行 `astro build` 產生 `dist/`**，否則 `wrangler deploy` 會報 `entry-point file not found`。

本地一鍵部署（已內建先 build 再 deploy）：

```bash
pnpm exec wrangler login
pnpm deploy
```

### 透過 Cloudflare Git 整合 / CI 部署（重要）

CI 的 deploy command 若直接是 `npx wrangler deploy`，**不會**自動執行構建（`wrangler.jsonc` 裡的 `build.command` 僅供 `wrangler dev`，`wrangler deploy` 不觸發）。請在 Cloudflare 專案 **Settings → Builds & deployments** 設定：

- **Build command（構建命令）**：`pnpm run build`
- **Deploy command（部署命令）**：`npx wrangler deploy`（或改為 `pnpm run deploy`）

設定完成後重新觸發部署即可。環境需具備 `pnpm`（lockfile 為 pnpm）。

部署完成後，在 Cloudflare Dashboard 的 Workers & Pages → Custom domains 加入：

- `daxiriversidepark.com`
- `www.daxiriversidepark.com`（建議 301 轉址到無 www）

## 內容維護

核心內容位於：

- `src/pages/index.astro`（全站總覽）
- `src/pages/parking.astro`、`src/pages/bike.astro`、`src/pages/facilities.astro`（主題專區）
- `src/data/site.ts`（景點資料、`topicPages` 專頁設定、各頁 FAQ 與表格資料）
- `src/styles/global.css`

照片位於 `public/images/`，來源說明見 `PHOTO-CREDITS.md`。

## SEO 與搜尋曝光

依 Search Console 近 3 個月資料調整（流量集中於行動裝置、需求集中在「停車場」與「租腳踏車」、品牌詞排名偏後、桌面端 CTR 為 0）：

- **標題與摘要**：`src/data/site.ts` 的 `title` 以品牌主關鍵字「大溪河濱公園」開頭，並帶入「免費停車場」「YouBike 與腳踏車租借」「海盜船遊具」。`description` 為繁體中文並附英文別名；OG／Twitter 的標題與描述直接沿用同一組文字，避免搜尋引擎取用到與中文查詢語意不符的英文摘要。
- **H1**：首頁 H1 改為單一文字節點「大溪河濱公園」，不再用 `<br>` 拆字、也不再附加「（大溪）」；關鍵字副標改由獨立的 `<p>` 承載。
- **主題內容模組**：首頁 `#transport` 保留「停車場與入口資訊」表（資料：`parkingGuide`）並改為摘要；`#bike` 只留三張取得車輛方式的卡片。深入內容移到三個主題專頁，首頁每段都以關鍵字化的錨文字連過去。
- **FAQ**：各頁 FAQ 都會逐題輸出到頁面與 `FAQPage` JSON-LD。首頁用 `faqs`（含停車車位、租車管道、騎到大溪老街時間、寵物規定等），主題專頁各自用 `parkingFaqs`、`bikeFaqs`、`facilitiesFaqs`。
- **結構化資料**：`src/layouts/BaseLayout.astro` 以 `['TouristAttraction', 'Park']` 標示地標，並附 `amenityFeature`（停車場、廁所、YouBike、遊戲場、野餐草地等）、`hasMap` 與 `sameAs`，強化與 Google 地圖地標的對應。未採用 `LocalBusiness`：公園不是營業場所，錯用型別可能被判定為資料不一致。
- **麵包屑**：`BreadcrumbList` 改由各頁提供，可見麵包屑與結構化資料共用同一組 `breadcrumbs` 資料，兩者不會不一致。
- **站內連結**：導覽與頁尾全部改用絕對路徑；`scripts/validate-source.mjs` 會逐頁解析錨點，並強制共用元件使用 `/#anchor`，避免在主題專頁上點到失效的錨點。

### 多頁主題叢集

Search Console 顯示需求集中在三組查詢，因此把首頁的相關段落各自獨立成頁，用獨立標題與 FAQ 把主題做深：

| 頁面 | 對應查詢 | 主要內容 |
| --- | --- | --- |
| `/parking` | 大溪河濱公園停車場、大溪停車場、河濱免費停車 | 10 列停車資訊表、停車時段建議、入口導航 4 步驟、替代停車比較、大眾運輸、現場注意事項 |
| `/bike` | 大溪河濱公園租腳踏車、騎 youbike、自行車道 | 三種取得車輛方式、車型與費用比較、5 條路線時間表、兒童自行車訓練場、安全裝備 |
| `/facilities` | 大溪河濱公園海盜船、附近公園、寵物草皮 | 設施逐項說明、海盜船遊戲場、廁所與遮陽、草地與野餐規範、開放時間與費用、園內沒有的設施 |

- 內鏈結構：首頁 `#topics` 區塊 → 三個專頁；專頁底部「接著看其他主題」互相內鏈；三個專頁皆有連回首頁與導航按鈕。
- 內容分工：首頁維持總覽與導覽價值（`parkingGuide` 前 5 列仍在首頁），完整內容放專頁，降低兩頁內容重複。

### 強制 HTTPS 與統一 www（需在 Cloudflare 設定）

`http://daxiriversidepark.com/` 仍有曝光，代表未強制 HTTPS。首頁是靜態預渲染，不會經過 Astro middleware，因此以 Cloudflare 設定為主、`src/middleware.ts` 為輔：

1. **SSL/TLS → Edge Certificates** 開啟 **Always Use HTTPS**。
2. **Rules → Redirect Rules** 新增規則：`Hostname equals www.daxiriversidepark.com` → 動態重新導向至 `https://daxiriversidepark.com`（保留路徑），狀態碼 `301`。
3. `src/middleware.ts` 會對動態路徑（例如 `/api/*`）再做一次相同的 301，並自動略過 `localhost`，不影響本機開發。

## Worker 健康檢查

部署後可訪問：

```text
/api/health.json
```

用於確認 Worker 與網站版本狀態。

完整檢查狀態與工作環境限制請見 `VALIDATION.md`。
