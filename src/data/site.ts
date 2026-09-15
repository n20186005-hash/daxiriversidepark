export const site = {
  name: '大溪河濱公園旅遊指南',
  shortName: '大溪河濱公園',
  fullName: '大溪河濱公園',
  domain: 'DaxiRiversidePark.com',
  domainName: 'daxiriversidepark.com',
  canonical: 'https://daxiriversidepark.com/',
  // 標題以品牌主關鍵字開頭，並帶入搜尋需求最高的「免費停車場」「YouBike 與腳踏車租借」「海盜船遊具」。
  title: '大溪河濱公園｜免費停車場、YouBike 與腳踏車租借、海盜船遊具指南',
  description:
    '大溪河濱公園（Daxi Riverside Park）行前指南：免費停車場入口與離峰時段、YouBike 與腳踏車租借、海盜船兒童遊樂場、大草皮野餐與落羽松，含大溪老街交通與順遊建議。',
  shortDescription:
    '大溪河濱公園完整行前指南：免費停車、海盜船遊具、兒童單車訓練場、落羽松、野餐草地、廁所、交通與大溪老街順遊。',
  fullAddress: '335台灣桃園市大溪區瑞興里大鶯路60巷89弄75號',
  postalCode: '335',
  streetAddress: '桃園市大溪區瑞興里大鶯路60巷89弄75號',
  address: '桃園市大溪區大鶯路60巷89弄75號',
  city: '大溪區',
  state: '桃園市',
  country: '台灣',
  countryCode: 'TW',
  coordinates: { lat: 24.8932601, lng: 121.283638 },
  ga4Id: 'G-HXM22WWPKP',
  mapsUrl:
    'https://www.google.com/maps/place/%E5%A4%A7%E6%BA%AA%E6%B2%B3%E6%BB%A8%E5%85%AC%E5%9B%AD/@24.8932601,121.2810631,17z/data=!3m1!4b1!4m6!3m5!1s0x34681817b55e18cd:0x337e23894ae95017!8m2!3d24.8932601!4d121.283638!16s%2Fg%2F11gz9mcb1?entry=ttu&g_ep=EgoyMDI2MDcyNi4wIKXMDSoASAFQAw%3D%3D',
  placeUrl:
    'https://www.google.com/maps/place/%E5%A4%A7%E6%BA%AA%E6%B2%B3%E6%BB%A8%E5%85%AC%E5%9B%AD/@24.8932601,121.2810631,17z/data=!3m1!4b1!4m6!3m5!1s0x34681817b55e18cd:0x337e23894ae95017!8m2!3d24.8932601!4d121.283638!16s%2Fg%2F11gz9mcb1?entry=ttu&g_ep=EgoyMDI2MDcyNi4wIKXMDSoASAFQAw%3D%3D',
  reviewsUrl: 'https://maps.app.goo.gl/9PMZq1NvsTNJeERK6',
  officialUrl: 'https://www.taoyuan-parkgo.tw/parks/44',
  tourismUrl: 'https://travel.tycg.gov.tw/zh-tw/travel/attraction/598',
  updatedAt: '2026-09-15',
  ratingSyncedAt: '2026 年 9 月',
  imageCopyright: '本網站所展示的所有圖片產權及版權均歸原攝影者所有。',
  ratingSourceNote: '同步自 Google 地圖使用者評論，同步時間 2026 年 9 月；著作權歸原作者與 Google 地圖所有。',
} as const;

export const googleRating = {
  score: 4.4,
  count: 5379,
  source: 'Google 地圖使用者評論',
  syncedAt: '2026 年 9 月',
  reviewsUrl: 'https://maps.app.goo.gl/9PMZq1NvsTNJeERK6',
  placeUrl:
    'https://www.google.com/maps/place/%E5%A4%A7%E6%BA%AA%E6%B2%B3%E6%BB%A8%E5%85%AC%E5%9B%AD/@24.8932601,121.2810631,17z/data=!3m1!4b1!4m6!3m5!1s0x34681817b55e18cd:0x337e23894ae95017!8m2!3d24.8932601!4d121.283638!16s%2Fg%2F11gz9mcb1?entry=ttu&g_ep=EgoyMDI2MDcyNi4wIKXMDSoASAFQAw%3D%3D',
} as const;

export const nearbyLandmarks = [
  { name: '大溪橋', note: '日治時期鋼索吊橋，園區往老街的重要節點' },
  { name: '大溪老街', note: '巴洛克立面老街商圈，半日順遊的美食與伴手路段' },
] as const;

