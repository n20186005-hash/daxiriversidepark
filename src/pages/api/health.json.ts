import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({
      ok: true,
      site: 'daxiriversidepark.com',
      runtime: 'cloudflare-workers',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    }),
    {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store',
      },
    },
  );
};
