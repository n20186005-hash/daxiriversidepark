# 專案檢查紀錄

檢查日期：2026-10-12

## 已完成

- Astro 元件 frontmatter 與頁面內 TypeScript 語法解析
- `.ts` 檔案 TypeScript 語法解析
- Astro／HTML／SVG 標籤平衡檢查
- 所有 `/images/` 本機素材引用存在性檢查
- 站內錨點與目標 `id` 對應檢查（逐頁解析，支援跨頁 `/#anchor`）
- 共用元件（`Header`、`Footer`）不得使用裸 `#anchor`，避免在主題專頁失效
- 台灣繁體中文常見簡體字掃描
- 正式網域、照片出處、靜態預渲染與 Worker 動態端點檢查
- 天氣模組結構檢查（建議引擎、風險提醒、7 日預報、官方開放資料來源）
- 單車與停車主題區塊、`Park` 結構化資料與 301 轉址守衛檢查
- 三個主題專頁的存在性、靜態預渲染、共用版型、交叉內鏈與頁內目錄對應檢查
- `public/sitemap.xml` 是否收錄首頁與三個主題專頁
- `public/sitemap.xml` 保持唯一來源，不得同時存在 `src/pages/sitemap.xml.ts`（Astro 會跳過路由並在建置時警告）

可隨時執行不依賴第三方套件的來源檢查：

```bash
node scripts/validate-source.mjs
```

## 尚需在支援的 Node 版本環境執行

本工作環境的 Node 為 18.14.0，低於 Astro 要求的 `>=22.12.0`，且安裝新版 Node 被系統拒絕（`EPERM`），因此無法在此環境執行 `astro check` 與 `astro build`，只完成來源檢查與編輯器診斷。請在 Node 22.12 以上版本執行：

```bash
corepack enable
pnpm install
pnpm validate:source
pnpm check
pnpm build
```

依賴版本已固定在 `package.json`，避免安裝時被自動升級到未經核對的主版本。