export const sources = [
  {
    label: '評分與評論',
    detail: '同步自 Google 地圖使用者評論，同步時間 2026 年 9 月；著作權歸原作者與 Google 地圖所有。',
    url: 'https://maps.app.goo.gl/9PMZq1NvsTNJeERK6',
    linkLabel: '在 Google 地圖查看全部評論',
  },
  {
    label: '官方園區資料',
    detail: '桃園市政府工務局「樂桃園 P@rk Go」公園頁面，用於核對設施、開放與維護資訊。',
    url: 'https://www.taoyuan-parkgo.tw/parks/44',
    linkLabel: '前往樂桃園 P@rk Go',
  },
  {
    label: '觀光導覽',
    detail: '桃園市政府觀光旅遊局「桃園觀光導覽網」，用於查詢區域景點與交通。',
    url: 'https://travel.tycg.gov.tw/zh-tw/travel/attraction/598',
    linkLabel: '前往桃園觀光導覽網',
  },
  {
    label: '政府資料開放',
    detail: '桃園市政府暨所屬機關網站「政府網站資料開放宣告」，照片與文字依其授權使用。',
    url: 'https://publicart.tyccc.gov.tw/open/',
    linkLabel: '查看資料開放宣告',
  },
  {
    label: '天氣與氣象警報',
    detail:
      '天氣預報資料來自 Open-Meteo 開放資料（CC BY 4.0）；氣象警報來自中央氣象署開放資料平臺。天氣資訊僅供行前參考，實際狀況以中央氣象署最新發布與現場公告為準。',
    url: 'https://opendata.cwa.gov.tw/',
    linkLabel: '前往中央氣象署開放資料平臺',
  },
] as const;

export const quickFacts = [
  { label: '門票', value: '免費入園', icon: 'ticket' },
  { label: '開放', value: '全區 24 小時', icon: 'clock' },
  { label: '停留', value: '建議 1.5–3 小時', icon: 'time' },
  { label: '適合', value: '親子・野餐・單車', icon: 'family' },
  { label: '設施', value: '停車場・廁所・YouBike', icon: 'facility' },
] as const;

export const highlights = [
  {
    eyebrow: '親子放電',
    title: '海盜船共融遊戲場',
    description:
      '海盜船主題遊具結合繩橋、攀爬與滑梯，周邊另有鳥巢鞦韆、旋轉盤、音樂牆板與傳聲筒等共融設施。官方標示多項遊具適齡為 2–12 歲，幼童仍需成人近距離陪同。',
    image: '/images/pirate-playground.webp',
    alt: `${site.fullName} 海盜船兒童遊戲場實景（${site.city}，${site.state}）`,
    tag: '2–12 歲',
  },
  {
    eyebrow: '大片綠地',
    title: '草地野餐與奔跑空間',
    description:
      '約 6.9 公頃的園區擁有開闊草地，適合鋪野餐墊、吹泡泡、踢球與散步。夏季草坪日照強，推薦上午或午後前往，並自行帶走垃圾。',
    image: '/images/riverside-lawn.webp',
    alt: `${site.fullName} 大片草地與樹林實景（${site.city}，${site.country}）`,
    tag: '野餐首選',
  },
  {
    eyebrow: '兩輪挑戰',
    title: '兒童自行車訓練場',
    description:
      '場內設有腳踏車越野與平衡挑戰區，適合已能穩定騎乘的孩子練習控制。建議自備單車、合格頭盔與護具；雨後地面濕滑時先改走草地散步。',
    image: '/images/green-lawn.webp',
    alt: `${site.fullName} 兒童自行車訓練場實景（${site.city}，${site.country}）`,
    tag: '自備頭盔',
  },
  {
    eyebrow: '季節拍照',
    title: '落羽松與 LOVE DAXI',
    description:
      '園內落羽松與紅色 LOVE DAXI 裝置是辨識度最高的拍照點。通常 12 月至翌年 1 月較有機會轉為金黃或橘紅，實際狀態仍受當年氣溫與降雨影響。',
    image: '/images/love-daxi.webp',
    alt: `${site.fullName} LOVE DAXI 草地裝置實景（${site.city}，${site.state}）`,
    tag: '秋冬限定',
  },
] as const;

export const facilities = [
  { title: '免費停車場', detail: '入口附近可停車；假日與落羽松季建議上午抵達。', icon: 'parking' },
  { title: '一般／無障礙廁所', detail: '官方設施資料列有一般廁所及無障礙廁所。', icon: 'restroom' },
  { title: 'YouBike 站', detail: '園區設有微笑單車站，租還車數量請以官方 App 即時資訊為準。', icon: 'bike' },
  { title: '遮陽休憩', detail: '有亭棚、樹蔭與座椅，但開闊草坪仍偏曬。', icon: 'shade' },
  { title: '共融遊具', detail: '包含鳥巢式鞦韆、旋轉盤、音樂牆板與傳聲筒等。', icon: 'inclusive' },
  { title: '自行車訓練場', detail: '提供兒童練習平衡與反應的戶外騎乘空間。', icon: 'training' },
] as const;

/**
 * 停車與入口資訊。
 * 搜尋資料顯示「大溪河濱公園停車場」是本站曝光與點擊最高的查詢，
 * 因此把費用、車位、入口、導航與替代方案集中在同一張表，利於被擷取為精選摘要。
 */
