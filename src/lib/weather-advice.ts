import { describeWeather, toBeaufort } from './weather';

/**
 * 景點地理環境類型，對應「戶外景點環境別資料接入」規劃。
 * 新增景點時只需要在 TERRAIN_RULES 補一筆規則，建議引擎不需要改動。
 */
export type Terrain = 'river' | 'coastal' | 'mountain' | 'forest' | 'urban' | 'cave' | 'desert';

interface TerrainRule {
  label: string;
  /** 降雨時的風險與行程調整。 */
  rainRisk: string;
  /** 風大時的行程調整。 */
  windPlan: string;
  /** 高溫時的行程調整。 */
  heatPlan: string;
}

const TERRAIN_RULES: Record<Terrain, TerrainRule> = {
  river: {
    label: '河濱公園',
    rainRisk: '溪水與園區排水可能快速上升，請遠離水岸、低窪草地與濕滑的階梯坡道。',
    windPlan: '河濱空曠處風勢明顯，遮陽帳、風箏與輕便桌椅較不穩固。',
    heatPlan: '園區遮蔭有限，草地與廣場曝曬明顯，請縮短正午戶外時間。',
  },
  coastal: {
    label: '海岸地區',
    rainRisk: '海邊風雨較強，請遠離礁石、浪區與濕滑的海蝕平臺。',
    windPlan: '風浪偏大時，船班與水上活動可能停航停運。',
    heatPlan: '沙灘與礁石地表高溫，建議避開正午並補充足夠水分。',
  },
  mountain: {
    label: '山區與峽谷',
    rainRisk: '山區易有落石、土石鬆動與山洪，請不要進入溪谷與邊坡路段。',
    windPlan: '稜線與山頂風勢更強，纜車與吊橋可能停駛。',
    heatPlan: '山區日照強且補水不易，請提早出發並避開正午稜線。',
  },
  forest: {
    label: '森林與草原',
    rainRisk: '林道泥濘濕滑，落葉與土徑容易打滑，請留意腳步。',
    windPlan: '林間枯枝可能掉落，強風時避免停留在大樹下方。',
    heatPlan: '林間悶熱且蚊蟲較多，請備足飲水並做好防蚊。',
  },
  urban: {
    label: '城市街區',
    rainRisk: '市區積水與濕滑路面較多，過馬路與騎乘請放慢速度。',
    windPlan: '市區招牌、鷹架與路樹可能掉落，強風時避免在騎樓外側停留。',
    heatPlan: '市區熱島效應明顯，體感溫度偏高，建議多利用室內與騎樓空間。',
  },
  cave: {
    label: '溶洞',
    rainRisk: '洞內地面濕滑且可能滴水，請穿防滑鞋並留意洞內積水。',
    windPlan: '洞內不受風勢影響，但洞口與步道仍可能濕滑。',
    heatPlan: '洞內外溫差明顯，建議帶一件薄外套並注意進出時的身體調適。',
  },
  desert: {
    label: '沙丘與乾燥地形',
    rainRisk: '乾燥地形短時強降雨容易形成逕流與泥濘，請避開低窪處。',
    windPlan: '風勢強時容易揚沙，建議配戴護目鏡與口罩。',
    heatPlan: '地表溫度遠高於氣溫，請避開正午並準備充足飲水。',
  },
};

/** 大溪河濱公園位於大漢溪畔，屬河濱環境，另有自行車道、草地與戲水區。 */
export const PARK_TERRAIN: Terrain = 'river';

export const terrainLabel = (terrain: Terrain = PARK_TERRAIN): string => TERRAIN_RULES[terrain].label;

export interface AdviceInput {
  code: number;
  feelsLike: number;
  humidity: number;
  todayMax: number;
  todayMin: number;
  precipProb: number;
  precipSum: number;
  uvMax: number;
  windKmh: number;
  gustKmh: number;
}

export interface AdviceResult {
  summary: string;
  risks: string[];
  outfit: string[];
  plans: string[];
  items: string[];
}

