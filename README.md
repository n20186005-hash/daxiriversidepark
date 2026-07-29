# DaxiRiversidePark.com

大溪河濱公園的單頁旅遊指南。網站使用台灣繁體中文、官方實景照片，技術為 Astro + Tailwind CSS + TypeScript，部署至 Cloudflare Workers。

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

- 首頁、404 與 sitemap 採靜態預渲染，部署後由 Cloudflare 靜態資產層快速提供。
- `/api/health.json` 保持動態渲染，用於確認 Cloudflare Worker 正常運作。
- 頁面內容直接維護於 TypeScript／Astro 檔案，不連接資料庫或 CMS。
- 實景照片全部放在 `public/images/`，不依賴第三方圖片外連。

## 部署到 Cloudflare Workers

```bash
pnpm exec wrangler login
pnpm deploy
```

部署完成後，在 Cloudflare Dashboard 的 Workers & Pages → Custom domains 加入：

- `daxiriversidepark.com`
- `www.daxiriversidepark.com`（建議 301 轉址到無 www）

## 內容維護

核心內容位於：

- `src/pages/index.astro`
- `src/data/site.ts`
- `src/styles/global.css`

照片位於 `public/images/`，來源說明見 `PHOTO-CREDITS.md`。

## Worker 健康檢查

部署後可訪問：

```text
/api/health.json
```

用於確認 Worker 與網站版本狀態。

完整檢查狀態與工作環境限制請見 `VALIDATION.md`。