export const parkingGuide = [
  {
    item: '停車費用',
    value: '官方設施資料列有停車場，現有資訊多以免費停車場描述。',
    note: '是否收費、當日管制與接駁方式以現場最新告示為準。',
  },
  {
    item: '車位數量',
    value: '官方未公告固定車位數；現有資訊多以免費停車場描述。',
    note: '晴朗假日、活動日與落羽松季較容易客滿，建議上午 9 點前抵達。',
  },
  {
    item: '入口位置',
    value: '桃園市大溪區瑞興里大鶯路60巷89弄75號，入口位於巷道內。',
    note: '最後一段不像大型景區入口，請放慢車速並留意現場標線。',
  },
  {
    item: '導航方式',
    value: '直接以景點座標導航，不要只在大鶯路主線來回尋找入口。',
    note: '在 Google 地圖搜尋「大溪河濱公園」即可取得同一地點。',
  },
  {
    item: '替代停車',
    value: '大溪老街與大溪橋周邊另有停車場與路邊車格。',
    note: '連假或活動日可先停老街周邊，再步行或騎車進園。',
  },
] as const;

/**
 * 單車租借與路線。
 * 對應搜尋需求明確的「大溪河濱公園租腳踏車」、「YouBike」與「自行車道」查詢。
 * 園區未列出民營租車業者，因此不宣稱園內可租車，而是引導旅客先確認車型與營業時間。
 */
export const bikeGuide = {
  summary:
    '園區官方設施資料列出的是 YouBike 站；若需要兒童車、親子車或想租一整天，建議出發前先向大溪老街與大溪橋周邊的自行車店確認車型、營業時間與價格，避免到場才發現沒有適合的車輛。',
  options: [
    {
      icon: 'bike',
      title: '園區 YouBike 站（微笑單車）',
      detail: '園區設有 YouBike 站，可租借公共自行車。車輛與空柱會即時變動，出發前先查官方網站或 App 確認現場車況。',
      url: 'https://map.youbike.com.tw/search?location=大溪河濱公園',
      linkLabel: '查詢 YouBike 即時車況',
    },
    {
      icon: 'route',
      title: '大溪老街周邊自行車店',
      detail:
        '需要兒童車、親子車、協力車或想租一整天，多數旅客會在大溪老街、大溪橋一帶的自行車店租車後騎進園區。車型與價格各店不同，請先電話或訊息確認。',
      url: 'https://www.google.com/maps/search/%E5%A4%A7%E6%BA%AA%E8%80%81%E8%A1%97%20%E8%87%AA%E8%A1%8C%E8%BB%8A%E5%87%BA%E7%A7%9F',
      linkLabel: '在地圖查看租車店家',
    },
    {
      icon: 'training',
      title: '兒童自行車訓練場（建議自備車輛）',
      detail: '園區設有兒童自行車越野與平衡挑戰區。建議自行攜帶適合孩子尺寸的單車、合格頭盔與護具；雨後地面濕滑時先改走草地散步。',
      url: '',
      linkLabel: '',
    },
  ],
  routes: [
    {
      name: '園區 → 大溪橋 → 大溪老街',
      distance: '約 1.5–2 公里',
      time: '騎車約 10 分鐘',
      note: '最輕鬆的順遊路線，適合親子；假日人車較多請放慢速度。',
    },
    {
      name: '大鶯綠野景觀自行車道',
      distance: '依選擇路段而定',
      time: '依體力安排',
      note: '沿大漢溪河岸的景觀自行車道，坡度與交會路口以現場指標為準。',
    },
    {
      name: '園區內環狀騎乘',
      distance: '園區面積約 6.9 公頃',
      time: '約 15–25 分鐘',
      note: '草地與鋪面混合，幼童建議先在訓練場練習。',
    },
  ],
  tips: [
    '公共自行車的車輛與空柱即時變動，出發前先查官方 App。',
    '園區與自行車道都是開放空間，請配戴頭盔並靠右騎乘。',
    '雨後草地與鋪面濕滑，煞車距離變長，請降低車速。',
    '大溪老街假日人潮密集，騎車進入老街建議下車推行。',
  ],
} as const;

export const routes = [
  {
    id: 'quick',
    label: '60 分鐘',
    title: '快速散步路線',
    summary: '適合順路停留、拍照或讓孩子短暫放電。',
    steps: [
      { time: '0–10 分', title: '停車與整裝', text: '先確認廁所位置，準備飲水、防曬與兒童用品。' },
      { time: '10–35 分', title: '海盜船遊戲場', text: '從低難度互動設施開始，再視孩子能力挑戰攀爬區。' },
      { time: '35–50 分', title: 'LOVE DAXI 與草地', text: '沿草地散步，拍攝裝置與樹林景觀。' },
      { time: '50–60 分', title: '返回停車場', text: '補水、清點物品並帶走垃圾。' },
    ],
  },
  {
    id: 'family',
    label: '2 小時',
    title: '親子放電路線',
    summary: '遊具、單車、草地與休息兼顧，適合大多數家庭。',
    steps: [
      { time: '0–45 分', title: '海盜船與共融遊具', text: '先玩攀爬、滑梯、鞦韆與互動設施。' },
      { time: '45–80 分', title: '自行車挑戰區', text: '佩戴頭盔後練習平衡；場地濕滑則改為草地活動。' },
      { time: '80–105 分', title: '草地點心時間', text: '在樹蔭或亭棚附近休息，補充飲水與簡單點心。' },
      { time: '105–120 分', title: '落羽松散步', text: '前往 LOVE DAXI 與步道，完成全家合照。' },
    ],
  },
  {
    id: 'halfday',
    label: '半日',
    title: '野餐＋大溪順遊',
    summary: '上午玩公園，午後接續大溪老街與大溪橋。',
    steps: [
      { time: '09:00', title: '抵達公園', text: '避開正午曝曬，也較容易找到停車位。' },
      { time: '09:15–10:30', title: '親子遊具與單車', text: '依孩子體力安排海盜船、共融遊具與騎乘。' },
      { time: '10:30–11:30', title: '草地野餐與散步', text: '簡單野餐後走訪落羽松與園區步道。' },
      { time: '12:00 後', title: '前往大溪老街', text: '開車約數分鐘，接續老街午餐、大溪橋與中正公園。' },
    ],
  },
] as const;

