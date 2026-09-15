import { site } from '../data/site';

/** 前端與伺服器共用的天氣圖示種類，對應 `Icon.astro` 的圖示名稱。 */
export type WeatherKind = 'sun' | 'moon' | 'cloud-sun' | 'cloud' | 'fog' | 'rain' | 'thunder' | 'snow';

export const WEATHER_SOURCE = {
  name: 'Open-Meteo',
  url: 'https://open-meteo.com/',
  license: 'CC BY 4.0',
  note: '數值天氣預報來自 Open-Meteo 開放資料，依 CC BY 4.0 授權標示來源。',
} as const;

export const ALERT_SOURCE = {
  name: '中央氣象署開放資料平臺',
  url: 'https://opendata.cwa.gov.tw/',
  note: '氣象警特報來自中央氣象署開放資料平臺，需設定 CWA_API_KEY 才會顯示。',
} as const;

const FORECAST_ENDPOINT = 'https://api.open-meteo.com/v1/forecast';
const ALERT_ENDPOINT = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/W-C0033-002';
const TAIPEI_OFFSET_MS = 8 * 60 * 60 * 1000;
const WEEKDAY_LABELS = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'] as const;

interface WmoEntry {
  label: string;
  kind: WeatherKind;
}

/** WMO 天氣代碼對照，取自 Open-Meteo 文件，並改寫為遊客看得懂的中文。 */
const WMO_CODES: Record<number, WmoEntry> = {
  0: { label: '晴朗', kind: 'sun' },
  1: { label: '晴時多雲', kind: 'cloud-sun' },
  2: { label: '多雲', kind: 'cloud' },
  3: { label: '陰天', kind: 'cloud' },
  45: { label: '有霧', kind: 'fog' },
  48: { label: '有霧', kind: 'fog' },
  51: { label: '毛毛雨', kind: 'rain' },
  53: { label: '毛毛雨', kind: 'rain' },
  55: { label: '毛毛雨', kind: 'rain' },
  56: { label: '凍雨', kind: 'rain' },
  57: { label: '凍雨', kind: 'rain' },
  61: { label: '小雨', kind: 'rain' },
  63: { label: '陣雨', kind: 'rain' },
  65: { label: '大雨', kind: 'rain' },
  66: { label: '凍雨', kind: 'rain' },
  67: { label: '凍雨', kind: 'rain' },
  71: { label: '小雪', kind: 'snow' },
  73: { label: '下雪', kind: 'snow' },
  75: { label: '大雪', kind: 'snow' },
  77: { label: '米雪', kind: 'snow' },
  80: { label: '陣雨', kind: 'rain' },
  81: { label: '陣雨', kind: 'rain' },
  82: { label: '強陣雨', kind: 'rain' },
  85: { label: '陣雪', kind: 'snow' },
  86: { label: '強陣雪', kind: 'snow' },
  95: { label: '雷陣雨', kind: 'thunder' },
  96: { label: '雷陣雨伴冰雹', kind: 'thunder' },
  99: { label: '雷陣雨伴冰雹', kind: 'thunder' },
};

export const describeWeather = (code: number, isDay = true): WmoEntry => {
  const entry = WMO_CODES[code] ?? { label: '天氣資訊更新中', kind: 'cloud' as WeatherKind };
  if (!isDay && (entry.kind === 'sun' || entry.kind === 'cloud-sun')) {
    return { label: entry.label, kind: 'moon' };
  }
  return entry;
};

/** 蒲福風級分界（公里／小時），索引即風級。 */
const BEAUFORT_LIMITS = [1, 6, 12, 20, 29, 39, 50, 62, 75, 89, 103, 118];

export const toBeaufort = (kmh: number): number => {
  if (!Number.isFinite(kmh) || kmh <= 0) return 0;
  for (let index = 0; index < BEAUFORT_LIMITS.length; index += 1) {
    if (kmh < BEAUFORT_LIMITS[index]) return index;
  }
  return 12;
};

