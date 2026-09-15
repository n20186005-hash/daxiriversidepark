import { defineMiddleware } from 'astro:middleware';

/**
 * 正式網域轉址守衛。
 *
 * 搜尋資料顯示 http://daxiriversidepark.com/ 仍有曝光，代表未強制 HTTPS，
 * 會讓 http 與 https、www 與非 www 各自累積訊號，造成權重分散。
 *
 * 注意：首頁為靜態預渲染，會由 Cloudflare 靜態資產層直接回應，
 * 不一定經過 Astro middleware。本檔是動態路徑（例如 /api/*）的保險，
 * 主要仍須在 Cloudflare 開啟「Always Use HTTPS」並設定 www 轉址規則。
 */
const CANONICAL_HOST = 'daxiriversidepark.com';
const WWW_HOST = `www.${CANONICAL_HOST}`;
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]']);

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);

  // 本機開發與預覽不做轉址，避免 http://localhost 被導向 https 而無法開發。
  if (LOCAL_HOSTS.has(url.hostname)) return next();
  if (!url.hostname.endsWith(CANONICAL_HOST)) return next();

  if (url.protocol === 'http:' || url.hostname === WWW_HOST) {
    url.protocol = 'https:';
    url.hostname = CANONICAL_HOST;
    url.port = '';
    return context.redirect(url.toString(), 301);
  }

  return next();
});