export const ageGuide = [
  { activity: '大草地活動', toddler: '適合', child: '適合', older: '適合', note: '幼童仍需遠離道路與水域。' },
  { activity: '低層互動遊具', toddler: '陪同', child: '適合', older: '一般', note: '先確認現場標示與設施狀況。' },
  { activity: '海盜船攀爬區', toddler: '不建議', child: '陪同', older: '適合', note: '依身高、握力與平衡能力判斷。' },
  { activity: '自行車訓練場', toddler: '不建議', child: '視能力', older: '適合', note: '需自備頭盔，雨後不宜。' },
  { activity: '園區步道', toddler: '推車可', child: '適合', older: '適合', note: '水邊與木棧道須注意安全。' },
] as const;

export const nearbyTrips = [
  {
    title: '經典大溪半日',
    meta: '親子＋老街｜約 4–5 小時',
    stops: ['大溪河濱公園', '大溪橋', '大溪中正公園', '大溪老街'],
    description: '上午先讓孩子放電，中午再到老街吃飯，適合第一次造訪大溪。',
  },
  {
    title: '秋冬拍照路線',
    meta: '落羽松＋水岸｜約 3–4 小時',
    stops: ['大溪河濱公園', '月眉休閒農業區周邊', '大溪老街'],
    description: '以季節景觀、散步與拍照為主；出發前先查看近期落羽松照片。',
  },
  {
    title: '單車河岸路線',
    meta: '戶外運動｜依體力安排',
    stops: ['大溪河濱公園', '大鶯綠野景觀自行車道', '河岸節點'],
    description: '適合有騎乘經驗者；路線、坡度與道路交會請先查官方自行車資訊。',
  },
] as const;

export const faqs = [
  {
    question: '大溪河濱公園在哪裡？',
    answer: '大溪河濱公園位於桃園市大溪區瑞興里大鶯路60巷89弄75號，鄰近大溪老街與大溪橋，屬於免費開放的河濱公園。',
  },
  {
    question: '大溪河濱公園需要門票嗎？',
    answer: '不需要。桃園市政府官方公園資料標示為免費入園。園區內沒有售票處，也不是需要預約的商業景點。',
  },
  {
    question: '大溪河濱公園開放到幾點？',
    answer: '官方標示全區 24 小時開放，但園區屬戶外河濱環境，首次造訪、親子活動與拍照仍建議安排在日間。夜間照明、天候或臨時維護請以現場公告為準。',
  },
  {
    question: 'Google 地圖上的評分與評論數是最新資料嗎？',
    answer: '本站同步自 Google 地圖使用者評論（2026 年 9 月），資料按月對照 Google 地圖商家頁。評論內容僅作來源說明，不嵌入搜尋引擎結構化資料，避免版本不一致問題。',
  },
  {
    question: '停車場收費嗎？入口好找嗎？',
    answer: '官方資料列有停車場，現有資訊多以免費停車場描述。入口位於大鶯路巷道內，最後一段道路較不像一般大型景區入口，建議直接使用本站的 Google Maps 導航並留意現場標線。',
  },
  {
    question: '大溪河濱公園停車場好停嗎？有幾個車位？',
    answer:
      '官方未公告固定車位數。晴朗假日、活動日與落羽松季（約 12 月至翌年 1 月）較容易客滿，建議上午 9 點前抵達；若園區已滿位，可考慮停在大溪老街或大溪橋周邊，再步行或騎車進園。',
  },
  {
    question: '大溪河濱公園可以租腳踏車嗎？',
    answer:
      '園區設有 YouBike 站，可租借公共自行車，車輛與空柱會即時變動，出發前先查官方網站或 App。若需要兒童車、親子車、協力車或想租一整天，園區官方資料未列出民營租車業者，建議先向大溪老街與大溪橋周邊的自行車店確認車型、營業時間與價格。',
  },
  {
    question: '從大溪河濱公園騎腳踏車到大溪老街要多久？',
    answer:
      '兩地距離不遠，騎車約 10 分鐘左右可達，實際時間依路線、人潮與路口停等而定。假日老街人潮密集，建議在周邊下車推行，避免在人行空間中騎乘。',
  },
  {
    question: '可以帶寵物到公園嗎？',
    answer:
      '園區屬戶外開放空間。攜帶寵物請全程繫繩、自行清理排泄物，並避免讓寵物進入兒童遊戲場；特定區域或活動期間是否限制寵物進入，請依現場告示與主管機關規定為準。',
  },
  {
    question: '適合幾歲的小朋友？',
    answer: '官方頁面將多項共融遊具標示為 2–12 歲；海盜船攀爬與自行車挑戰區則要依孩子實際身高、握力、平衡能力與現場狀況判斷。幼童應由成人全程陪同。',
  },
  {
    question: '自行車需要自己攜帶嗎？',
    answer: '想使用兒童自行車訓練場，建議自行攜帶適合孩子尺寸的單車、頭盔與護具。園區雖設有 YouBike 站，但公共自行車不等同兒童越野練習車。',
  },
  {
    question: '可以野餐或搭帳篷嗎？',
    answer: '大草地適合鋪野餐墊與簡單休息。遮陽帳、營釘、生火、烤肉及大型活動是否允許，應以現場告示與主管機關最新規定為準；請勿破壞草地並自行帶走垃圾。',
  },
  {
    question: '落羽松幾月最漂亮？',
    answer: '通常 12 月至翌年 1 月較可能出現金黃、橘紅或褐紅色，但每年轉色時間受氣溫、降雨與寒流影響。不要只依固定日期出發，建議先查看最近一至兩週的遊客照片。',
  },
  {
    question: '下雨後適合去嗎？',
    answer: '主要活動都在戶外，雨後草地、自行車場與步道可能積水或濕滑，親子體驗會明顯下降。若剛下過大雨，建議改期並避開河川水位異常時段。',
  },
  {
    question: '公園裡可以玩水嗎？',
    answer: '園內水域與活動場地不應視為一般公共戲水池。沒有正式活動、救生配置與現場許可時，不要自行下水，並須看顧兒童遠離無防護水邊。',
  },
  {
    question: '周邊還有哪些順遊景點？',
    answer: '由園區出發可順道前往大溪橋拍照、到大溪老街吃飯與採買伴手禮，並可連接大溪中正公園與月眉休閒農業區周邊，組成半日或一日的桃園大溪行程。',
  },
] as const;

