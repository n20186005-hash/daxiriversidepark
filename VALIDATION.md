# 專案檢查紀錄

檢查日期：2026-07-29

## 已完成

- Astro 元件 frontmatter 與頁面內 TypeScript 語法解析
- `.ts` 檔案 TypeScript 語法解析
- Astro／HTML／SVG 標籤平衡檢查
- 所有 `/images/` 本機素材引用存在性檢查
- 站內錨點與目標 `id` 對應檢查
- 台灣繁體中文常見簡體字掃描
- 正式網域、照片出處、靜態預渲染與 Worker 動態端點檢查

可隨時執行不依賴第三方套件的來源檢查：

```bash
node scripts/validate-source.mjs
```

## 尚需在可連線 npm registry 的環境執行

本工作環境無法連線 public npm registry，因此不能下載 Astro、Tailwind CSS 與 Cloudflare adapter，未能在此環境完成真正的 `pnpm install`／`pnpm build`。取得專案後請執行：

```bash
corepack enable
pnpm install
pnpm validate:source
pnpm check
pnpm build
```

依賴版本已固定在 `package.json`，避免安裝時被自動升級到未經核對的主版本。
