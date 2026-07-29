export const site = {
  name: '大溪河濱公園旅遊指南',
  shortName: '大溪河濱公園',
  domain: 'DaxiRiversidePark.com',
  canonical: 'https://daxiriversidepark.com/',
  title: '大溪河濱公園攻略｜停車、親子遊具、落羽松與單車路線',
  description:
    '大溪河濱公園完整行前指南：免費停車、海盜船遊具、兒童單車訓練場、落羽松、野餐草地、廁所、交通與大溪老街順遊。',
  address: '桃園市大溪區大鶯路60巷89弄75號',
  coordinates: { lat: 24.8932601, lng: 121.283638 },
  mapsUrl:
    'https://www.google.com/maps/place/%E5%A4%A7%E6%BA%AA%E6%B2%B3%E6%BB%A8%E5%85%AC%E5%9B%AD/@24.8932601,121.2810631,17z/data=!3m1!4b1!4m6!3m5!1s0x34681817b55e18cd:0x337e23894ae95017!8m2!3d24.8932601!4d121.283638!16s%2Fg%2F11gz9mcb1?entry=ttu&g_ep=EgoyMDI2MDcyNi4wIKXMDSoASAFQAw%3D%3D',
  placeUrl:
    'https://www.google.com/maps/place/%E5%A4%A7%E6%BA%AA%E6%B2%B3%E6%BB%A8%E5%85%AC%E5%9B%AD/@24.8932601,121.2810631,17z/data=!3m1!4b1!4m6!3m5!1s0x34681817b55e18cd:0x337e23894ae95017!8m2!3d24.8932601!4d121.283638!16s%2Fg%2F11gz9mcb1?entry=ttu&g_ep=EgoyMDI2MDcyNi4wIKXMDSoASAFQAw%3D%3D',
  officialUrl: 'https://www.taoyuan-parkgo.tw/parks/44',
  tourismUrl: 'https://travel.tycg.gov.tw/zh-tw/travel/attraction/598',
  updatedAt: '2026-07-29',
} as const;

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
    alt: '大溪河濱公園海盜船兒童遊戲場實景',
    tag: '2–12 歲',
  },
  {
    eyebrow: '大片綠地',
    title: '草地野餐與奔跑空間',
    description:
      '約 6.9 公頃的園區擁有開闊草地，適合鋪野餐墊、吹泡泡、踢球與散步。夏季草坪日照強，推薦上午或午後前往，並自行帶走垃圾。',
    image: '/images/riverside-lawn.webp',
    alt: '大溪河濱公園大片草地與樹林實景',
    tag: '野餐首選',
  },
  {
    eyebrow: '兩輪挑戰',
    title: '兒童自行車訓練場',
    description:
      '場內設有腳踏車越野與平衡挑戰區，適合已能穩定騎乘的孩子練習控制。建議自備單車、合格頭盔與護具；雨後地面濕滑時先改走草地散步。',
    image: '/images/green-lawn.webp',
    alt: '大溪河濱公園綠地與戶外活動空間',
    tag: '自備頭盔',
  },
  {
    eyebrow: '季節拍照',
    title: '落羽松與 LOVE DAXI',
    description:
      '園內落羽松與紅色 LOVE DAXI 裝置是辨識度最高的拍照點。通常 12 月至翌年 1 月較有機會轉為金黃或橘紅，實際狀態仍受當年氣溫與降雨影響。',
    image: '/images/love-daxi.webp',
    alt: '大溪河濱公園 LOVE DAXI 草地裝置實景',
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
    question: '大溪河濱公園需要門票嗎？',
    answer: '不需要。桃園市政府官方公園資料標示為免費入園。園區內沒有售票處，也不是需要預約的商業景點。',
  },
  {
    question: '大溪河濱公園開放到幾點？',
    answer: '官方標示全區 24 小時開放，但園區屬戶外河濱環境，首次造訪、親子活動與拍照仍建議安排在日間。夜間照明、天候或臨時維護請以現場公告為準。',
  },
  {
    question: '停車場收費嗎？入口好找嗎？',
    answer: '官方資料列有停車場，現有資訊多以免費停車場描述。入口位於大鶯路巷道內，最後一段道路較不像一般大型景區入口，建議直接使用本站的 Google Maps 導航並留意現場標線。',
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
] as const;

export const gallery = [
  { src: '/images/pirate-playground.webp', alt: '海盜船遊戲場', caption: '海盜船主題遊具' },
  { src: '/images/love-daxi.webp', alt: 'LOVE DAXI 草地裝置', caption: 'LOVE DAXI 拍照裝置' },
  { src: '/images/riverside-lawn.webp', alt: '大溪河濱公園草地', caption: '開闊草地與樹林' },
  { src: '/images/shaded-path.webp', alt: '大溪河濱公園林蔭步道', caption: '林蔭散步空間' },
  { src: '/images/parking-youbike.webp', alt: '大溪河濱公園停車與 YouBike', caption: '停車區與 YouBike' },
  { src: '/images/pavilion.webp', alt: '大溪河濱公園遮陽亭棚', caption: '遮陽休憩設施' },
  { src: '/images/restroom.webp', alt: '大溪河濱公園廁所設施', caption: '園區公共設施' },
  { src: '/images/amphitheater.webp', alt: '大溪河濱公園戶外空間', caption: '戶外活動空間' },
] as const;