export const gallery = [
  { src: '/images/pirate-playground.webp', alt: `${site.fullName} 海盜船遊戲場（${site.city}，${site.country}）`, caption: '海盜船主題遊具' },
  { src: '/images/love-daxi.webp', alt: `${site.fullName} LOVE DAXI 草地裝置（${site.city}）`, caption: 'LOVE DAXI 拍照裝置' },
  { src: '/images/riverside-lawn.webp', alt: `${site.fullName} 開闊草地與樹林（${site.city}，${site.country}）`, caption: '開闊草地與樹林' },
  { src: '/images/shaded-path.webp', alt: `${site.fullName} 林蔭步道（${site.city}，${site.state}）`, caption: '林蔭散步空間' },
  { src: '/images/parking-youbike.webp', alt: `${site.fullName} 停車區與 YouBike 站（${site.city}）`, caption: '停車區與 YouBike' },
  { src: '/images/pavilion.webp', alt: `${site.fullName} 遮陽亭棚（${site.city}，${site.state}）`, caption: '遮陽休憩設施' },
  { src: '/images/restroom.webp', alt: `${site.fullName} 廁所設施（${site.city}，${site.state}）`, caption: '園區公共設施' },
  { src: '/images/amphitheater.webp', alt: `${site.fullName} 戶外活動空間（${site.city}，${site.state}）`, caption: '戶外活動空間' },
] as const;

/* ------------------------------------------------------------------ *
 * 主題專區（多頁架構）
 *
 * Search Console 顯示需求高度集中在三組查詢：停車場、租腳踏車、園區設施。
 * 首頁維持全站總覽，這三組需求各自獨立成頁，用獨立標題與 FAQ 把主題做深，
 * 並互相內鏈形成主題叢集，爭取長尾與精選摘要。
 * ------------------------------------------------------------------ */