export const windLevelLabel = (level: number): string => {
  if (level >= 8) return '強風';
  if (level >= 7) return '風很強';
  if (level >= 6) return '風大';
  if (level >= 5) return '風偏大';
  if (level >= 4) return '和風';
  if (level >= 2) return '微風';
  return '幾乎無風';
};

export const uvLabel = (uv: number): string => {
  if (uv >= 11) return '極強';
  if (uv >= 8) return '很強';
  if (uv >= 6) return '強';
  if (uv >= 3) return '中等';
  return '弱';
};

export interface WeatherDay {
  date: string;
  label: string;
  weekday: string;
  short: string;
  code: number;
  kind: WeatherKind;
  text: string;
  max: number;
  min: number;
  precipProb: number;
  precipSum: number;
  uvMax: number;
  windKmh: number;
  windLevel: number;
  gustKmh: number;
  gustLevel: number;
  sunrise: string;
  sunset: string;
}

export interface WeatherNow {
  temp: number;
  feelsLike: number;
  humidity: number;
  code: number;
  kind: WeatherKind;
  text: string;
  isDay: boolean;
  windKmh: number;
  windLevel: number;
  gustKmh: number;
  gustLevel: number;
}

export interface WeatherSnapshot {
  updatedAt: string;
  timezone: string;
  now: WeatherNow;
  today: WeatherDay;
  days: WeatherDay[];
}