const THUNDER = new Set([95, 96, 99]);
const HEAVY_RAIN = new Set([65, 66, 67, 82]);
const MODERATE_RAIN = new Set([63, 81]);
const LIGHT_RAIN = new Set([51, 53, 55, 56, 57, 61, 80]);
const SNOW = new Set([71, 73, 75, 77, 85, 86]);
const FOG = new Set([45, 48]);
const CLEAR = new Set([0, 1]);
const OVERCAST = new Set([2, 3]);

const push = (list: string[], text: string): void => {
  if (text && !list.includes(text)) list.push(text);
};

/**
 * 依天氣資料組合出遊客可直接執行的建議。
 * 不滿足條件的項目不會出現在結果中，由呼叫端決定顯示與否。
 */
export const buildAdvice = (
  input: AdviceInput,
  terrain: Terrain = PARK_TERRAIN,
  warnings: string[] = [],
): AdviceResult => {
  const outfit: string[] = [];
  const plans: string[] = [];
  const items: string[] = [];
  const risks: string[] = [];
  const rule = TERRAIN_RULES[terrain];

  const windLevel = toBeaufort(input.windKmh);
  const gustLevel = toBeaufort(input.gustKmh);
  const raining =
    LIGHT_RAIN.has(input.code) ||
    MODERATE_RAIN.has(input.code) ||
    HEAVY_RAIN.has(input.code) ||
    THUNDER.has(input.code);
  const heavy = HEAVY_RAIN.has(input.code) || input.precipSum >= 15;
  const moderate = MODERATE_RAIN.has(input.code) || input.precipSum >= 6;
  const drizzle = LIGHT_RAIN.has(input.code);
  const thunder = THUNDER.has(input.code);
  const snowy = SNOW.has(input.code);
  const foggy = FOG.has(input.code);
  const clear = CLEAR.has(input.code);
  const overcast = OVERCAST.has(input.code);
  const spread = input.todayMax - input.todayMin;
  const hot = input.todayMax >= 32 || input.feelsLike >= 34;
  const todayText = describeWeather(input.code, true).label;

  // 一、降水：先處理雷雨與強降雨，再處理一般降雨與降雨機率。
  if (thunder) {
    push(risks, '有雷陣雨，請不要在樹下、河堤空曠處或水邊停留，並盡快離開空曠草地。');
    push(plans, '雷雨期間水域活動與戲水區一律暫停，建議提前結束戶外行程。');
    push(items, '雨衣（雷雨時不建議使用長柄傘）');
    push(outfit, '攜帶輕便防水外套，避免穿全棉衣物淋濕後不易乾。');
  }
  if (heavy) {
    push(risks, '降雨較強，請避開河道、低窪處與濕滑的階梯、坡道。');
    push(plans, '不建議戶外活動，河濱自行車道與草地可能封閉或積水。');
    push(items, '雨衣（風大時不建議使用長柄傘）');
    push(outfit, '防水外套與止滑鞋，褲管避免拖地。');
  } else if (moderate) {
    push(plans, '雨勢中等，露天場地與遊具體驗較差，建議縮短戶外時間。');
    push(items, '摺疊傘或輕便雨衣');
    push(outfit, '防水外套與止滑鞋。');
  } else if (drizzle) {
    push(outfit, '有短暫小雨，地面濕滑請留意腳步。');
    push(plans, '露天設施與草地體驗較差，可先走有遮蔭的步道。');
    push(items, '摺疊傘');
  }
  if (!raining && input.precipProb >= 60) {
    push(outfit, '降雨機率偏高，外出請攜帶雨具備用。');
    push(plans, '行程先安排室內或有遮蔭的備案，戶外活動建議縮短。');
    push(items, '摺疊傘或輕便雨衣');
  } else if (!raining && input.precipProb >= 40) {
    push(items, '摺疊傘（午後可能短暫降雨）');
  }

  // 二、高溫與紫外線：所有提醒都改成口語說法，不出現專業術語。
  if (hot) {
    push(outfit, '氣溫偏高，建議穿輕薄、透氣的淺色衣物。');
    push(plans, rule.heatPlan);
    push(plans, '避開中午 11 點到下午 2 點，多利用樹蔭與涼亭休息。');
    push(items, '充足飲用水與防暑用品');
  }
  if (input.humidity >= 80 && input.feelsLike >= 31) {
    push(outfit, '濕度高、體感悶熱，建議選擇排汗材質並勤補水。');
  }
  if (input.uvMax >= 8) {
    push(outfit, '紫外線很強，請加強防曬並定時補擦。');
    push(items, '防曬乳、太陽眼鏡、遮陽帽');
  } else if (input.uvMax >= 5) {
    push(outfit, '紫外線偏強，外出請做好防曬。');
    push(items, '防曬乳、太陽眼鏡、遮陽帽');
  }

  // 三、低溫與日夜溫差。
  if (spread > 8) {
    push(outfit, '日夜溫差大，建議帶一件薄外套方便穿脫。');
  }
  if (input.todayMax <= 10) {
    push(outfit, '氣溫偏低，請注意保暖。');
    push(items, '厚外套與圍巾');
  }
  if (input.humidity >= 80 && input.todayMin <= 18) {
    push(outfit, '濕冷感受更明顯，建議加穿防風外層。');
  }

  // 四、風力：河濱、海邊等空曠環境影響特別大。
  if (windLevel >= 7 || gustLevel >= 9) {
    push(risks, '風勢強勁，請遠離看板、河堤與水岸邊坡等空曠處。');
    push(plans, '戶外水域活動與部分遊具可能暫停，出發前請先確認現場公告。');
    push(items, '建議改戴有繫帶的帽子，避免被強風吹落。');
  } else if (windLevel >= 5) {
    push(outfit, '風力偏大，建議加穿防風外套，不建議穿寬鬆長裙。');
    push(plans, rule.windPlan);
  }

  // 五、晴天與陰天的行程取向。
  if (!raining && clear) {
    push(
      plans,
      hot ? '天氣晴朗但偏熱，建議清晨或傍晚再進行草地活動。' : '天氣晴朗，很適合草地野餐、散步與看夕陽。',
    );
  } else if (!raining && overcast) {
    push(plans, '陰天沒有強烈曝曬，光線柔和，很適合拍照與長時間散步。');
  }

  // 六、霧與霾：影響能見度與觀景品質。
  if (foggy) {
    push(risks, '有霧，能見度不佳，開車請減速並開啟頭燈。');
    push(plans, '霧氣影響能見度，較不適合遠眺或拍攝開闊景觀。');
    push(items, '口罩');
  }

  // 七、降雪或結冰。
  if (snowy) {
    push(risks, '有降雪或結冰可能，地面濕滑請小心行走。');
    push(items, '保暖手套與防滑鞋');
  }

  // 八、環境別加值：同一份天氣資料在不同地形會有不同風險。
  if (raining) push(risks, rule.rainRisk);
  if (warnings.length) {
    push(risks, '氣象警報生效期間請以中央氣象署最新公告為準，並優先調整行程、避開危險區域。');
  }

  if (!plans.length) push(plans, '天氣沒有明顯風險，可依原定行程安排戶外活動。');
  if (!outfit.length) push(outfit, '氣溫與風勢平穩，平常的戶外穿著即可。');
  if (!items.length) push(items, '飲用水與個人防曬用品。');

  const bits = [`今天${todayText}，氣溫 ${Math.round(input.todayMin)}–${Math.round(input.todayMax)}°C`];
  if (raining || input.precipProb >= 50) bits.push(`降雨機率 ${Math.round(input.precipProb)}%`);
  if (input.uvMax >= 6) bits.push('紫外線偏強');
  if (windLevel >= 5) bits.push(`平均風力約 ${windLevel} 級`);
  if (spread > 8) bits.push(`日夜溫差約 ${Math.round(spread)} 度`);

  const summary = warnings.length
    ? `氣象警報生效中（${warnings.join('、')}）。${bits.join('，')}，請優先調整行程。`
    : `${bits.join('，')}。`;

  return { summary, risks, outfit, plans, items };
};