export const topicPages = [
  {
    id: 'parking',
    path: '/parking',
    navLabel: '停車交通',
    eyebrow: '交通與停車',
    icon: 'parking',
    breadcrumb: '停車與交通',
    image: '/images/parking-youbike.webp',
    title: '大溪河濱公園停車場｜免費停車、入口位置與交通指南',
    description:
      '大溪河濱公園停車場完整指南：免費停車現況、車位好不好找與離峰時段、大鶯路巷道入口的導航步驟、滿位時的替代停車方案，以及桃園公車等大眾運輸方式。',
    heading: '大溪河濱公園停車場與交通指南',
    lead: '「大溪河濱公園停車場」是本站搜尋量最高的查詢。這一頁把停車細節集中說明：免費或收費、車位好不好找、入口在大鶯路巷道內怎麼走、滿位時的替代方案，以及不開車的交通方式。',
    summary: '免費停車、離峰時段與巷道入口導航',
  },
  {
    id: 'bike',
    path: '/bike',
    navLabel: '單車路線',
    eyebrow: '單車與租借',
    icon: 'bike',
    breadcrumb: '租腳踏車與路線',
    image: '/images/green-lawn.webp',
    title: '大溪河濱公園租腳踏車｜YouBike、兒童單車與自行車道路線',
    description:
      '大溪河濱公園租腳踏車指南：園區 YouBike 站、大溪老街周邊自行車店的車型與費用比較、兒童自行車訓練場使用方式，以及騎到大溪老街與大鶯綠野自行車道的時間。',
    heading: '大溪河濱公園租腳踏車與自行車道路線',
    lead: '園區設有 YouBike 站，但公共自行車不等於親子車，也不適合當兒童越野練習車。這一頁說明三種取得車輛的方式、車型與費用差異，以及從園區出發最常安排的路線與時間。',
    summary: 'YouBike 站、老街租車店與騎乘路線時間',
  },
  {
    id: 'facilities',
    path: '/facilities',
    navLabel: '園區設施',
    eyebrow: '設施與遊具',
    icon: 'facility',
    breadcrumb: '園區設施',
    image: '/images/pavilion.webp',
    title: '大溪河濱公園設施｜海盜船遊具、廁所、遮陽與野餐草地',
    description:
      '大溪河濱公園園區設施總覽：海盜船共融遊戲場與其他遊具、一般與無障礙廁所、遮陽亭棚與樹蔭、野餐草地使用方式，以及免費入園與全區 24 小時開放說明。',
    heading: '大溪河濱公園園區設施總覽',
    lead: '園區約 6.9 公頃，設施以戶外遊具、草地與基本公共服務為主。這一頁逐項說明可以期待什麼、需要自己帶什麼，以及園內沒有哪些設施。',
    summary: '海盜船遊具、廁所、遮陽與草地使用規範',
  },
] as const;

/** 完整版停車資訊表（首頁只放前五列，完整十列在 /parking）。 */
export const parkingGuideFull = [
  {
    item: '停車費用',
    value: '官方設施資料列有停車場，現有資訊多以免費停車場描述。',
    note: '是否收費、當日管制與接駁方式以現場最新告示為準。',
  },
  { item: '車位數量', value: '官方未公告固定車位數。', note: '現場車格有限，假日與活動日容易客滿。' },
  {
    item: '車位好找的時段',
    value: '平日全天，以及假日 09:30 前，最容易找到車位。',
    note: '假日 10:00–17:00 與落羽松季最壅塞。',
  },
  {
    item: '入口位置',
    value: '桃園市大溪區瑞興里大鶯路60巷89弄75號，入口位於巷道內。',
    note: '最後一段不像大型景區入口，請放慢車速並留意標線。',
  },
  {
    item: '入口辨識',
    value: '由大鶯路轉入通往園區的巷道，沿標線前進即抵達停車空間。',
    note: '若已開到河堤或明顯離開大鶯路，多半是開過頭了。',
  },
  {
    item: '導航設定',
    value: '直接以「大溪河濱公園」或景點座標導航即可。',
    note: '不要只在大鶯路主線來回尋找醒目的大型景區入口。',
  },
  {
    item: '替代停車：大溪橋周邊',
    value: '大溪橋一帶另有停車空間與路邊車格。',
    note: '步行約 8–12 分鐘，適合想順遊大溪橋的旅客。',
  },
  {
    item: '替代停車：大溪老街',
    value: '大溪老街周邊有多處收費停車場。',
    note: '主力行程是老街與午餐時，停老街再步行或騎車進園更順。',
  },
  {
    item: '連假與活動管制',
    value: '連假、大型活動與落羽松季可能加開臨時管制或接駁。',
    note: '出發前先查桃園市政府與現場公告，必要時改搭大眾運輸。',
  },
  {
    item: '大型車與遊覽車',
    value: '官方未公告遊覽車停車位。',
    note: '團體旅遊請先向主管機關或園區管理單位確認。',
  },
] as const;

/** 停車時段建議表：對應「假日停得到嗎」這類高意圖查詢。 */
export const parkingTiming = [
  { slot: '平日 08:00–11:00', level: '容易', note: '光線與氣溫都適合親子活動，車位最容易。' },
  { slot: '平日 11:00–17:00', level: '容易', note: '多半仍有空位，草地上日照較強。' },
  { slot: '假日 08:00–09:30', level: '較容易', note: '最推薦的假日抵達時間，能避開主要車潮。' },
  { slot: '假日 09:30–12:00', level: '普通', note: '車流明顯增加，可能需繞行或改用替代車位。' },
  { slot: '假日 12:00–17:00', level: '較難', note: '與老街人潮重疊，建議直接停老街周邊再進園。' },
  { slot: '落羽松季與活動日', level: '最難', note: '約 12 月至翌年 1 月轉色期，建議上午 9 點前抵達。' },
] as const;

/** 替代停車方案比較。 */
export const parkingAlternatives = [
  { place: '園區附設停車空間', distance: '步行 0–3 分鐘', best: '車位還有時的首選，離遊具與草地最近。' },
  { place: '大溪橋周邊', distance: '步行約 8–12 分鐘', best: '想順遊大溪橋，或園區已滿位時的近距離備案。' },
  {
    place: '大溪老街周邊停車場',
    distance: '步行或騎車約 8–15 分鐘',
    best: '行程本來就以老街為主，或連假時想避開園區車潮。',
  },
  { place: '路邊白線車格', distance: '依現場位置', best: '平日離峰可短暫使用，請確實停在合法格位。' },
] as const;