interface OpenMeteoResponse {
  timezone?: string;
  current?: {
    temperature_2m?: number;
    relative_humidity_2m?: number;
    apparent_temperature?: number;
    is_day?: number;
    weather_code?: number;
    wind_speed_10m?: number;
    wind_gusts_10m?: number;
  };
  daily?: {
    time?: string[];
    weather_code?: number[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    precipitation_sum?: number[];
    precipitation_probability_max?: number[];
    uv_index_max?: number[];
    wind_speed_10m_max?: number[];
    wind_gusts_10m_max?: number[];
    sunrise?: string[];
    sunset?: string[];
  };
}

interface CwaResponse {
  records?: {
    location?: {
      hazardConditions?: {
        hazards?: {
          info?: { phenomena?: string; significance?: string };
        }[];
      };
    }[];
  };
}

const asNumber = (value: unknown, fallback = 0): number =>
  typeof value === 'number' && Number.isFinite(value) ? value : fallback;

const at = (values: unknown, index: number): unknown =>
  Array.isArray(values) ? (values as unknown[])[index] : undefined;

const timeOf = (value: unknown): string => {
  if (typeof value !== 'string') return '';
  const [datePart, timePart] = value.split('T');
  if (!timePart) return '';
  return timePart.slice(0, 5) || datePart || '';
};

const dayOfWeek = (date: string): number => {
  const [year, month, day] = date.split('-').map(Number);
  if (!year || !month || !day) return 0;
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
};

const weekdayOf = (date: string): string => WEEKDAY_LABELS[dayOfWeek(date)] ?? '';

/** 以台北時區（UTC+8）輸出穩定且不依賴 ICU 的時間字串。 */
export const taipeiStamp = (date = new Date()): string => {
  const local = new Date(date.getTime() + TAIPEI_OFFSET_MS);
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${local.getUTCFullYear()}-${pad(local.getUTCMonth() + 1)}-${pad(local.getUTCDate())} ${pad(local.getUTCHours())}:${pad(local.getUTCMinutes())}`;
};

export const normalizeWeather = (payload: OpenMeteoResponse): WeatherSnapshot => {
  const daily = payload.daily ?? {};
  const dates = Array.isArray(daily.time) ? daily.time : [];
  if (dates.length === 0) throw new Error('天氣資料缺少逐日預報');

  const days: WeatherDay[] = dates.slice(0, 7).map((date, index) => {
    const code = asNumber(at(daily.weather_code, index), 0);
    const entry = describeWeather(code, true);
    const windKmh = asNumber(at(daily.wind_speed_10m_max, index));
    const gustKmh = asNumber(at(daily.wind_gusts_10m_max, index));
    const weekday = weekdayOf(date);
    const [, month, day] = date.split('-');
    return {
      date,
      label: index === 0 ? '今天' : index === 1 ? '明天' : weekday,
      weekday,
      short: month && day ? `${Number(month)}/${Number(day)}` : date,
      code,
      kind: entry.kind,
      text: entry.label,
      max: asNumber(at(daily.temperature_2m_max, index)),
      min: asNumber(at(daily.temperature_2m_min, index)),
      precipProb: asNumber(at(daily.precipitation_probability_max, index)),
      precipSum: asNumber(at(daily.precipitation_sum, index)),
      uvMax: asNumber(at(daily.uv_index_max, index)),
      windKmh,
      windLevel: toBeaufort(windKmh),
      gustKmh,
      gustLevel: toBeaufort(gustKmh),
      sunrise: timeOf(at(daily.sunrise, index)),
      sunset: timeOf(at(daily.sunset, index)),
    };
  });

  const current = payload.current ?? {};
  const code = asNumber(current.weather_code, days[0]?.code ?? 0);
  const isDay = asNumber(current.is_day, 1) === 1;
  const entry = describeWeather(code, isDay);
  const nowWind = asNumber(current.wind_speed_10m);
  const nowGust = asNumber(current.wind_gusts_10m);

  return {
    updatedAt: taipeiStamp(),
    timezone: payload.timezone ?? 'Asia/Taipei',
    now: {
      temp: asNumber(current.temperature_2m, days[0]?.max ?? 0),
      feelsLike: asNumber(current.apparent_temperature, days[0]?.max ?? 0),
      humidity: asNumber(current.relative_humidity_2m, 70),
      code,
      kind: entry.kind,
      text: entry.label,
      isDay,
      windKmh: nowWind,
      windLevel: toBeaufort(nowWind),
      gustKmh: nowGust,
      gustLevel: toBeaufort(nowGust),
    },
    today: days[0] as WeatherDay,
    days,
  };
};

export const fetchWeather = async (signal?: AbortSignal): Promise<WeatherSnapshot> => {
  const url = new URL(FORECAST_ENDPOINT);
  url.search = new URLSearchParams({
    latitude: site.coordinates.lat.toFixed(4),
    longitude: site.coordinates.lng.toFixed(4),
    timezone: 'Asia/Taipei',
    forecast_days: '7',
    wind_speed_unit: 'kmh',
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_gusts_10m',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,uv_index_max,wind_speed_10m_max,wind_gusts_10m_max,sunrise,sunset',
  }).toString();

  const response = await fetch(url, {
    signal: signal ?? AbortSignal.timeout(6000),
    headers: { accept: 'application/json' },
  });
  if (!response.ok) throw new Error(`天氣服務回應異常：${response.status}`);

  return normalizeWeather((await response.json()) as OpenMeteoResponse);
};

/**
 * 取得中央氣象署天氣警特報標題。
 * 未設定 API 金鑰或上游異常時一律回傳空陣列，確保前端只是「沒有警報」而非整塊壞掉。
 */
export const fetchOfficialAlerts = async (apiKey: string, signal?: AbortSignal): Promise<string[]> => {
  if (!apiKey.trim()) return [];
  try {
    const url = new URL(ALERT_ENDPOINT);
    url.search = new URLSearchParams({
      Authorization: apiKey.trim(),
      format: 'JSON',
      locationName: site.state,
    }).toString();

    const response = await fetch(url, {
      signal: signal ?? AbortSignal.timeout(5000),
      headers: { accept: 'application/json' },
    });
    if (!response.ok) return [];

    const payload = (await response.json()) as CwaResponse;
    const hazards = payload.records?.location?.[0]?.hazardConditions?.hazards ?? [];
    const titles = hazards
      .map((hazard) => {
        const phenomena = hazard.info?.phenomena?.trim() ?? '';
        const significance = hazard.info?.significance?.trim() ?? '';
        return `${phenomena}${significance}`.trim();
      })
      .filter((title) => title.length > 0);

    return [...new Set(titles)];
  } catch {
    return [];
  }
};
