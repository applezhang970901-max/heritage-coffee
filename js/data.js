/**
 * L'HÉRITAGE COFFEE ROASTERS - 預設資料庫 (含頂級茶包與購物車狀態管理)
 * 專為高端老錢風（Old Money）私人典藏咖啡館設計
 */

const DEFAULT_COFFEE_DATA = {
  brand: {
    name: "L'HÉRITAGE",
    nameZh: "傳承・私人咖啡典藏館",
    tagline: "Timeless Quiet Luxury for Discerning Souls",
    slogan: "時間沉澱的奢華，只為少數懂得靜謐的靈魂",
    founded: "1928",
    address: "台北市大安區青田街私邸 18 號（採預約制接待）",
    hours: "週二至週日 13:00 - 21:00（每週一為莊園烘豆閉館日）",
    phone: "+886 2 2708 9988",
    conciergeEmail: "concierge@lheritage-coffee.com"
  },
  
  // 開店旨意
  philosophy: {
    title: "開店旨意・傳承與靜謐之境",
    subtitle: "Our Philosophy & Heritage",
    paragraphs: [
      "在這個被演算法與速食文化追趕的時代，真正的奢華從來不是喧鬧的炫耀，而是對時光、手藝與內心平靜的絕對敬意。L'HÉRITAGE 隱蔽於林蔭深處的古典院落，傳承家族四代尋豆與杯測手藝，專為追求極致品味的智者打造一座遠離世俗擾攘的感官庇護所。",
      "我們堅拒工業化的流水線作業，每年僅由莊園主理人親赴中南美洲與非洲高海拔私人莊園，親自挑選全球產量不足 0.1% 的百年老樹微批次生豆。每一顆咖啡豆均在波爾多橡木桶中沉靜熟成，再經由匠人指尖的溫控炭火細膩烘焙。",
      "在這裡，我們不談翻桌率，只專注於您握在手中的那一盞溫熱。老橡木的香氣、黃銅微光的流轉、黑膠唱片的柔和音紋，與唇齒間綻放的頂級藝伎花香交織成一首無聲的詩。這不僅是一杯咖啡，更是一段與歲月相敬的尊榮儀式。"
    ],
    values: [
      {
        icon: "gem",
        title: "稀世微批次珍藏",
        desc: "每年親赴微型莊園，嚴選產量僅佔全球 0.1% 的百年老樹原生種生豆。"
      },
      {
        icon: "hourglass",
        title: "緩慢的時間美學",
        desc: "堅持長達72小時低溫冰滴與橡木桶熟成工藝，讓時間雕琢風味之最。"
      },
      {
        icon: "shield-check",
        title: "私密與專屬尊榮",
        desc: "每日僅接待限量席位，提供客製化手沖侍豆與絕密隔音隱私空間。"
      }
    ]
  },

  // 製做方法 (Craftsmanship)
  brewingMethods: [
    {
      id: "siphon-gold",
      name: "24K鍍金古典虹吸萃取",
      enName: "24K Gold Siphon Extraction",
      tag: "極致純淨・花香綻放",
      desc: "選用法國百年工坊訂製的 24K 鍍金微孔濾網與耐熱水晶玻璃球。透過精確至 0.5°C 的鹵素光波加熱，在高溫負壓循環中完整萃取出淺中焙藝伎咖啡最深層的茉莉白花與柑橘蜜糖香氣，口感柔順如絲綢，毫無雜質。",
      parameters: "水溫 91.5°C ｜ 萃取時間 75秒 ｜ 水粉比 1:14.5",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "cold-drip",
      name: "72小時京都琉璃雙塔冰滴",
      enName: "72-Hour Crystal Kyoto Slow Drip",
      tag: "酒香沉澱・時光陳釀",
      desc: "採用吹製厚琉璃冷萃柱，以阿爾卑斯山純淨冰川水，每 4.5 秒滴落一顆冰晶水滴。萃取液隨後置入恆溫 4°C 的法國橡木雪莉桶中進行 72 小時低溫發酵，孕育出如頂級干邑白蘭地般的厚實酒香與黑櫻桃回甘。",
      parameters: "水滴頻率 4.5s/滴 ｜ 發酵溫度 4°C ｜ 熟成週期 72hrs",
      image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "vintage-lever",
      name: "古董活塞槓桿式壓力萃取",
      enName: "Vintage Lever Pull Espresso",
      tag: "琥珀油脂・醇厚天鵝絨",
      desc: "1961年義大利原裝進口雙活塞手動槓桿濃縮機。摒棄現代電子水泵的生硬壓力，完全仰賴資深侍豆師雙手感知彈簧釋放的動態阻力，壓榨出厚達 8mm 的金黃色微稠 Crema，展現深焙莊園豆獨有的黑松露與雪松木深沉氣韻。",
      parameters: "預浸 12秒 ｜ 漸進峰值 9.5 bar ｜ 萃取量 32ml",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "barrel-roast",
      name: "波爾多橡木桶熟成微批次烘焙",
      enName: "Bordeaux Cask Aged Micro-Roasting",
      tag: "風土淬鍊・炭火工藝",
      desc: "生豆先於波爾多一級酒莊橡木桶中沉睡 45 天，吸飽黑醋栗與單寧芬芳；烘焙時使用日本紀州備長炭搭配紫砂內膽烘豆機，以極緩慢的溫升曲線逼出深層梅納反應，賦予咖啡豆如絲絨般的奢華光澤與層次。",
      parameters: "桶陳週期 45天 ｜ 備長炭微火 ｜ 烘焙度 淺中/中深",
      image: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=800&q=80"
    }
  ],

  // 店內設計 (Interior Architecture)
  interiorSpaces: [
    {
      id: "oak-library",
      title: "百年英倫橡木圖書沙龍",
      enTitle: "The Antique Oak Library",
      desc: "環繞頂天立地之胡桃木雕花書架，藏有自18世紀以來的莊園地理與植物學手稿。配置英國進口 Chesterfield 深棕揉皮翼背扶手椅與安妮女王式茶几，讓人在老木香與書香中品味片刻安詳。",
      highlight: "低照度溫暖黃銅閱讀燈 ｜ 羊毛混紡吸音厚織地毯",
      image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "marble-bar",
      title: "黑白根大理石手沖鑑賞席",
      enTitle: "Nero Marquina Extraction Bar",
      desc: "整塊西班牙 Nero Marquina 墨黑大理石吧台，帶有天然白色閃電紋理。檯面搭配定製霧面刷金黃銅器具與客製化水晶酒杯。您可近距離觀看資深主理侍豆師以詩意般的節奏注水，享受感官沉浸。",
      highlight: "一對一客製侍豆席 ｜ 德國頂級專業控溫水質淨化系統",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "conservatory",
      title: "法式私人庭園溫室花廳",
      enTitle: "The Private Glass Conservatory",
      desc: "復古鑄鐵落地窗引進庭院中百年松柏與苔蘚庭園景致。陽光穿過樹梢灑在天然石灰華石桌面上，微風輕拂時綠意盎然，專為想要徹底放鬆身心、享受午後陽光的賓客所保留。",
      highlight: "日照自然天光 ｜ 靜音水景循環 ｜ 四季庭院枯山水景觀",
      image: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "reserve-salon",
      title: "極私密名仕雪茄與鑑賞廂房",
      enTitle: "The Sovereign Private Lounge",
      desc: "專為層峰政商名流與家族藏家設計的私密廂房。具備獨立專屬秘密出入口、瑞士醫學級微負壓新風循環系統，並配備獨立專屬洗手間與侍者鈴，提供無懈可擊的隱私保障。",
      highlight: "雙層聲學氣密隔音 ｜ 獨立管家進出通廊 ｜ 需提前7日預約",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
    }
  ],

  // 菜單品項（咖啡 + 甜點 + 季節限定）
  menuItems: [
    {
      id: "item-1",
      category: "coffee",
      isSeasonal: false,
      name: "巴拿馬 翡翠莊園 頂級競標紅標藝伎",
      enName: "Panama Hacienda La Esmeralda Geisha (Special Reserve)",
      price: 980,
      badge: "經典鎮館之作",
      origin: "巴拿馬 波奎特 賈拉米洛 (海拔 1,800m)",
      process: "慢速低溫厭氧日曬",
      roast: "極淺焙 (Cinnamon)",
      notes: ["茉莉花白花香", "佛手柑柑橘", "白桃熟成甜", "荔枝甘露"],
      desc: "被譽為咖啡界神話的傳奇翡翠莊園最頂級微批次。以 24K 鍍金虹吸壺萃取，入口如絲絨般柔滑，伴隨悠長清雅的茉莉花香與鮮明多汁的佛手柑柑橘果酸，尾韻猶如高山白毫烏龍般甘醇持久。",
      image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "item-2",
      category: "coffee",
      isSeasonal: false,
      name: "牙買加 藍山 1920 世紀私家莊園",
      enName: "Jamaica Blue Mountain Vintage 1920 Reserve",
      price: 880,
      badge: "皇家指定供應",
      origin: "牙買加 藍山山脈 (海拔 1,500m)",
      process: "純淨高山泉水全水洗",
      roast: "中焙 (City Roast)",
      notes: ["烤榛果香", "黑巧克力", "甜奶油醇厚", "高雅草本尾韻"],
      desc: "英國皇室傳承近一世紀的欽點豆款。完美平衡的酸、甘、苦、醇，油脂豐盈圓潤，口感彷彿融化的榛果甘納許，溫潤且極具包容感，是老派紳士最無可取代的心頭好。",
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "item-3",
      category: "coffee",
      isSeasonal: false,
      name: "葉門 摩卡 馬塔里 梯田千年原生種",
      enName: "Yemen Mokha Mattari Ancient Terraces",
      price: 920,
      badge: "古文明活化石",
      origin: "葉門 巴尼馬塔爾高地 (海拔 2,200m)",
      process: "古法屋頂日曬",
      roast: "中深焙 (Full City)",
      notes: ["肉桂與荳蔻", "熟成黑無花果", "野生黑森林蜜", "陳年沉香木"],
      desc: "誕生於紅海之濱的古老奇蹟。生長於陡峭石梯田，手工採摘後於泥屋頂日曬，帶有神秘濃烈的中東辛香料與無花果果乾氣息，入口深邃濃烈，隨溫度冷卻轉換出深邃的沉香木香氣。",
      image: "https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "item-4",
      category: "coffee",
      isSeasonal: false,
      name: "蘇門答臘 曼特寧 五年雪松木桶陳釀",
      enName: "Sumatra 5-Year Cedar Aged Golden Mandheling",
      price: 780,
      badge: "時間深沉凝煉",
      origin: "印尼 林東 托巴湖 (海拔 1,600m)",
      process: "經典濕刨法 ＋ 5年木桶窖藏",
      roast: "深焙 (French Roast)",
      notes: ["雪松木雪茄香", "75%黑巧克力", "藥草甘草", "焦糖黑糖甘醇"],
      desc: "經由五年恆溫窖藏熟成，酸質已完全轉化為溫潤甘醇的黑糖與雪茄木質香調。使用活塞槓桿萃取或法蘭絨手沖，黏稠醇厚，如同一杯甘醇的老干邑白蘭地，溫暖撫慰心神。",
      image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "item-5",
      category: "dessert",
      isSeasonal: false,
      name: "24K 純金箔黑松露經典歌劇院蛋糕",
      enName: "24K Gold Leaf & Périgord Black Truffle Opera",
      price: 650,
      badge: "主廚奢華招牌",
      origin: "法國法芙娜 72% 黑巧克力 ｜ 佩里戈爾黑松露",
      process: "手工十二層分層壓製",
      roast: "建議搭配：深焙曼特寧",
      notes: ["黑松露大地香", "濃縮咖啡糖漿", "甘納許絲滑", "杏仁海綿蛋糕"],
      desc: "向巴黎經典甜點致敬的極致之作。以頂級佩里戈爾黑松露融入法芙娜黑巧甘納許，層層交疊浸潤濃縮咖啡糖漿的杏仁海綿蛋糕，頂部覆以手工鋪平的 24K 食用純金箔，奢華大氣。",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "item-6",
      category: "dessert",
      isSeasonal: false,
      name: "大溪地波本香草莢修道院千層派",
      enName: "Tahitian Bourbon Vanilla Bean Mille-Feuille",
      price: 580,
      badge: "現點手工組裝",
      origin: "法國 AOP 伊思尼發酵奶油 ｜ 大溪地頂級香草莢",
      process: "72折手工反轉千層酥皮",
      roast: "建議搭配：巴拿馬紅標藝伎",
      notes: ["焦化麥香", "大溪地花果香草", "香緹輕奶油", "布列塔尼焦糖"],
      desc: "堅持點單後方行組裝，維持酥皮極致薄脆。72折反轉酥皮散發濃郁伊思尼奶油焦香，夾入密布大溪地香草黑籽的絲滑卡士達醬，脆爽與綿密在口中迸發出完美的和諧交響樂。",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "item-7",
      category: "dessert",
      isSeasonal: false,
      name: "聖多諾黑煙燻甘栗焦糖泡芙塔",
      enName: "Saint-Honoré Smoked Chestnut Pâtisserie",
      price: 620,
      badge: "法式宮廷名點",
      origin: "法國沙巴東栗子泥 ｜ 馬達加斯加香草",
      process: "焦糖脆殼沾製 ｜ 櫻桃木煙燻",
      roast: "建議搭配：牙買加藍山",
      notes: ["煙燻秋栗香", "焦糖酥脆", "香草香緹鮮奶油", "泡芙酥香"],
      desc: "以酥脆千層派底座托起裹上琥珀色薄脆焦糖的迷你泡芙，內餡填入經過輕度櫻桃木冷煙燻的法國栗子泥，外圍擠上優雅的聖多諾黑羽毛狀香緹鮮奶油，層次豐富，甜而不膩。",
      image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "item-8",
      category: "dessert",
      isSeasonal: false,
      name: "勃根地黑皮諾紅酒蜜漬野生無花果塔",
      enName: "Burgundy Pinot Noir Poached Fig Sablé Tart",
      price: 550,
      badge: "微醺優雅時光",
      origin: "法國勃根地特級園紅酒 ｜ 新鮮地中海黑無花果",
      process: "慢火低溫蜜漬24小時",
      roast: "建議搭配：葉門摩卡馬塔里",
      notes: ["黑皮諾紅酒果酸", "無花果顆粒甜感", "西西里杏仁餡", "黃金奶油塔殼"],
      desc: "嚴選成熟地中海黑無花果，於勃根地黑皮諾紅酒中加入丁香、八角與橙皮慢火煨煮。搭配香脆西西里杏仁奶油沙布列塔殼，果香甜郁微醺，與深色調咖啡形成絕妙的風味共鳴。",
      image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80"
    },
    
    // 特別季節限定商品 (Seasonal Limited Edition)
    {
      id: "item-seasonal-1",
      category: "seasonal",
      isSeasonal: true,
      name: "【冬至限定】1998 波本單桶陳釀・黑金藝伎咖啡",
      enName: "Winter Solstice 1998 Single Cask Bourbon Geisha",
      price: 1280,
      badge: "冬季限定・每日限量10席",
      origin: "波本威士忌 25年老橡木桶 ｜ 巴拿馬極致高地藝伎",
      process: "單一橡木桶窖藏陳年熟成",
      roast: "極淺中焙 ｜ 搭配現磨手工黑胡桃薄餅",
      notes: ["煙燻泥煤威士忌", "黑櫻桃果醬", "焦糖香草莢", "金箔沉木尾韻"],
      desc: "今年冬季最受矚目的限量頂奢鉅獻。將巴拿馬頂級藝伎生豆置入肯塔基 1998 年稀有單桶波本橡木桶中沉睡熟成，不含酒精卻完整封存了波本酒特有的煙燻木香、炙燒焦糖與醉人的黑櫻桃果香。侍豆時更灑入可食用瑞士純金碎屑，每日僅限 10 杯，專屬尊客品鑑。",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "item-seasonal-2",
      category: "seasonal",
      isSeasonal: true,
      name: "【冬至限定】阿爾巴白松露皇家生巧克力磚",
      enName: "Royal Alba White Truffle & Cru Sauvage Ganache",
      price: 720,
      badge: "冬季限定・空運現刨",
      origin: "義大利阿爾巴現刨白松露 ｜ 玻利維亞野生野生可可 68%",
      process: "手工低溫乳化 ｜ 嚴控48小時黃金賞味期",
      roast: "建議搭配：冬至波本桶陳黑金藝伎",
      notes: ["阿爾巴珍貴白松露", "野生可可森林香", "海鹽焦糖乳香", "雪花金箔"],
      desc: "每週由義大利皮埃蒙特產區空運直送之阿爾巴新鮮白松露。上桌前由專屬主廚在賓客面前現刨白松露薄片，散落在柔滑至極的玻利維亞野生生巧克力之上，泥土與蕈菇的奢華幽香在唇齒間溫柔化開，如夢似幻。",
      image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=800&q=80"
    }
  ],

  // 尊榮線上茶包商品（多規格支援與獨立購物車）
  teaProducts: [
    {
      id: "tea-1",
      name: "阿里山 樟樹湖百年古樹 特級高山金萱絲囊茶包",
      enName: "Alishan Ancient Tree Reserve Golden Daylily Silk Bags",
      badge: "高山茶后・手造絲囊",
      origin: "台灣 嘉義阿里山樟樹湖 (海拔 1,650m)",
      roast: "輕焙火 ｜ 日本食品級可分解純絲囊",
      notes: ["高山冷冽山頭氣", "天然初生甜奶香", "清雅梔子白花", "蜜糖甘韻悠長"],
      desc: "採摘自阿里山雲霧深處百年老茶樹，經低溫慢火輕焙，以日本食品級可分解手工純絲囊獨立封存。注入熱水瞬間，天然純淨的奶香與梔子花香隨蒸氣緩緩升騰，入口滑順甘醇，回甘悠長不絕。",
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
      specs: [
        { id: "spec-1-1", name: "典藏絲囊隨行袋 (10入 / 盒)", price: 880, desc: "精緻燙金禮袋裝，適日常商務與出差品飲" },
        { id: "spec-1-2", name: "英倫胡桃木手造禮盒 (20入 / 尊享版)", price: 1580, desc: "原木榫接胡桃木盒，附黃銅封條，贈禮首選" },
        { id: "spec-1-3", name: "私人窖藏原葉密封金罐 (75g 藏家裝)", price: 2280, desc: "整葉球型特等茶原葉，雙層密封避光金罐" }
      ]
    },
    {
      id: "tea-2",
      name: "日月潭 貓囒山皇家紅玉 18號雪茄木盒茶包",
      enName: "Sun Moon Lake Royal Ruby No. 18 Cigar Box Edition",
      badge: "英女皇國宴指定",
      origin: "台灣 南投日月潭貓囒山 (海拔 850m)",
      roast: "全發酵 ｜ 櫻桃木低溫焙火",
      notes: ["天然肉桂辛香", "野生薄荷沁涼", "黑櫻桃果蜜", "麥芽深邃回甘"],
      desc: "由台灣野生山茶與緬甸大葉種歷經半世紀淬鍊育成。帶有令西方茶界驚豔的天然肉桂與清幽薄荷底蘊，湯色瀲灩如紅寶石，口感稠滑溫潤。配置雪茄雪松木盒包裝，散發歷久彌新的高貴氣韻。",
      image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80",
      specs: [
        { id: "spec-2-1", name: "典藏絲囊隨行袋 (10入 / 盒)", price: 920, desc: "精緻燙金禮袋裝，適日常商務與出差品飲" },
        { id: "spec-2-2", name: "雪茄雪松木原裝禮盒 (20入 / 尊享版)", price: 1680, desc: "天然雪松木醇化盒，具備保濕防潮特性" },
        { id: "spec-2-3", name: "莊園微批次全葉密封金罐 (75g 藏家裝)", price: 2480, desc: "手工條索型原葉，茶氣磅礴，耐泡十餘回" }
      ]
    },
    {
      id: "tea-3",
      name: "1988年 雲南易武古樹普洱 陳年熟茶絲囊磚",
      enName: "1988 Vintage Yiwu Ancient Mountain Aged Pu'erh",
      badge: "三十八年乾倉陳釀",
      origin: "中國 雲南易武正山古茶區 (海拔 1,400m)",
      roast: "熟茶窖藏 ｜ 乾倉自然陳化",
      notes: ["陳年老參香", "樟木沉香", "溫潤熟棗香", "琥珀紅濃稠甜"],
      desc: "家族私人防潮乾倉珍藏近四十載之古樹老茶。歷經歲月溫柔轉化，苦澀全褪，沉澱為如絲綢般厚實溫潤的參香與樟木沉香，茶湯紅濃透亮如琥珀，暖胃寧神，是老錢世家日常養心品飲之頂級聖品。",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
      specs: [
        { id: "spec-3-1", name: "典藏絲囊隨行袋 (10入 / 盒)", price: 1180, desc: "精緻燙金禮袋裝，適日常商務與出差品飲" },
        { id: "spec-3-2", name: "百年老橡木雙層禮盒 (20入 / 尊享版)", price: 2180, desc: "雙層開合典藏盒，附天然羊毛絲綢內襯" },
        { id: "spec-3-3", name: "1988古樹熟普金箔手拆原磚 (100g 藏家裝)", price: 3600, desc: "原磚手工輕拆，附紫砂封存茶罐與專屬茶匙" }
      ]
    },
    {
      id: "tea-4",
      name: "新竹北埔 東方美人白毫烏龍 莊園御用金罐茶包",
      enName: "Hsinchu Beipu Oriental Beauty Silver Tip Reserve",
      badge: "小綠葉蟬手採一芯一葉",
      origin: "台灣 新竹北埔丘陵 (無農藥生態莊園)",
      roast: "重發酵 ｜ 龍眼木炭慢焙",
      notes: ["天然熟果蜜香", "荔枝甘甜", "琥珀橙紅", "白毫絨毛芳醇"],
      desc: "夏至前後由小綠葉蟬細細叮咬，純人工手採嬌嫩一芯一葉。白、綠、黃、紅、褐五色斑斕，白毫密布。以極細真絲囊袋包覆，熱水沖泡即刻迸發宛如高級貴腐酒的成熟荔枝蜜香與野花芳菲。",
      image: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=800&q=80",
      specs: [
        { id: "spec-4-1", name: "典藏絲囊隨行袋 (10入 / 盒)", price: 1080, desc: "精緻燙金禮袋裝，適日常商務與出差品飲" },
        { id: "spec-4-2", name: "手工胡桃木燙金禮盒 (20入 / 尊享版)", price: 1980, desc: "手工胡桃木燙金禮盒，贈禮尊榮華貴" },
        { id: "spec-4-3", name: "手工銅製微批次密封金罐 (50g 特等獎裝)", price: 2880, desc: "日本手工延展紫銅罐，白毫完整原葉" }
      ]
    }
  ],

  // 初始範例預約名單（供後台管理 CRUD 測試）
  reservations: [
    {
      id: "RES-20261120-01",
      name: "林董事長",
      phone: "0912-345-678",
      email: "c.lin@grand-capital.com",
      salon: "極私密名仕雪茄與鑑賞廂房",
      guests: 4,
      date: "2026-11-28",
      time: "15:00",
      notes: "需準備冬至限定波本藝伎 4 套，商務私人對談，請保留專用停車位。",
      status: "已確認 (Confirmed)",
      createdAt: "2026-11-20 10:30"
    },
    {
      id: "RES-20261122-02",
      name: "溫夫人",
      phone: "0988-765-432",
      email: "sophia.wen@heritage-family.tw",
      salon: "百年英倫橡木圖書沙龍",
      guests: 2,
      date: "2026-11-29",
      time: "14:30",
      notes: "慶祝結婚紀念日，安排靠窗安靜席位，需搭配大溪地千層派與紅標藝伎。",
      status: "待確認 (Pending)",
      createdAt: "2026-11-22 16:15"
    }
  ],

  // 初始線上訂單紀錄（供試跑結帳與後台訂單管理 CRUD）
  orders: [
    {
      id: "ORD-20261121-801",
      customerName: "辜總裁",
      phone: "0933-888-999",
      email: "koo@heritage-holdings.tw",
      address: "台北市信義區松智路私邸 66 號 28 樓",
      items: [
        {
          productId: "tea-2",
          productName: "日月潭 貓囒山皇家紅玉 18號雪茄木盒茶包",
          specName: "雪茄雪松木原裝禮盒 (20入 / 尊享版)",
          price: 1680,
          qty: 2
        },
        {
          productId: "tea-3",
          productName: "1988年 雲南易武古樹普洱 陳年熟茶絲囊磚",
          specName: "1988古樹熟普金箔手拆原磚 (100g 藏家裝)",
          price: 3600,
          qty: 1
        }
      ],
      totalAmount: 6960,
      paymentMethod: "Centurion 黑卡禮遇簽帳",
      giftWrap: true,
      notes: "需附手寫火漆封蠟感謝信函，下午時段黑貓冷鏈配送。",
      status: "已出貨 (黑貓冷鏈)",
      createdAt: "2026-11-21 14:20"
    }
  ]
};