/** 開車導航步驟。 */
export const parkingSteps = [
  { step: '設定導航', text: '在 Google 地圖搜尋「大溪河濱公園」，或直接使用本站的導航按鈕。' },
  { step: '轉入大鶯路巷道', text: '沿大鶯路行駛並轉入通往園區的巷道，這段路較窄，請放慢車速。' },
  { step: '依標線前進', text: '跟著現場標線與指示前進，即會抵達入口附近的停車空間。' },
  { step: '停妥後整裝', text: '僅停放於合法車格，先確認廁所與遊具位置再開始遊玩。' },
] as const;

/** /parking 專頁的 FAQ。 */
export const parkingFaqs = [
  {
    question: '大溪河濱公園停車場要收費嗎？',
    answer:
      '官方設施資料只列出「停車場」，現有資訊多以免費停車場描述。是否收費、當日是否管制，仍以現場最新告示與主管機關公告為準，本站不宣稱永久免費。',
  },
  {
    question: '停車場有幾個車位？假日一定停得到嗎？',
    answer:
      '官方未公告固定車位數。平日幾乎都能找到車位；假日車潮集中在 09:30 之後，12:00–17:00 最難停。建議假日 09:30 前抵達，或直接改停大溪老街周邊再進園。',
  },
  {
    question: '入口在大鶯路的巷子裡，開車會不好找嗎？',
    answer:
      '最後一段是巷道，不像大型景區那種明顯入口，這是第一次造訪最常卡住的地方。請直接以景點座標導航，放慢車速並跟著現場標線走；如果發現自己已經開到河堤，通常代表開過頭了。',
  },
  {
    question: '園區停車場滿了可以停哪裡？',
    answer:
      '可依行程選擇：想順遊大溪橋就停大溪橋周邊，步行約 8–12 分鐘；主力行程是老街就停老街周邊收費停車場，再步行或騎車進園。請避免違規停車或占用當地巷道。',
  },
  {
    question: '有遊覽車或大型車停車位嗎？',
    answer:
      '官方資料未公告遊覽車或大型車停車位。團體旅遊、遊覽車或露營車請先向主管機關與園區管理單位確認可行方案，不要直接駛入巷道。',
  },
  {
    question: '騎機車或腳踏車前往方便嗎？',
    answer:
      '機車請依現場標線停放於合法車格；腳踏車可搭配園區 YouBike 站或自備車輛。園區鄰近河岸自行車動線，騎車前往能避開開車找車位的困擾，相關路線整理在「租腳踏車與路線」專頁。',
  },
] as const;

/** 租車方式比較表（/bike 專頁）。 */
export const bikeRentals = [
  {
    way: '園區 YouBike 站',
    types: '公共自行車（車款依 YouBike 官方公告）',
    cost: '依 YouBike 官方費率',
    fit: '想短程騎到大溪老街或沿河岸移動',
  },
  {
    way: '大溪老街周邊自行車店',
    types: '兒童車、親子車、協力車等',
    cost: '依各店公告',
    fit: '需要兒童尺寸、親子共乘，或想租一整天',
  },
  { way: '自備單車', types: '自有車款與護具', cost: '無租借費', fit: '想使用園區兒童自行車訓練場' },
] as const;

/** 補充路線（與 bikeGuide.routes 併用）。 */
export const bikeExtraRoutes = [
  {
    name: '園區 → 大溪橋（原路來回）',
    distance: '單程約 1–1.5 公里',
    time: '騎車約 5–8 分鐘',
    note: '想單純拍大溪橋、不想進老街時的短程選擇。',
  },
  {
    name: '河岸往上游延伸',
    distance: '依選擇路段而定',
    time: '依體力安排',
    note: '沿大漢溪河岸繼續騎乘，可通行範圍與封閉路段以現場指標為準。',
  },
] as const;

/** /bike 專頁的 FAQ。 */
export const bikeFaqs = [
  {
    question: '大溪河濱公園裡面可以租腳踏車嗎？',
    answer:
      '園區官方設施資料列出的是 YouBike 站，屬於公共自行車，並非民營租車店。若需要親子車、兒童車或整天租借，園區官方資料沒有列出業者，建議先向大溪老街與大溪橋周邊的自行車店確認。',
  },
  {
    question: '園區的 YouBike 站借得到兒童車嗎？',
    answer:
      'YouBike 站提供的是公共自行車，車型與數量依官方站點配置，無法保證現場有兒童尺寸車輛。要讓孩子練習騎乘，建議自備合適尺寸的單車、頭盔與護具。',
  },
  {
    question: '想租親子車或兒童車要去哪裡？',
    answer:
      '多數旅客會在大溪老街、大溪橋一帶的自行車店租車後騎進園區。各店車型、營業時間與價格不同，出發前請先電話或訊息確認，避免到場才發現沒有適合的車輛。',
  },
  {
    question: '從大溪河濱公園騎到大溪老街要多久？',
    answer:
      '距離不遠，一般約 10 分鐘左右的騎乘時間，實際依路線、人潮與路口停等而定。假日老街人潮密集，建議在周邊先下車推行，避免在人行空間中騎乘。',
  },
  {
    question: '兒童自行車訓練場需要自備單車嗎？',
    answer:
      '需要。訓練場是提供練習空間，不是租車點。請自行攜帶適合孩子尺寸的單車與合格頭盔、護具；雨後場地濕滑時建議改玩草地或改期。',
  },
  {
    question: '大鶯綠野自行車道適合親子嗎？',
    answer:
      '路線沿大漢溪河岸，坡度與道路交會狀況依路段而異。帶孩子騎乘請選擇平緩路段、全程配戴頭盔並降低車速；實際可通行範圍與封閉路段以現場指標與官方公告為準。',
  },
] as const;

