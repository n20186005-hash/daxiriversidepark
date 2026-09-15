import type { APIRoute } from 'astro';
import { site } from '../../data/site';
import {
  ALERT_SOURCE,
  WEATHER_SOURCE,
  fetchOfficialAlerts,
  fetchWeather,
  uvLabel,
  windLevelLabel,
} from '../../lib/weather';
import { PARK_TERRAIN, buildAdvice } from '../../lib/weather-advice';

/** 這個端點必須在請求時才執行，才能取得即時天氣。 */
export const prerender = false;

/** 需要立即反映在建議中的現況天氣種類。 */
const ACTIVE_KINDS = new Set(['fog', 'rain', 'thunder', 'snow']);

const json = (body: unknown, status: number, headers: Record<string, string>): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...headers },
  });

/** 於建置時以環境變數方式提供；未設定時只會略過官方警報。 */
const readApiKey = (): string => {
  const env = import.meta.env as unknown as Record<string, unknown>;
  const value = env.CWA_API_KEY;
  return typeof value === 'string' ? value.trim() : '';
};

export const GET: APIRoute = async () => {
  try {
    const apiKey = readApiKey();
    const snapshot = await fetchWeather();
    const warnings = await fetchOfficialAlerts(apiKey);
    const { now, today, days } = snapshot;

    // 現況正在下雨、起霧或打雷時，以現況為準；否則用今日預報。
    const adviceCode = ACTIVE_KINDS.has(now.kind) ? now.code : today.code;

    const advice = buildAdvice(
      {
        code: adviceCode,
        feelsLike: now.feelsLike,
        humidity: now.humidity,
        todayMax: today.max,
        todayMin: today.min,
        precipProb: today.precipProb,
        precipSum: today.precipSum,
        uvMax: today.uvMax,
        windKmh: today.windKmh,
        gustKmh: today.gustKmh,
      },
      PARK_TERRAIN,
      warnings,
    );

    return json(
      {
        ok: true,
        updatedAt: snapshot.updatedAt,
        location: { name: site.fullName, lat: site.coordinates.lat, lng: site.coordinates.lng },
        now: {
          temp: now.temp,
          feelsLike: now.feelsLike,
          text: now.text,
          kind: now.kind,
          isDay: now.isDay,
          windText: `${now.windLevel} 級・${windLevelLabel(now.windLevel)}`,
        },
        today: {
          label: today.label,
          weekday: today.weekday,
          max: today.max,
          min: today.min,
          precipProb: today.precipProb,
          uvText: uvLabel(today.uvMax),
          windText: `${today.windLevel} 級・${windLevelLabel(today.windLevel)}`,
          sunrise: today.sunrise,
          sunset: today.sunset,
        },
        days: days.map((day) => ({
          date: day.date,
          label: day.label,
          short: day.short,
          weekday: day.weekday,
          kind: day.kind,
          text: day.text,
          max: day.max,
          min: day.min,
          precipProb: day.precipProb,
        })),
        warnings,
        alertsEnabled: apiKey.length > 0,
        advice,
        sources: [WEATHER_SOURCE, ALERT_SOURCE],
      },
      200,
      {
        'cache-control': 'public, max-age=600, s-maxage=1800, stale-while-revalidate=3600',
      },
    );
  } catch (error) {
    console.warn('[weather] 上游天氣服務異常', error instanceof Error ? error.message : error);
    return json({ ok: false, error: 'weather-unavailable' }, 503, {
      'cache-control': 'no-store',
    });
  }
};