// 本地存儲管理器 (LocalStorage CRUD Helper)
const StorageManager = {
  STORAGE_KEY: "LHERITAGE_COFFEE_STORE_V1",
  CART_KEY: "LHERITAGE_CART_V1",

  // 讀取所有資料（若無則初始化預設資料）
  loadData() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // 保證結構完整性（若舊版本缺 teaProducts 或 orders 則補齊）
        if (!parsed.teaProducts) parsed.teaProducts = DEFAULT_COFFEE_DATA.teaProducts;
        if (!parsed.orders) parsed.orders = DEFAULT_COFFEE_DATA.orders;
        return parsed;
      }
    } catch (e) {
      console.warn("無法讀取 LocalStorage，使用預設資料", e);
    }
    this.saveData(DEFAULT_COFFEE_DATA);
    return JSON.parse(JSON.stringify(DEFAULT_COFFEE_DATA));
  },

  // 儲存資料
  saveData(data) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent("lheritage_data_updated", { detail: data }));
      return true;
    } catch (e) {
      console.error("儲存至 LocalStorage 失敗", e);
      return false;
    }
  },

  // 重置回原廠設定
  resetToDefault() {
    this.saveData(DEFAULT_COFFEE_DATA);
    this.clearCart();
    return JSON.parse(JSON.stringify(DEFAULT_COFFEE_DATA));
  },

  // ================= 購物車狀態管理 (Cart CRUD) =================
  getCart() {
    try {
      const stored = localStorage.getItem(this.CART_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  },

  saveCart(cart) {
    try {
      localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent("lheritage_cart_updated", { detail: cart }));
      return true;
    } catch (e) {
      return false;
    }
  },

  addToCart(product, spec, qty = 1) {
    const cart = this.getCart();
    const existingIndex = cart.findIndex(item => item.productId === product.id && item.specId === spec.id);

    if (existingIndex !== -1) {
      cart[existingIndex].qty += qty;
    } else {
      cart.push({
        cartItemId: "cart-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
        productId: product.id,
        productName: product.name,
        enName: product.enName,
        image: product.image,
        specId: spec.id,
        specName: spec.name,
        price: spec.price,
        qty: qty
      });
    }

    this.saveCart(cart);
    return cart;
  },

  updateCartQty(cartItemId, delta) {
    let cart = this.getCart();
    const target = cart.find(i => i.cartItemId === cartItemId);
    if (target) {
      target.qty += delta;
      if (target.qty <= 0) {
        cart = cart.filter(i => i.cartItemId !== cartItemId);
      }
      this.saveCart(cart);
    }
    return cart;
  },

  removeFromCart(cartItemId) {
    let cart = this.getCart();
    cart = cart.filter(i => i.cartItemId !== cartItemId);
    this.saveCart(cart);
    return cart;
  },

  clearCart() {
    this.saveCart([]);
  },

  // ================= 訂單管理 (Orders CRUD) =================
  getOrders() {
    const data = this.loadData();
    return data.orders || [];
  },

  addOrder(order) {
    const data = this.loadData();
    if (!data.orders) data.orders = [];

    if (!order.id) {
      const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      order.id = `ORD-${today}-${Math.floor(100 + Math.random() * 900)}`;
    }
    order.createdAt = new Date().toLocaleString("zh-TW", { hour12: false });
    if (!order.status) order.status = "待出貨 (Processing)";

    data.orders.unshift(order);
    this.saveData(data);
    this.clearCart(); // 結帳完成清空購物車
    return order;
  },

  updateOrderStatus(orderId, newStatus) {
    const data = this.loadData();
    const target = (data.orders || []).find(o => o.id === orderId);
    if (target) {
      target.status = newStatus;
      this.saveData(data);
      return true;
    }
    return false;
  },

  deleteOrder(orderId) {
    const data = this.loadData();
    data.orders = (data.orders || []).filter(o => o.id !== orderId);
    this.saveData(data);
    return true;
  },

  // ================= 菜單品項 CRUD =================
  addMenuItem(item) {
    const data = this.loadData();
    if (!item.id) {
      item.id = "item-" + Date.now();
    }
    data.menuItems.unshift(item);
    this.saveData(data);
    return item;
  },

  updateMenuItem(updatedItem) {
    const data = this.loadData();
    const index = data.menuItems.findIndex(i => i.id === updatedItem.id);
    if (index !== -1) {
      data.menuItems[index] = { ...data.menuItems[index], ...updatedItem };
      this.saveData(data);
      return true;
    }
    return false;
  },

  deleteMenuItem(itemId) {
    const data = this.loadData();
    const beforeCount = data.menuItems.length;
    data.menuItems = data.menuItems.filter(i => i.id !== itemId);
    if (data.menuItems.length !== beforeCount) {
      this.saveData(data);
      return true;
    }
    return false;
  },

  // ================= 預約訂位 CRUD =================
  addReservation(res) {
    const data = this.loadData();
    if (!res.id) {
      const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      res.id = `RES-${today}-${Math.floor(100 + Math.random() * 900)}`;
    }
    res.createdAt = new Date().toLocaleString("zh-TW", { hour12: false });
    if (!res.status) res.status = "待確認 (Pending)";
    data.reservations.unshift(res);
    this.saveData(data);
    return res;
  },

  updateReservationStatus(resId, newStatus) {
    const data = this.loadData();
    const target = data.reservations.find(r => r.id === resId);
    if (target) {
      target.status = newStatus;
      this.saveData(data);
      return true;
    }
    return false;
  },

  deleteReservation(resId) {
    const data = this.loadData();
    data.reservations = data.reservations.filter(r => r.id !== resId);
    this.saveData(data);
    return true;
  }
};