/** 設施逐項說明（/facilities 專頁）。 */
export const facilityDetails = [
  {
    icon: 'inclusive',
    title: '海盜船共融遊戲場',
    detail:
      '海盜船主題遊具結合繩橋、攀爬與滑梯，周邊另有鳥巢式鞦韆、旋轉盤、音樂牆板與傳聲筒等共融設施。',
    note: '官方標示多項遊具適齡 2–12 歲，幼童需成人近距離陪同。',
  },
  {
    icon: 'training',
    title: '兒童自行車訓練場',
    detail: '設有腳踏車越野與平衡挑戰區，適合已能穩定騎乘的孩子練習控制與反應。',
    note: '需自備單車與護具，雨後地面濕滑時不宜使用。',
  },
  {
    icon: 'parking',
    title: '免費停車空間',
    detail: '入口附近設有停車空間，多以免費停車場描述，開車前往不需另外找收費停車場。',
    note: '車格數量有限，假日與落羽松季建議上午抵達。',
  },
  {
    icon: 'restroom',
    title: '一般與無障礙廁所',
    detail: '官方設施資料列有一般廁所及無障礙廁所，親子與行動不便旅客可安心使用。',
    note: '位置與開放狀況以現場標示為準。',
  },
  {
    icon: 'shade',
    title: '遮陽亭棚與樹蔭',
    detail: '園內有亭棚、樹蔭與座椅可供休息，適合野餐後乘涼或短暫避開日照。',
    note: '開闊草坪區仍偏曬，夏季請自備遮陽與飲水。',
  },
  {
    icon: 'leaf',
    title: '野餐草地與散步空間',
    detail: '園區約 6.9 公頃，草地開闊，適合鋪野餐墊、吹泡泡、踢球與散步。',
    note: '請自行帶走垃圾，並避免破壞草皮與植栽。',
  },
  {
    icon: 'route',
    title: '步道、水岸與自行車動線',
    detail: '園內步道可連接草地、落羽松與水岸空間，並可銜接河岸自行車動線。',
    note: '水邊與木棧道須注意安全，園內水域不是開放戲水池。',
  },
  {
    icon: 'info',
    title: '園內沒有的設施',
    detail: '沒有常設餐廳、便利商店、室內遊戲室與室內販賣部，也不是需要預約的商業景點。',
    note: '餐飲、補水與兒童備用品請在抵達前準備。',
  },
] as const;

/** /facilities 專頁的 FAQ。 */
export const facilitiesFaqs = [
  {
    question: '園區有廁所嗎？有無障礙廁所嗎？',
    answer:
      '官方設施資料列有一般廁所及無障礙廁所，屬園區基本服務設施。實際位置與開放狀況會因維護或活動調整，請以現場標示為準；抵達後先確認廁所位置，帶幼童會方便很多。',
  },
  {
    question: '園內有飲水機、販賣部或餐廳嗎？',
    answer:
      '園區以戶外公園機能為主，沒有常設餐廳或商店的官方資訊。建議出發前先備好飲水與簡單點心，用餐安排在大溪老街會更從容。',
  },
  {
    question: '可以在園區搭帳篷或遮陽帳嗎？',
    answer:
      '大草地適合鋪野餐墊與簡單休息，但遮陽帳、營釘、生火、烤肉與大型活動是否允許，須以現場告示與主管機關最新規定為準。請不要在草皮上留下痕跡並自行帶走垃圾。',
  },
  {
    question: '海盜船遊戲場適合幾歲？',
    answer:
      '官方將多項共融遊具標示為 2–12 歲。海盜船的攀爬區與自行車挑戰區則要依孩子實際身高、握力、平衡能力與當日場地狀況判斷，幼童務必由成人全程陪同。',
  },
  {
    question: '園區的開放時間與門票怎麼算？',
    answer:
      '官方標示免費入園、全區 24 小時開放，園內沒有售票處。不過園區屬戶外河濱環境，親子活動、騎車與拍照仍建議安排在日間，夜間照明與維護狀況以現場為準。',
  },
  {
    question: '輪椅或嬰兒推車在園區好走嗎？',
    answer:
      '園區設有無障礙廁所，主要動線以鋪面步道與草地為主，推車與輪椅可行，但草地與雨後路面阻力較大。建議沿主要步道移動，並避開豪雨後與水位異常時段。',
  },
] as const;
