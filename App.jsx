import React, { useState, useEffect } from 'react';
import { 
  Music, BookOpen, Sparkles, RefreshCw, Library, Heart, Coffee, 
  Zap, CloudRain, Sun, Flame, BatteryLow, Smile, Frown, Headphones, 
  ArrowRight, Disc, Radio, Mic2, Tv, Guitar, CheckCircle2, Settings, 
  ExternalLink, Search, RotateCcw, X, Volume2, Compass, Feather, Layers
} from 'lucide-react';

// ============================================================================
// 📚 台南市立醫院 / 秀傳醫療體系 精選館藏資料庫 (60 本真實暢銷與經典館藏，對外不顯示數量)
// ============================================================================
const INITIAL_LIBRARY_DATABASE = [
  // --- 一、心理療癒與自我成長 (15本) ---
  {
    id: "b001",
    title: "被討厭的勇氣",
    author: "岸見一郎, 古賀史健",
    isbn: "9789861364155",
    category: "心理哲學",
    lengthType: "full",
    tags: ["angry", "tired", "anxious", "confused", "rock", "pop", "classical", "work"],
    baseDesc: "阿德勒心理學經典對話錄。告訴我們所有煩惱都始於人際關係，當你學會「課題分離」，便能卸下討好他人的沉重枷鎖。",
    directUrl: ""
  },
  {
    id: "b002",
    title: "蛤蟆先生去看心理師",
    author: "羅伯・狄保德",
    isbn: "9789865254834",
    category: "心理療癒",
    lengthType: "medium",
    tags: ["emo", "crying", "tired", "autopilot", "jazz", "blues", "classical"],
    baseDesc: "藉由蛤蟆先生與蒼鷺諮商師的十次面談，溫柔地帶你認識自己的內在小孩、父母狀態與成人狀態，找回情緒的主導權。",
    directUrl: ""
  },
  {
    id: "b003",
    title: "原子習慣",
    author: "詹姆斯・克利爾",
    isbn: "9789861755267",
    category: "自我成長",
    lengthType: "full",
    tags: ["gym", "work", "autopilot", "payday", "hiphop", "pop", "rock"],
    baseDesc: "每天都進步1%，一年後你會進步37倍！不用靠痛苦的意志力，而是透過建立「身分認同」與微小習慣系統，徹底改造日常。",
    directUrl: ""
  },
  {
    id: "b004",
    title: "也許你該找人聊聊",
    author: "蘿莉・葛利布",
    isbn: "9789869868327",
    category: "心理紀實",
    lengthType: "full",
    tags: ["angry", "emo", "anxious", "blues", "jazz", "pop", "crying"],
    baseDesc: "一位心理治療師與她的心理治療師的故事。原來連幫人解決問題的專家自己也會崩潰！文字幽默犀利，讀起來像看影集一樣過癮。",
    directUrl: ""
  },
  {
    id: "b005",
    title: "我可能錯了",
    author: "比約恩・納提科・林德布勞",
    isbn: "9786263185487",
    category: "心靈哲學",
    lengthType: "medium",
    tags: ["angry", "anxious", "escape", "autopilot", "classical", "blues", "rock"],
    baseDesc: "北歐森林隱修士的生命智慧。當你跟另一半爭執、或是對生活感到憤怒緊繃時，在心裡默念一句「我可能錯了」，平靜便會降臨。",
    directUrl: ""
  },
  {
    id: "b006",
    title: "內在原力",
    author: "愛瑞克",
    isbn: "9789865519957",
    category: "職涯成長",
    lengthType: "full",
    tags: ["work", "confused", "gym", "payday", "pop", "classical", "rock"],
    baseDesc: "透過九個改變人生的思維設定，幫你在陷入社畜迷惘時重新校準人生羅盤，找到工作與生命的無窮熱忱。",
    directUrl: ""
  },
  {
    id: "b007",
    title: "親密恐懼",
    author: "周慕姿",
    isbn: "9789869927840",
    category: "關係心理",
    lengthType: "full",
    tags: ["angry", "love", "crying", "nostalgic", "blues", "love", "pop"],
    baseDesc: "為什麼我們越愛一個人，反而越容易把對方推開或氣到內傷？深度剖析原生家庭與感情裡的防衛機制，溫柔修補關係裂痕。",
    directUrl: ""
  },
  {
    id: "b008",
    title: "高敏感是種天賦",
    author: "伊麗絲・桑德",
    isbn: "9789869468947",
    category: "心理療癒",
    lengthType: "medium",
    tags: ["anxious", "tired", "emo", "crying", "classical", "jazz", "blues"],
    baseDesc: "社交能量總是瞬間歸零？別人的小眼神就讓你內耗一整天？這本書教你接納敏銳的感知力，把脆弱轉化為獨特的溫柔天賦。",
    directUrl: ""
  },
  {
    id: "b009",
    title: "情緒勒索",
    author: "周慕姿",
    isbn: "9789869413923",
    category: "職場與關係",
    lengthType: "medium",
    tags: ["work", "angry", "tired", "anxious", "rock", "hiphop", "pop"],
    baseDesc: "面對職場上司的無理要求或伴侶家人的壓力，教你建立健康的「心理界限」，不再因為害怕當壞人而委屈自己。",
    directUrl: ""
  },
  {
    id: "b010",
    title: "刻意練習",
    author: "安德斯・艾瑞克森",
    isbn: "9789861754604",
    category: "潛能開發",
    lengthType: "full",
    tags: ["gym", "work", "payday", "confused", "hiphop", "rock", "classical"],
    baseDesc: "打破「一萬小時定律」迷思！揭開世界頂尖音樂家、運動員與專業人士如何透過有目標的回饋訓練，突破能力高原期。",
    directUrl: ""
  },
  {
    id: "b011",
    title: "心流：高手都在研究的快樂祕籍",
    author: "米哈里・契克森米哈賴",
    isbn: "9789864776009",
    category: "正向心理學",
    lengthType: "full",
    tags: ["gym", "autopilot", "confused", "holiday", "classical", "jazz", "rock"],
    baseDesc: "當你全神貫注投入一件事情時，時間感會消失、焦慮會退散。心理學大師帶你將日常瑣事轉化為充滿忘我樂趣的「心流體驗」。",
    directUrl: ""
  },
  {
    id: "b012",
    title: "底層邏輯",
    author: "劉潤",
    isbn: "9786263182196",
    category: "思維訓練",
    lengthType: "full",
    tags: ["work", "payday", "confused", "angry", "hiphop", "rock", "pop"],
    baseDesc: "看清這個世界的底牌！當你在職場或生活中感到大腦當機、被情緒牽著走時，用清晰的邏輯框架幫你瞬間撥雲見日。",
    directUrl: ""
  },
  {
    id: "b013",
    title: "安靜是種超能力",
    author: "張瀞仁",
    isbn: "9789571374123",
    category: "職場心理",
    lengthType: "medium",
    tags: ["anxious", "work", "tired", "autopilot", "classical", "jazz", "blues"],
    baseDesc: "給內向者的職場進擊指南！不用強迫自己變成嗨咖或社交蝴蝶，只要善用傾聽與深度思考的優勢，安靜的人也能閃閃發光。",
    directUrl: ""
  },
  {
    id: "b014",
    title: "真正的快樂處方",
    author: "安德斯・韓森",
    isbn: "9789571383156",
    category: "腦科學健康",
    lengthType: "medium",
    tags: ["gym", "tired", "emo", "anxious", "pop", "rock", "hiphop"],
    baseDesc: "瑞典國民精神科醫師實證：運動對大腦的療癒效果堪比抗憂鬱劑！帶你認識多巴胺、血清素與腦內啡如何重塑你的好心情。",
    directUrl: ""
  },
  {
    id: "b015",
    title: "當下的力量",
    author: "艾克哈特・托勒",
    isbn: "9789866739620",
    category: "心靈覺察",
    lengthType: "full",
    tags: ["anxious", "confused", "angry", "nostalgic", "classical", "blues", "jazz"],
    baseDesc: "我們總是為過去懊悔、為未來焦慮，卻唯獨錯過了「現在」。透過簡單的呼吸與覺察，關掉大腦喋喋不休的內耗雜音。",
    directUrl: ""
  },

  // --- 二、台灣文學、散文與台南在地情懷 (12本) ---
  {
    id: "b016",
    title: "俗女養成記",
    author: "江鵝",
    isbn: "9789869272858",
    category: "台灣散文",
    lengthType: "medium",
    tags: ["nostalgic", "holiday", "hungry", "taiwanese", "pop", "rock", "work"],
    baseDesc: "六年級台南女生的成長史！充滿中藥行香氣、阿嬤的碎念與傳統家庭的哭笑不得，讀起來就像聽一首地道的老歌般親切。",
    directUrl: ""
  },
  {
    id: "b017",
    title: "老派約會之必要",
    author: "李維菁",
    isbn: "9789862133910",
    category: "抒情散文",
    lengthType: "medium",
    tags: ["nostalgic", "love", "emo", "crying", "taiwanese", "jazz", "blues"],
    baseDesc: "「帶我出門，用老派的方式約我，在我拒絕你兩次之後，第三次我會點頭。」字字句句寫盡對純粹愛情的渴望與城市男女的孤寂。",
    directUrl: ""
  },
  {
    id: "b018",
    title: "台北人",
    author: "白先勇",
    isbn: "9789573262077",
    category: "台灣經典文學",
    lengthType: "full",
    tags: ["nostalgic", "emo", "crying", "taiwanese", "classical", "blues"],
    baseDesc: "華文文學不朽傳奇。十四篇短篇小說刻畫大時代流轉下的昔日繁華與今朝滄桑，餘韻如同黑膠老唱片般深邃迷人。",
    directUrl: ""
  },
  {
    id: "b019",
    title: "天橋上的魔術師",
    author: "吳明益",
    isbn: "9789868774407",
    category: "台灣小說",
    lengthType: "medium",
    tags: ["nostalgic", "escape", "confused", "taiwanese", "jazz", "pop"],
    baseDesc: "重返八〇年代的中華商場，九個孩子的成長記憶交織在魔術師的小黑人與金魚之中。因為消逝，所以記憶才顯得如此魔幻。",
    directUrl: ""
  },
  {
    id: "b020",
    title: "單車失竊記",
    author: "吳明益",
    isbn: "9789869180825",
    category: "長篇小說",
    lengthType: "full",
    tags: ["nostalgic", "escape", "holiday", "taiwanese", "classical", "blues"],
    baseDesc: "從一輛失蹤二十年的幸福牌腳踏車展開追尋，穿越台灣鐵馬誌、動物園大象林旺與二戰叢林戰場，史詩級的台灣記憶拼圖。",
    directUrl: ""
  },
  {
    id: "b021",
    title: "府城一味：時間煮字，情感入味",
    author: "王浩一",
    isbn: "9789862138045",
    category: "飲食文化",
    lengthType: "short",
    tags: ["hungry", "holiday", "typhoon", "nostalgic", "taiwanese", "jazz", "pop"],
    baseDesc: "台南城市作家帶路！從清晨的牛肉湯、鹹粥到深夜的小吃攤，每一道台南料理背後都藏著老派府城人的生活哲學與歷史典故。",
    directUrl: ""
  },
  {
    id: "b022",
    title: "洗頭",
    author: "洪愛珠",
    isbn: "9786263106154",
    category: "生活散文",
    lengthType: "medium",
    tags: ["tired", "holiday", "hungry", "nostalgic", "taiwanese", "jazz", "blues"],
    baseDesc: "記錄台灣傳統家庭理髮廳的坐洗文化、老派飲食與旅途風景。文字溫潤從容，讀著讀著彷彿有人正溫柔地替你按摩頭皮般舒暢。",
    directUrl: ""
  },
  {
    id: "b023",
    title: "老派少女購物路線",
    author: "洪愛珠",
    isbn: "9789865225056",
    category: "飲食散文",
    lengthType: "medium",
    tags: ["hungry", "nostalgic", "crying", "holiday", "taiwanese", "love", "jazz"],
    baseDesc: "穿梭大稻埕、蘆洲菜場與香港老舖，在滷肉、蒸魚與青草茶的香氣中，懷念離開的母親與外婆。極致療癒的味覺與親情記憶。",
    directUrl: ""
  },
  {
    id: "b024",
    title: "我家住在張日興隔壁",
    author: "楊富閔",
    isbn: "9789863233381",
    category: "鄉土散文",
    lengthType: "medium",
    tags: ["nostalgic", "holiday", "typhoon", "taiwanese", "pop", "rock"],
    baseDesc: "來自台南大內區的鮮活童年記趣！柑仔店、三合院、神明遶境與阿公阿嬤的日常鬥嘴，讓你瞬間忘卻都市社畜的煩憂。",
    directUrl: ""
  },
  {
    id: "b025",
    title: "偽魚販指南",
    author: "林楷倫",
    isbn: "9786267061220",
    category: "職人散文",
    lengthType: "medium",
    tags: ["work", "payday", "tired", "angry", "taiwanese", "rock", "hiphop"],
    baseDesc: "站在魚攤冰水裡看盡人生百態！既是碩士也是三代魚販的作者，用最生猛直白的筆觸寫下市場裡的汗水、人情冷暖與家族羈絆。",
    directUrl: ""
  },
  {
    id: "b026",
    title: "做工的人",
    author: "林立青",
    isbn: "9789869410427",
    category: "社會紀實",
    lengthType: "medium",
    tags: ["work", "payday", "tired", "crying", "taiwanese", "rock", "blues"],
    baseDesc: "走進鐵皮圍籬內的工地現場，記錄鋼筋工、電焊工與模板師傅的真實血汗與樂天尊嚴。讀完會對身邊每一份勞動產生深深敬意。",
    directUrl: ""
  },
  {
    id: "b027",
    title: "日常的中斷",
    author: "阿潑",
    isbn: "9789869616027",
    category: "人文紀實",
    lengthType: "full",
    tags: ["typhoon", "confused", "escape", "crying", "classical", "blues", "rock"],
    baseDesc: "當災難或意外突然打斷了我們習以為常的明天，人們該如何修補碎裂的日常？深具人文關懷與思辨力量的紀實文學。",
    directUrl: ""
  },

  // --- 三、日本與世界溫暖小說 (13本) ---
  {
    id: "b028",
    title: "解憂雜貨店",
    author: "東野圭吾",
    isbn: "9789573330127",
    category: "溫馨小說",
    lengthType: "full",
    tags: ["confused", "nostalgic", "holiday", "typhoon", "pop", "taiwanese", "love"],
    baseDesc: "只要寫下煩惱投進鐵捲門，隔天就會在牛奶箱得到回信。穿越時空的奇蹟故事，溫暖解答每一個在人生岔路上迷惘的靈魂。",
    directUrl: ""
  },
  {
    id: "b029",
    title: "山茶花文具店",
    author: "小川糸",
    isbn: "9789863614210",
    category: "日本文學",
    lengthType: "medium",
    tags: ["escape", "holiday", "nostalgic", "love", "classical", "jazz", "taiwanese"],
    baseDesc: "在鎌倉有一家代客寫信的文具店，無論是絕交信、情書還是來自天堂的信，代筆人都能用最適合的紙筆與字跡，傳遞難以言喻的心意。",
    directUrl: ""
  },
  {
    id: "b030",
    title: "深夜食堂",
    author: "安倍夜郎",
    isbn: "9789862873540",
    category: "療癒圖文",
    lengthType: "short",
    tags: ["hungry", "tired", "nostalgic", "work", "taiwanese", "blues", "jazz"],
    baseDesc: "營業時間從午夜十二點到早上七點。菜單上只有豬肉味噌湯定食，但只要老闆做得出來的都可以點。一道料理，一個都市夜歸人故事。",
    directUrl: ""
  },
  {
    id: "b031",
    title: "今天也謝謝招待了",
    author: "角田光代",
    isbn: "9789864776542",
    category: "飲食散文",
    lengthType: "short",
    tags: ["hungry", "typhoon", "payday", "holiday", "pop", "jazz", "love"],
    baseDesc: "集結30篇關於「吃」的溫暖記憶。生病時的一碗粥、發薪日的豪華大餐，原來支撐我們度過人生低谷的，往往就是那一頓頓美食。",
    directUrl: ""
  },
  {
    id: "b032",
    title: "不便利的便利店",
    author: "金浩然",
    isbn: "9789865078898",
    category: "韓國療癒小說",
    lengthType: "medium",
    tags: ["work", "tired", "angry", "hungry", "pop", "jazz", "taiwanese"],
    baseDesc: "首爾青坡洞巷弄裡的小小便利店，失去記憶的街友店員用三角飯糰與玉米鬚茶，溫暖了每一個被生活壓得喘不過氣的客人。",
    directUrl: ""
  },
  {
    id: "b033",
    title: "歡迎光臨夢境百貨",
    author: "李美芮",
    isbn: "9789865250966",
    category: "奇幻療癒",
    lengthType: "medium",
    tags: ["tired", "autopilot", "escape", "nostalgic", "pop", "anime", "jazz"],
    baseDesc: "睡著之後才能造訪的神秘百貨公司！這裡販售各種不可思議的夢境，讓白日裡疲憊不堪的你，在夢裡獲得最溫柔的補償。",
    directUrl: ""
  },
  {
    id: "b034",
    title: "便利店人間",
    author: "村田沙耶香",
    isbn: "9789863585299",
    category: "當代小說",
    lengthType: "medium",
    tags: ["work", "autopilot", "anxious", "confused", "hiphop", "rock", "blues"],
    baseDesc: "在便利商店打工18年的古倉惠子，覺得只有穿上制服、喊出標準的「歡迎光臨」，自己才像個正常運轉的世界齒輪。獻給格格不入的人。",
    directUrl: ""
  },
  {
    id: "b035",
    title: "百年孤寂",
    author: "賈西亞・馬奎斯",
    isbn: "9789869732208",
    category: "世界經典",
    lengthType: "full",
    tags: ["typhoon", "holiday", "escape", "emo", "classical", "blues", "rock"],
    baseDesc: "魔幻寫實主義最高峰。馬康多小鎮與邦迪亞家族百年的興衰愛恨，適合在漫長的連假或風雨之夜，配著深沉樂章細細品讀。",
    directUrl: ""
  },
  {
    id: "b036",
    title: "小王子",
    author: "聖修伯里",
    isbn: "9789863441496",
    category: "經典寓言",
    lengthType: "short",
    tags: ["emo", "nostalgic", "love", "escape", "classical", "jazz", "love"],
    baseDesc: "「真正重要的東西，用眼睛是看不見的，必須用心去感受。」給所有曾經是小孩的大人，找回心中那朵獨一無二的玫瑰。",
    directUrl: ""
  },
  {
    id: "b037",
    title: "牧羊少年奇幻之旅",
    author: "保羅・科爾賀",
    isbn: "9789573252092",
    category: "心靈小說",
    lengthType: "medium",
    tags: ["escape", "confused", "gym", "holiday", "pop", "rock", "anime"],
    baseDesc: "「當你真心渴望某樣東西時，整個宇宙都會聯合起來幫你完成。」跟隨牧羊少年跨越撒哈拉沙漠，重新點燃對生命冒險的渴望。",
    directUrl: ""
  },
  {
    id: "b038",
    title: "挪威的森林",
    author: "村上春樹",
    isbn: "9789571357904",
    category: "日本文學",
    lengthType: "full",
    tags: ["nostalgic", "emo", "love", "crying", "jazz", "blues", "rock"],
    baseDesc: "飛機降落時響起的披頭四旋律，瞬間將渡邊拉回十九歲的青春迷惘、直子與綠的愛戀。最具黑膠唱片質感的村上春樹代表作。",
    directUrl: ""
  },
  {
    id: "b039",
    title: "咖啡冷掉之前",
    author: "川口俊和",
    isbn: "9789863613947",
    category: "奇幻溫馨",
    lengthType: "medium",
    tags: ["nostalgic", "crying", "love", "emo", "love", "jazz", "classical"],
    baseDesc: "都市傳說中的地下室咖啡店，只要坐上某個特定座位，在咖啡冷掉之前就能回到過去。即使無法改變現實，卻能改變一個人的心意。",
    directUrl: ""
  },
  {
    id: "b040",
    title: "圖書館戰爭",
    author: "有川浩",
    isbn: "9789861748962",
    category: "熱血戀愛小說",
    lengthType: "full",
    tags: ["work", "holiday", "love", "angry", "anime", "rock", "pop"],
    baseDesc: "為了捍衛閱讀自由而武裝起來的圖書隊！熱血率真的笠原郁與魔鬼教官堂上篤，在槍林彈雨與書架之間展開令人心跳加速的戀曲。",
    directUrl: ""
  },

  // --- 四、繪本、圖文與輕鬆短文 (10本) ---
  {
    id: "b041",
    title: "男孩、鼴鼠、狐狸與馬",
    author: "查理・麥克斯",
    isbn: "9789865079437",
    category: "療癒繪本",
    lengthType: "short",
    tags: ["emo", "crying", "escape", "tired", "classical", "jazz", "love"],
    baseDesc: "「你說過最勇敢的話是什麼？」「幫幫我。」全書充滿溫暖的手繪插圖與簡短對話，隨手翻開一頁都能瞬間被深深擁抱。",
    directUrl: ""
  },
  {
    id: "b042",
    title: "向左走・向右走",
    author: "幾米",
    isbn: "9789862133019",
    category: "經典繪本",
    lengthType: "short",
    tags: ["love", "nostalgic", "typhoon", "emo", "love", "jazz", "classical"],
    baseDesc: "她習慣向左走，他習慣向右走。城市裡兩條平行的寂寞軌跡，在午後噴水池畔交會，又被一場大雨沖散。百看不厭的浪漫繪本。",
    directUrl: ""
  },
  {
    id: "b043",
    title: "星空",
    author: "幾米",
    isbn: "9789862131282",
    category: "療癒繪本",
    lengthType: "short",
    tags: ["escape", "emo", "nostalgic", "anxious", "classical", "anime", "pop"],
    baseDesc: "那一年夏天，我們一起逃離城市去看最燦爛的星空。幾米最瑰麗動人的視覺詩篇，撫慰每一個在成長中感到孤單的心靈。",
    directUrl: ""
  },
  {
    id: "b044",
    title: "大象能不能過馬路",
    author: "吉竹伸介",
    isbn: "9789865593322",
    category: "幽默繪本",
    lengthType: "short",
    tags: ["autopilot", "tired", "angry", "confused", "pop", "hiphop", "jazz"],
    baseDesc: "日本繪本鬼才吉竹伸介的腦洞大開之作！當你覺得大腦死機、世界太荒謬時，翻開這本小書，看他用超無厘頭的角度瞬間逗笑你。",
    directUrl: ""
  },
  {
    id: "b045",
    title: "什麼都沒有發生",
    author: "陳珊妮, 幾米等 / 慢工文化",
    isbn: "9789869681599",
    category: "獨立圖文",
    lengthType: "short",
    tags: ["autopilot", "anxious", "tired", "typhoon", "jazz", "blues", "rock"],
    baseDesc: "在充滿資訊焦慮的時代，允許自己度過一個「什麼事都沒發生」的午後。精緻的紙上電影感，適合配著黑膠音樂靜靜翻閱。",
    directUrl: ""
  },
  {
    id: "b046",
    title: "一個人住第5年",
    author: "高木直子",
    isbn: "9789861750118",
    category: "生活圖文",
    lengthType: "short",
    tags: ["payday", "hungry", "holiday", "typhoon", "pop", "anime", "jazz"],
    baseDesc: "150公分小個子女生一個人在東京打拚的爆笑溫馨日常！發薪水去超市買特價牛肉、颱風天在家煮火鍋，充滿超強生活共鳴。",
    directUrl: ""
  },
  {
    id: "b047",
    title: "貓咪看家",
    author: "町田尚子",
    isbn: "9789865071738",
    category: "奇想繪本",
    lengthType: "short",
    tags: ["holiday", "escape", "work", "autopilot", "jazz", "pop", "anime"],
    baseDesc: "以為主人在上班時，家裡的貓咪都在睡大頭覺嗎？其實牠早就偷偷出門去泡湯、吃握壽司、看電影啦！愛貓人必讀的療癒神作。",
    directUrl: ""
  },
  {
    id: "b048",
    title: "今天不會都是壞事",
    author: "せきの (Sekino)",
    isbn: "9789865252106",
    category: "溫暖圖文",
    lengthType: "short",
    tags: ["work", "emo", "crying", "tired", "pop", "love", "jazz"],
    baseDesc: "就算早上趕公車跌倒、上班被罵，只要下班路上遇見一隻可愛的狗狗或買到剛出爐的可樂餅，今天就不算太糟。輕輕接住你的小確喪。",
    directUrl: ""
  },
  {
    id: "b049",
    title: "吃飽睡飽，人生不怕",
    author: "水島廣子",
    isbn: "9789869766159",
    category: "生活輕讀",
    lengthType: "short",
    tags: ["hungry", "tired", "angry", "anxious", "pop", "jazz", "taiwanese"],
    baseDesc: "精神科醫師最直白的處方箋：遇到天大的煩惱，先去吃頓好吃的、睡個好覺再說！文字極度精簡好讀，五分鐘就能幫心情充飽電。",
    directUrl: ""
  },
  {
    id: "b050",
    title: "如果歷史是一群喵",
    author: "肥志",
    isbn: "9789869681513",
    category: "幽默圖文",
    lengthType: "short",
    tags: ["autopilot", "typhoon", "tired", "hungry", "anime", "pop", "hiphop"],
    baseDesc: "當大腦完全不想運轉時的最佳救星！十二隻圓滾滾的可愛貓咪演繹歷史故事，輕鬆搞笑無負擔，翻幾頁就能嘴角上揚。",
    directUrl: ""
  },

  // --- 五、熱血動漫、科幻與科普生活 (10本) ---
  {
    id: "b051",
    title: "葬送的芙莉蓮",
    author: "山田鐘人, 阿部司",
    isbn: "9789865242428",
    category: "奇幻動漫",
    lengthType: "short",
    tags: ["nostalgic", "escape", "emo", "holiday", "anime", "classical", "pop"],
    baseDesc: "打倒魔王之後的勇者一行人，精靈魔法使芙莉蓮在漫長的歲月中，重新踏上旅途去理解「人類的壽命與情感」。溫柔卻後勁極強。",
    directUrl: ""
  },
  {
    id: "b052",
    title: "怪獸8號",
    author: "松本直也",
    isbn: "9789860634211",
    category: "熱血動漫",
    lengthType: "short",
    tags: ["work", "payday", "gym", "angry", "anime", "rock", "hiphop"],
    baseDesc: "32歲負責清理怪獸屍體的社畜大叔，意外獲得變身怪獸的強大力量，再次向年輕時放棄的防衛隊夢想發起熱血衝鋒！",
    directUrl: ""
  },
  {
    id: "b053",
    title: "排球少年！！",
    author: "古館春一",
    isbn: "9789863248293",
    category: "運動動漫",
    lengthType: "short",
    tags: ["gym", "work", "tired", "holiday", "anime", "rock", "pop"],
    baseDesc: "「排球是永遠向上看的運動！」沒有超能力，只有純粹的汗水、團隊信任與不甘心的淚水，瞬間點燃你全身的多巴胺與鬥志。",
    directUrl: ""
  },
  {
    id: "b054",
    title: "灌籃高手 新裝再編版",
    author: "井上雄彥",
    isbn: "9789572615294",
    category: "傳奇動漫",
    lengthType: "short",
    tags: ["gym", "nostalgic", "payday", "work", "anime", "rock", "hiphop"],
    baseDesc: "「現在放棄的話，比賽就結束了喔。」伴隨熱血搖滾主題曲，重溫湘北籃球隊最沸騰的夏天，找回永不服輸的少年魂。",
    directUrl: ""
  },
  {
    id: "b055",
    title: "一拳超人",
    author: "ONE, 村田雄介",
    isbn: "9789863826286",
    category: "爽快動漫",
    lengthType: "short",
    tags: ["angry", "work", "autopilot", "gym", "anime", "rock", "hiphop"],
    baseDesc: "不管多囂張的反派怪人，琦玉老師通通「一拳解決」！適合在今天被氣到內傷或工作壓力爆表時翻閱，享受最純粹的解壓爽快感。",
    directUrl: ""
  },
  {
    id: "b056",
    title: "海賊王 ONE PIECE",
    author: "尾田榮一郎",
    isbn: "9789861105192",
    category: "冒險動漫",
    lengthType: "short",
    tags: ["escape", "holiday", "crying", "gym", "anime", "rock", "pop"],
    baseDesc: "揚起風帆駛向偉大的航道！自由、夥伴與熱血的冒險篇章，讓你暫時拋下現實瑣事，跟著草帽一行人放聲大笑與痛哭。",
    directUrl: ""
  },
  {
    id: "b057",
    title: "我的英雄學院",
    author: "堀越耕平",
    isbn: "9789863824978",
    category: "王道動漫",
    lengthType: "short",
    tags: ["gym", "confused", "crying", "work", "anime", "rock", "hiphop"],
    baseDesc: "天生「無個性」的少年綠谷出久，如何靠著筆記與不屈的意志成為最棒的英雄？極具張力的分鏡與配樂感，讓人熱血沸騰。",
    directUrl: ""
  },
  {
    id: "b058",
    title: "三體",
    author: "劉慈欣",
    isbn: "9789578017375",
    category: "硬派科幻",
    lengthType: "full",
    tags: ["escape", "typhoon", "autopilot", "confused", "classical", "rock", "anime"],
    baseDesc: "雨果獎得主科幻巨作！當視角拉升到四光年外的三體文明與浩瀚宇宙尺度時，地球上的職場鳥事與日常煩惱瞬間渺小如塵埃。",
    directUrl: ""
  },
  {
    id: "b059",
    title: "為什麼要睡覺？",
    author: "沃克 (Matthew Walker)",
    isbn: "9789864796311",
    category: "健康科普",
    lengthType: "full",
    tags: ["tired", "autopilot", "work", "angry", "classical", "jazz", "blues"],
    baseDesc: "加州大學柏克萊分校睡眠科學家揭密：睡眠如何清洗大腦毒素、修復情緒創傷與提升記憶力。給總是熬夜透支的你最科學的溫柔提醒。",
    directUrl: ""
  },
  {
    id: "b060",
    title: "不去會死！",
    author: "石田裕輔",
    isbn: "9789867297952",
    category: "旅遊冒險",
    lengthType: "full",
    tags: ["escape", "holiday", "gym", "work", "rock", "hiphop", "anime"],
    baseDesc: "辭掉人人稱羨的大企業工作，騎著一輛腳踏車環遊世界七年半！看見秘魯沙漠的滿天星斗與極地風光，獻給想拋下一切去旅行的你。",
    directUrl: ""
  }
];

export default function BookRecommender() {
  // 流程與選擇狀態
  const [step, setStep] = useState(1);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [selectedLength, setSelectedLength] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [spinCount, setSpinCount] = useState(0);

  // 館藏與連結設定狀態 (對外完全隱藏資料庫筆數)
  const [booksDb, setBooksDb] = useState(INITIAL_LIBRARY_DATABASE);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [urlPattern, setUrlPattern] = useState(
    "https://library.show.org.tw/search?searchField=TI&searchInput={title}"
  );
  const [adminTab, setAdminTab] = useState("route"); // 'route' | 'customUrl'
  const [dbSearchTerm, setDbSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  // 第一站：15種心情與身體狀態
  const moods = [
    { id: 'work', label: '社畜心酸', code: 'M-01', icon: <Coffee className="w-4 h-4" /> },
    { id: 'holiday', label: '明天放假', code: 'M-02', icon: <Sun className="w-4 h-4" /> },
    { id: 'typhoon', label: '等待颱風假', code: 'M-03', icon: <CloudRain className="w-4 h-4" /> },
    { id: 'payday', label: '撐過今天明天發薪水', code: 'M-04', icon: <Zap className="w-4 h-4" /> },
    { id: 'angry', label: '今天被另一半氣到中風', code: 'M-05', icon: <Flame className="w-4 h-4" /> },
    { id: 'tired', label: '體力透支想躺平', code: 'M-06', icon: <BatteryLow className="w-4 h-4" /> },
    { id: 'emo', label: '莫名其妙有點EMO', code: 'M-07', icon: <Frown className="w-4 h-4" /> },
    { id: 'gym', label: '剛運動完多巴胺爆發', code: 'M-08', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'confused', label: '對未來感到微迷惘', code: 'M-09', icon: <Compass className="w-4 h-4" /> },
    { id: 'hungry', label: '嘴饞想吃宵夜但要忍住', code: 'M-10', icon: <Heart className="w-4 h-4" /> },
    { id: 'autopilot', label: '大腦當機進入自動導航', code: 'M-11', icon: <Smile className="w-4 h-4" /> },
    { id: 'crying', label: '想找個地方大哭一場', code: 'M-12', icon: <CloudRain className="w-4 h-4" /> },
    { id: 'anxious', label: '社交能量歸零不想講話', code: 'M-13', icon: <Headphones className="w-4 h-4" /> },
    { id: 'nostalgic', label: '突然很懷念過去的某個人', code: 'M-14', icon: <Music className="w-4 h-4" /> },
    { id: 'escape', label: '想拋下一切去旅行', code: 'M-15', icon: <ArrowRight className="w-4 h-4" /> },
  ];

  // 第二站：9種音樂類型 (黑膠曲風視覺)
  const musicGenres = [
    { id: 'jazz', label: '爵士 Jazz', rpm: '33 ⅓ RPM · BLUE NOTE', desc: '慵懶、微醺、自由的薩克斯風搖擺', accent: 'border-amber-500/60 from-amber-900/40 to-stone-900', labelColor: 'bg-amber-600', icon: <Coffee className="w-4 h-4" /> },
    { id: 'pop', label: '流行 Pop', rpm: '45 RPM · CONTEMPORARY', desc: '抓耳、共鳴、貼近日常的呼吸節奏', accent: 'border-rose-500/60 from-rose-900/35 to-stone-900', labelColor: 'bg-rose-600', icon: <Radio className="w-4 h-4" /> },
    { id: 'blues', label: '藍調 Blues', rpm: '33 ⅓ RPM · MIDNIGHT', desc: '深沉、傾訴、帶點威士忌苦澀的溫柔', accent: 'border-indigo-400/60 from-indigo-950/50 to-stone-900', labelColor: 'bg-indigo-600', icon: <CloudRain className="w-4 h-4" /> },
    { id: 'love', label: '情歌 Love Song', rpm: '33 ⅓ RPM · BALLAD', desc: '酸甜、悸動、直擊心底的慢板旋律', accent: 'border-pink-400/60 from-pink-900/35 to-stone-900', labelColor: 'bg-pink-600', icon: <Heart className="w-4 h-4" /> },
    { id: 'hiphop', label: '嘻哈 Hip-Hop', rpm: '45 RPM · URBAN BEAT', desc: '態度、直白、打破框架的街頭律動', accent: 'border-purple-400/60 from-purple-900/35 to-stone-900', labelColor: 'bg-purple-600', icon: <Mic2 className="w-4 h-4" /> },
    { id: 'classical', label: '古典樂 Classical', rpm: '33 ⅓ RPM · CHAMBER', desc: '純粹、宏大、沉澱思緒的室內樂章', accent: 'border-emerald-500/60 from-emerald-950/45 to-stone-900', labelColor: 'bg-emerald-700', icon: <Feather className="w-4 h-4" /> },
    { id: 'rock', label: '搖滾 Rock', rpm: '45 RPM · OVERDRIVE', desc: '吶喊、釋放、衝破壓抑的失真重拍', accent: 'border-red-500/60 from-red-950/50 to-stone-900', labelColor: 'bg-red-700', icon: <Guitar className="w-4 h-4" /> },
    { id: 'anime', label: '動漫 Anime', rpm: '45 RPM · ANISON OST', desc: '熱血、奇幻、燃起初心的命運主題曲', accent: 'border-orange-400/60 from-orange-900/40 to-stone-900', labelColor: 'bg-orange-500', icon: <Tv className="w-4 h-4" /> },
    { id: 'taiwanese', label: '台語老歌 Taiwanese', rpm: '78 RPM · VINTAGE GOLD', desc: '滄桑、人情味、越陳越香的時代韻味', accent: 'border-teal-400/60 from-teal-950/50 to-stone-900', labelColor: 'bg-teal-700', icon: <Disc className="w-4 h-4" /> },
  ];

  // 第三站：3種閱讀份量
  const readingLengths = [
    { 
      id: 'short', 
      code: 'SIDE A · 輕快短曲',
      label: '只想翻幾頁繪本、圖文、短文', 
      sub: '適合大腦不想運轉、想在幾分鐘內獲得溫暖與療癒的你',
      icon: <Sparkles className="w-5 h-5" />
    },
    { 
      id: 'medium', 
      code: 'SIDE B · 中板奏鳴',
      label: '只想讀短篇小說 / 散文集', 
      sub: '適合泡杯手沖咖啡、享受一段獨立故事或散文隨筆的你',
      icon: <Coffee className="w-5 h-5" />
    },
    { 
      id: 'full', 
      code: 'LP ALBUM · 完整長篇',
      label: '整本慢慢讀', 
      sub: '適合想徹底沉浸在另一個世界、進行深度思考或長途心靈旅行的你',
      icon: <Layers className="w-5 h-5" />
    },
  ];

  const toggleMood = (id) => {
    if (selectedMoods.includes(id)) {
      setSelectedMoods(selectedMoods.filter(m => m !== id));
    } else if (selectedMoods.length < 3) {
      setSelectedMoods([...selectedMoods, id]);
    }
  };

  // 核心大腦：從館藏池計分篩選並生成客製化 DJ 導讀語
  const generateBooks = (isRespin = false) => {
    setIsGenerating(true);
    setStep(4);
    const nextSpin = isRespin ? spinCount + 1 : 0;
    setSpinCount(nextSpin);

    setTimeout(() => {
      const moodLabels = selectedMoods.map(id => moods.find(m => m.id === id)?.label).join('、');
      const musicObj = musicGenres.find(m => m.id === selectedMusic);
      const lengthObj = readingLengths.find(l => l.id === selectedLength);

      // 避免連續抽到完全相同的書：若為換一批 (Re-spin)，稍微降低目前畫面上三本書的權重
      const currentIds = isRespin ? recommendations.map(r => r.id) : [];

      const scoredBooks = booksDb.map(book => {
        let score = 0;
        // 1. 心情標籤匹配
        selectedMoods.forEach(m => {
          if (book.tags?.includes(m)) score += 3.5;
        });
        // 2. 音樂風格匹配
        if (book.tags?.includes(selectedMusic)) score += 3.5;
        // 3. 閱讀份量匹配
        if (book.lengthType === selectedLength) score += 3;
        // 4. 若剛出現過，扣減分數以確保換一批時能看到新書目
        if (currentIds.includes(book.id)) score -= 6;
        // 5. 加入有機隨機擾動，讓每次點播都有新鮮驚喜
        score += Math.random() * 2.2;
        return { ...book, score };
      });

      scoredBooks.sort((a, b) => b.score - a.score);
      const top3 = scoredBooks.slice(0, 3);

      // 動態組裝黑膠試聽室 DJ 導讀語
      const customizedBooks = top3.map((book, idx) => {
        let musicVibe = "";
        if (selectedMusic === 'taiwanese') musicVibe = "伴隨著台語老歌那股看盡人生百態的溫潤韻味，";
        else if (selectedMusic === 'anime') musicVibe = "隨著動漫樂章揚起的熱血與奇幻初心，";
        else if (selectedMusic === 'rock') musicVibe = "在搖滾樂直率釋放壓力的鼓點之下，";
        else if (selectedMusic === 'jazz' || selectedMusic === 'blues') musicVibe = `在${musicObj?.label}微醺深沉的搖擺旋律中，`;
        else if (selectedMusic === 'classical') musicVibe = "在古典室內樂沉澱思緒的純粹空間裡，";
        else musicVibe = `聽著你點播的${musicObj?.label}旋律，`;

        const customIntro = idx === 0 
          ? `【A面首推】捕捉到你今日「${moodLabels}」的頻率，${musicVibe}這本書恰好能溫柔接住你此刻的狀態：`
          : idx === 1
          ? `【B面共鳴】呼應你「${lengthObj?.label}」的閱讀節奏，這本館藏會在翻開瞬間帶來剛剛好的陪伴：`
          : `【隱藏曲目】在歌單尾聲，點書機私心為今天的你留了這本書，讓思緒換個角度自由呼吸：`;

        return {
          ...book,
          customIntro,
          trackNo: `TRACK 0${idx + 1}`
        };
      });

      setRecommendations(customizedBooks);
      setIsGenerating(false);
    }, 850);
  };

  // ============================================================================
  // 🔗 直接產生秀傳圖書館檢索 / 書目專屬網址 (純粹的 <a href> 直連，不卡彈窗)
  // ============================================================================
  const buildLibraryDirectUrl = (book) => {
    if (book.directUrl && book.directUrl.trim() !== "") {
      return book.directUrl.trim();
    }
    return urlPattern
      .replace('{title}', encodeURIComponent(book.title))
      .replace('{isbn}', encodeURIComponent(book.isbn || ''))
      .replace('{author}', encodeURIComponent(book.author || ''));
  };

  const handleUpdateDirectUrl = (bookId, newUrl) => {
    const updated = booksDb.map(b => b.id === bookId ? { ...b, directUrl: newUrl } : b);
    setBooksDb(updated);
    if (recommendations.length > 0) {
      setRecommendations(recommendations.map(r => r.id === bookId ? { ...r, directUrl: newUrl } : r));
    }
    setToastMessage(`已儲存《${booksDb.find(b => b.id === bookId)?.title}》專屬直連網址`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const resetAll = () => {
    setStep(1);
    setSelectedMoods([]);
    setSelectedMusic(null);
    setSelectedLength(null);
    setRecommendations([]);
    setSpinCount(0);
  };

  const currentGenreObj = musicGenres.find(g => g.id === selectedMusic);

  return (
    <div className="min-h-screen bg-[#121110] text-[#F5F2EB] font-sans selection:bg-[#D4AF37] selection:text-[#121110] flex flex-col justify-between relative overflow-x-hidden">
      {/* 環境微光與紙質紋理背景 */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-amber-600/10 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-orange-800/10 blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[32rem] h-64 rounded-full bg-stone-700/10 blur-[100px]" />
      </div>

      {/* 右下角輕量提示 Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#D4AF37] text-[#121110] px-4 py-2.5 rounded-xl font-bold text-xs shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =====================================================================
          頂部精品黑膠書房導覽列 (Editorial Header)
      ===================================================================== */}
      <header className="relative z-20 border-b border-stone-800/80 bg-[#121110]/85 backdrop-blur-md sticky top-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
          {/* 品牌標誌 */}
          <div 
            onClick={resetAll}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            {/* 精緻動態黑膠圖示 */}
            <div className="relative w-12 h-12 rounded-full bg-stone-950 border-2 border-[#D4AF37]/60 flex items-center justify-center shadow-lg shadow-amber-950/40 group-hover:scale-105 transition-transform">
              <div className="absolute inset-1 rounded-full border border-stone-800" />
              <div className="absolute inset-2.5 rounded-full border border-stone-800/80" />
              <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#D4AF37] to-amber-200 flex items-center justify-center animate-spin" style={{ animationDuration: '10s' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-[#121110]" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-[0.22em] text-[#D4AF37] uppercase">
                  TAINAN MUNICIPAL HOSPITAL LIBRARY
                </span>
                <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-stone-600" />
                <span className="hidden sm:inline-block text-[10px] font-mono tracking-widest text-stone-400">
                  台南市立醫院圖書館・秀傳醫療體系
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-wide text-[#F5F2EB] flex items-baseline gap-2.5 mt-0.5">
                <span>心情音樂點書機</span>
                <span className="text-xs font-mono font-normal text-stone-400 tracking-widest uppercase hidden md:inline">
                  Vinyl & Book Listening Booth
                </span>
              </h1>
            </div>
          </div>

          {/* 右側黑膠唱機狀態指示器 */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#1C1917] border border-stone-800 text-xs">
              <span className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 h-3 bg-[#D4AF37] animate-pulse" />
                <span className="w-0.5 h-2 bg-[#D4AF37] animate-pulse" style={{ animationDelay: '0.2s' }} />
                <span className="w-0.5 h-3.5 bg-[#D4AF37] animate-pulse" style={{ animationDelay: '0.4s' }} />
              </span>
              <span className="font-mono text-[11px] text-stone-300">
                {selectedMusic ? currentGenreObj?.label : 'STANDBY · 請投入心情與音樂'}
              </span>
            </div>

            {step > 1 && (
              <button
                onClick={resetAll}
                className="px-3.5 py-2 rounded-full bg-stone-900 hover:bg-stone-800 border border-stone-700/80 text-stone-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
                title="重新點播"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden sm:inline">重新點播</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* =====================================================================
          主體互動區 (Main Editorial Stage)
      ===================================================================== */}
      <main className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-8 pt-6 pb-16 flex-1">
        {/* 頂部黑膠唱盤與四站式進度軌 */}
        <div className="mb-8 bg-[#1C1917]/90 border border-stone-800/90 rounded-3xl p-4 sm:p-5 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* 左側：黑膠唱盤動態視覺 */}
            <div className="lg:col-span-4 flex items-center gap-4 border-b lg:border-b-0 lg:border-r border-stone-800 pb-4 lg:pb-0 lg:pr-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                {/* 唱片本體 */}
                <div 
                  className={`w-full h-full rounded-full bg-gradient-to-tr from-stone-950 via-stone-900 to-stone-950 border-2 border-stone-700 shadow-inner flex items-center justify-center ${
                    selectedMusic || step === 4 ? 'animate-spin' : ''
                  }`}
                  style={{ animationDuration: '6s' }}
                >
                  <div className="absolute inset-2 rounded-full border border-stone-800/90" />
                  <div className="absolute inset-4 rounded-full border border-stone-800/70" />
                  <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full ${currentGenreObj ? currentGenreObj.labelColor : 'bg-[#D4AF37]'} flex items-center justify-center shadow`}>
                    <div className="w-2 h-2 rounded-full bg-[#121110]" />
                  </div>
                </div>
                {/* 唱臂示意 */}
                <div 
                  className={`absolute -top-1 -right-1 w-6 h-10 border-r-2 border-t-2 border-[#D4AF37]/80 rounded-tr-lg origin-top-right transition-transform duration-500 ${
                    selectedMoods.length > 0 ? 'rotate-12' : '-rotate-12'
                  }`}
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-mono tracking-[0.2em] text-[#D4AF37] uppercase">
                  NOW TUNING · 閱讀調頻台
                </div>
                <div className="text-sm sm:text-base font-serif font-bold text-[#F5F2EB] truncate mt-0.5">
                  {selectedMoods.length > 0 
                    ? selectedMoods.map(id => moods.find(m => m.id === id)?.label).join(' × ')
                    : '尚未選擇今日狀態'}
                </div>
                <div className="text-xs font-mono text-stone-400 truncate mt-1">
                  {currentGenreObj ? `${currentGenreObj.label} (${currentGenreObj.rpm})` : '等待挑選黑膠曲風...'}
                </div>
              </div>
            </div>

            {/* 右側：四站式導覽按鈕 */}
            <div className="lg:col-span-8 grid grid-cols-4 gap-2">
              {[
                { num: 1, code: 'STATION 01', title: '今日狀態', sub: `${selectedMoods.length}/3 情緒` },
                { num: 2, code: 'STATION 02', title: '黑膠曲風', sub: currentGenreObj ? currentGenreObj.label.split(' ')[0] : '9 選 1' },
                { num: 3, code: 'STATION 03', title: '閱讀份量', sub: selectedLength ? readingLengths.find(l => l.id === selectedLength)?.code.split(' ')[1] : '3 選 1' },
                { num: 4, code: 'STATION 04', title: '專屬處方', sub: '3 本精選' }
              ].map((s) => {
                const isActive = step === s.num;
                const isDone = step > s.num;
                return (
                  <button
                    key={s.num}
                    disabled={s.num > step}
                    onClick={() => { if (s.num < step) setStep(s.num); }}
                    className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all ${
                      isActive
                        ? 'bg-gradient-to-br from-[#D4AF37] to-[#b89225] text-[#121110] border-[#E5C158] shadow-lg shadow-amber-500/15'
                        : isDone
                        ? 'bg-stone-900/90 border-stone-700 text-[#F5F2EB] hover:border-[#D4AF37]/60 cursor-pointer'
                        : 'bg-stone-950/50 border-stone-800/60 text-stone-600 cursor-not-allowed'
                    }`}
                  >
                    <div className={`text-[9px] font-mono tracking-wider uppercase ${isActive ? 'text-stone-900 font-bold' : isDone ? 'text-[#D4AF37]' : 'text-stone-600'}`}>
                      {s.code}
                    </div>
                    <div className="font-serif font-bold text-xs sm:text-sm mt-0.5 truncate">
                      {s.title}
                    </div>
                    <div className={`text-[10px] font-mono mt-0.5 truncate hidden sm:block ${isActive ? 'text-stone-900/80' : 'text-stone-500'}`}>
                      {s.sub}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ===================================================================
            第一站：今天的心情或身體狀態 (15種情緒，選 1~3 個)
        =================================================================== */}
        {step === 1 && (
          <section className="bg-[#1C1917]/90 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-7 border-b border-stone-800">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#D4AF37] uppercase">
                  <span>STATION 01 · MOOD & SOMATIC STATE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F5F2EB] mt-2">
                  今天的心情或身體狀態是哪一種？
                </h2>
                <p className="text-stone-400 text-sm mt-1.5">
                  請像挑選黑膠唱片的 A/B 面一樣，勾選 <span className="text-[#D4AF37] font-semibold">1 至 3 個</span> 最貼近你此刻真實感受的標籤
                </p>
              </div>

              <div className="px-4 py-2 rounded-full bg-stone-950 border border-stone-800 text-xs font-mono text-[#D4AF37] self-start sm:self-end shrink-0">
                SELECTED: {selectedMoods.length} / 3
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {moods.map((mood) => {
                const isSelected = selectedMoods.includes(mood.id);
                return (
                  <button
                    key={mood.id}
                    onClick={() => toggleMood(mood.id)}
                    className={`group relative overflow-hidden flex items-center gap-3.5 p-4 rounded-2xl border text-left transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37]/10 to-transparent border-[#D4AF37] text-[#F5F2EB] shadow-lg shadow-amber-500/10 scale-[1.01]'
                        : 'bg-[#141312] border-stone-800/90 text-stone-300 hover:border-stone-600 hover:bg-stone-900/90'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                      isSelected ? 'bg-[#D4AF37] text-[#121110]' : 'bg-stone-900 text-stone-400 group-hover:text-[#D4AF37]'
                    }`}>
                      {mood.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-mono tracking-widest text-stone-500">
                        {mood.code}
                      </div>
                      <div className="font-medium text-sm sm:text-base text-[#F5F2EB] leading-snug truncate">
                        {mood.label}
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-[#D4AF37] bg-[#D4AF37] text-[#121110]' : 'border-stone-700'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono text-stone-400">
                {selectedMoods.length === 0 
                  ? "請至少選擇 1 個狀態標籤以啟動黑膠唱盤" 
                  : `已選取：${selectedMoods.map(id => moods.find(m => m.id === id)?.label).join(' ／ ')}`}
              </div>
              <button
                disabled={selectedMoods.length === 0}
                onClick={() => setStep(2)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-serif font-bold text-sm flex items-center justify-center gap-2.5 transition-all bg-[#D4AF37] text-[#121110] hover:bg-[#e3be42] disabled:opacity-30 disabled:pointer-events-none shadow-xl shadow-amber-500/15"
              >
                <span>下一站：挑選黑膠音樂風格</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        )}

        {/* ===================================================================
            第二站：選一種你想要的音樂 (9種曲風，黑膠唱片封套設計)
        =================================================================== */}
        {step === 2 && (
          <section className="bg-[#1C1917]/90 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="pb-6 mb-7 border-b border-stone-800">
              <div className="text-xs font-mono tracking-[0.2em] text-[#D4AF37] uppercase">
                STATION 02 · SELECT VINYL RECORD
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F5F2EB] mt-2">
                選一種你現在最想聽的音樂
              </h2>
              <p className="text-stone-400 text-sm mt-1.5">
                爵士、流行、藍調、情歌、嘻哈、古典樂、搖滾、動漫或台語老歌——讓旋律決定今日書單的靈魂
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {musicGenres.map((genre) => {
                const isSelected = selectedMusic === genre.id;
                return (
                  <button
                    key={genre.id}
                    onClick={() => setSelectedMusic(genre.id)}
                    className={`group relative overflow-hidden rounded-2xl p-5 text-left border transition-all duration-300 flex flex-col justify-between h-40 bg-gradient-to-br ${genre.accent} ${
                      isSelected
                        ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30 scale-[1.02] shadow-2xl'
                        : 'border-stone-800 hover:border-stone-600'
                    }`}
                  >
                    {/* 右側半露出的黑膠唱片視覺 */}
                    <div 
                      className={`absolute -right-8 top-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-stone-950 border-2 border-stone-800/90 flex items-center justify-center transition-transform duration-500 ${
                        isSelected ? 'translate-x-[-10px] rotate-90' : 'group-hover:translate-x-[-6px]'
                      }`}
                    >
                      <div className="w-20 h-20 rounded-full border border-stone-800 flex items-center justify-center">
                        <div className={`w-8 h-8 rounded-full ${genre.labelColor} flex items-center justify-center`}>
                          <div className="w-2 h-2 rounded-full bg-stone-950" />
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 pr-12">
                      <div className="text-[10px] font-mono tracking-widest text-[#D4AF37]">
                        {genre.rpm}
                      </div>
                      <div className="font-serif font-bold text-lg sm:text-xl text-[#F5F2EB] mt-1 flex items-center gap-2">
                        <span>{genre.label}</span>
                      </div>
                    </div>

                    <div className="relative z-10 pr-14 flex items-end justify-between">
                      <p className="text-xs text-stone-300 leading-relaxed">
                        {genre.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-stone-800 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-3 rounded-xl font-medium text-sm text-stone-300 hover:bg-stone-800 transition-all"
              >
                ← 返回修改心情狀態
              </button>
              <button
                disabled={!selectedMusic}
                onClick={() => setStep(3)}
                className="px-8 py-4 rounded-2xl font-serif font-bold text-sm flex items-center gap-2.5 transition-all bg-[#D4AF37] text-[#121110] hover:bg-[#e3be42] disabled:opacity-30 disabled:pointer-events-none shadow-xl shadow-amber-500/15"
              >
                <span>下一站：決定閱讀份量</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        )}

        {/* ===================================================================
            第三站：選擇閱讀份量 (3種長度)
        =================================================================== */}
        {step === 3 && (
          <section className="bg-[#1C1917]/90 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="pb-6 mb-7 border-b border-stone-800">
              <div className="text-xs font-mono tracking-[0.2em] text-[#D4AF37] uppercase">
                STATION 03 · READING PACE & LENGTH
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F5F2EB] mt-2">
                今天想讀多少份量？
              </h2>
              <p className="text-stone-400 text-sm mt-1.5">
                閱讀不需要有任何壓力，無論是隨手翻兩頁繪本、或是讀完一整本小說，都是屬於你的好時光
              </p>
            </div>

            <div className="space-y-4">
              {readingLengths.map((len) => {
                const isSelected = selectedLength === len.id;
                return (
                  <button
                    key={len.id}
                    onClick={() => setSelectedLength(len.id)}
                    className={`w-full p-6 rounded-2xl border text-left transition-all flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37]/10 to-transparent border-[#D4AF37] text-[#F5F2EB] shadow-xl'
                        : 'bg-[#141312] border-stone-800 text-stone-300 hover:border-stone-600'
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-[#D4AF37] text-[#121110]' : 'bg-stone-900 text-[#D4AF37]'
                      }`}>
                        {len.icon}
                      </div>
                      <div>
                        <div className="text-[10px] font-mono tracking-widest text-[#D4AF37]">
                          {len.code}
                        </div>
                        <div className="font-serif font-bold text-lg sm:text-xl text-[#F5F2EB] mt-0.5">
                          {len.label}
                        </div>
                        <div className="text-xs sm:text-sm text-stone-400 mt-1">
                          {len.sub}
                        </div>
                      </div>
                    </div>

                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-[#D4AF37] bg-[#D4AF37] text-[#121110]' : 'border-stone-700'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-stone-800 flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-3 rounded-xl font-medium text-sm text-stone-300 hover:bg-stone-800 transition-all"
              >
                ← 返回重選音樂
              </button>
              <button
                disabled={!selectedLength}
                onClick={() => generateBooks(false)}
                className="px-8 py-4 rounded-2xl font-serif font-bold text-sm flex items-center gap-2.5 transition-all bg-gradient-to-r from-[#D4AF37] to-amber-500 text-[#121110] hover:from-[#e3be42] hover:to-amber-400 disabled:opacity-30 disabled:pointer-events-none shadow-xl shadow-amber-500/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>放下唱針・生成專屬推薦書單</span>
              </button>
            </div>
          </section>
        )}

        {/* ===================================================================
            第四站：黑膠閱讀處方箋結果頁 (3本書 + 換一批特調 + 直接連結館藏)
        =================================================================== */}
        {step === 4 && (
          <section className="space-y-7">
            {isGenerating ? (
              <div className="bg-[#1C1917]/90 border border-stone-800 rounded-3xl p-16 text-center space-y-5 shadow-2xl">
                <div className="relative w-24 h-24 mx-auto">
                  <div className="w-full h-full rounded-full bg-stone-950 border-2 border-[#D4AF37] flex items-center justify-center animate-spin">
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#121110]" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="text-xs font-mono tracking-[0.25em] text-[#D4AF37] uppercase">
                    CURATING YOUR READING TRACKS...
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#F5F2EB]">
                    唱針已落下，正在為您從館藏書架挑選最適合的 3 本書...
                  </h3>
                  <p className="text-stone-400 text-sm">
                    調合您的今日狀態與 {currentGenreObj?.label} 旋律中
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* 處方箋頂部黑膠曲目單橫幅 */}
                <div className="bg-gradient-to-r from-[#1C1917] via-[#231F1C] to-[#1C1917] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#D4AF37] uppercase">
                      <Volume2 className="w-4 h-4" />
                      <span>CURATED PRESCRIPTION · 專屬心情音樂閱讀處方箋</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F5F2EB]">
                      為今天的你，特調出 3 本館藏好書
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {selectedMoods.map(id => (
                        <span key={id} className="px-3 py-1 rounded-full bg-stone-900 text-stone-200 text-xs font-medium border border-stone-700">
                          #{moods.find(m => m.id === id)?.label}
                        </span>
                      ))}
                      <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#E5C158] text-xs font-mono font-semibold border border-[#D4AF37]/40">
                        ♫ {currentGenreObj?.label}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-stone-900/90 text-stone-400 text-xs border border-stone-800">
                        {readingLengths.find(l => l.id === selectedLength)?.label}
                      </span>
                    </div>
                  </div>

                  {/* 換一批特調 & 重新選取按鈕 */}
                  <div className="flex flex-wrap items-center gap-3 self-start md:self-center shrink-0">
                    <button
                      onClick={() => generateBooks(true)}
                      className="px-5 py-3 rounded-2xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#E5C158] border border-[#D4AF37]/50 text-xs sm:text-sm font-serif font-bold flex items-center gap-2 transition-all shadow-lg"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>換一批特調書單 (Re-spin)</span>
                    </button>
                    <button
                      onClick={resetAll}
                      className="px-4 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-700 text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-all"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>重新點播</span>
                    </button>
                  </div>
                </div>

                {/* 三張黑膠封套與借書證風格推薦書卡 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {recommendations.map((book) => {
                    const directHref = buildLibraryDirectUrl(book);
                    return (
                      <article
                        key={book.id}
                        className="bg-[#1C1917] border border-stone-800 hover:border-[#D4AF37]/60 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-2xl group"
                      >
                        <div>
                          {/* 頂部黑膠唱盤編號條 */}
                          <div className="bg-stone-950/90 px-6 py-3.5 border-b border-stone-800/80 flex items-center justify-between">
                            <span className="text-[11px] font-mono tracking-[0.2em] text-[#D4AF37] font-bold">
                              {book.trackNo} · {book.category}
                            </span>
                            <span className="text-[11px] font-mono text-stone-500">
                              ISBN {book.isbn}
                            </span>
                          </div>

                          <div className="p-6 space-y-5">
                            {/* 書名與作者 */}
                            <div>
                              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F5F2EB] group-hover:text-[#E5C158] transition-colors leading-snug">
                                《{book.title}》
                              </h3>
                              <p className="text-xs font-mono text-stone-400 mt-1.5">
                                AUTHOR ／ {book.author}
                              </p>
                            </div>

                            {/* 溫暖米白紙質借書卡：DJ 客製化導讀 */}
                            <div className="p-4 rounded-2xl bg-[#F5F2EB] text-[#1C1917] shadow-inner relative">
                              <div className="text-[10px] font-mono tracking-widest text-stone-500 uppercase mb-1">
                                LIBRARIAN'S NOTE · 點書機導讀
                              </div>
                              <p className="text-xs sm:text-sm font-medium leading-relaxed text-stone-800">
                                {book.customIntro}
                              </p>
                            </div>

                            {/* 館藏內容簡介 */}
                            <div className="space-y-1.5">
                              <div className="text-[10px] font-mono tracking-widest text-stone-500 uppercase">
                                SYNOPSIS · 內容簡介
                              </div>
                              <p className="text-sm text-stone-300 leading-relaxed">
                                {book.baseDesc}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* 底部純原生 <a> 直連秀傳圖書館按鈕 */}
                        <div className="p-6 pt-4 border-t border-stone-800/80 bg-stone-950/40">
                          <a
                            href={directHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3.5 px-5 rounded-2xl font-serif font-bold text-sm bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:from-[#e3be42] hover:to-amber-400 text-[#121110] flex items-center justify-center gap-2 shadow-lg shadow-amber-500/15 transition-all"
                          >
                            <BookOpen className="w-4 h-4" />
                            <span>前往圖書館借閱此書</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </>
            )}
          </section>
        )}
      </main>

      {/* =====================================================================
          低調頁尾與館員專屬小齒輪 (Discreet Footer & Admin Gear)
      ===================================================================== */}
      <footer className="relative z-10 border-t border-stone-900 bg-[#0e0d0c] py-6 px-4 sm:px-8 text-xs text-stone-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Library className="w-3.5 h-3.5 text-[#D4AF37]/70" />
            <span>台南市立醫院圖書館・秀傳醫療體系 館藏查詢系統連動</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://library.show.org.tw/index?loginstate=cb00"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors flex items-center gap-1"
            >
              <span>秀傳圖書館首頁</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            {/* 低調的館員連結設定齒輪，完全不顯示任何書籍總數 */}
            <button
              onClick={() => setShowAdminModal(true)}
              className="p-1.5 rounded-lg text-stone-600 hover:text-stone-300 hover:bg-stone-900 transition-colors"
              title="館藏檢索路由設定"
              aria-label="館藏檢索路由設定"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          館員專屬：館藏檢索路由微調視窗 (點擊頁尾小齒輪才會開啟)
      ===================================================================== */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1C1917] border border-stone-700 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-[#D4AF37]" />
                <h3 className="font-serif font-bold text-base text-[#F5F2EB]">
                  館藏連線參數設定 (library.show.org.tw)
                </h3>
              </div>
              <button
                onClick={() => setShowAdminModal(false)}
                className="p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 pt-3 border-b border-stone-800 flex gap-4 text-xs">
              <button
                onClick={() => setAdminTab("route")}
                className={`pb-3 font-bold border-b-2 transition-all ${
                  adminTab === "route" ? "border-[#D4AF37] text-[#D4AF37]" : "border-transparent text-stone-400"
                }`}
              >
                1. 檢索路由模式切換
              </button>
              <button
                onClick={() => setAdminTab("customUrl")}
                className={`pb-3 font-bold border-b-2 transition-all ${
                  adminTab === "customUrl" ? "border-[#D4AF37] text-[#D4AF37]" : "border-transparent text-stone-400"
                }`}
              >
                2. 單書專屬固定網址綁定
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              {adminTab === "route" ? (
                <>
                  <p className="text-stone-400 leading-relaxed">
                    可自由切換點擊「前往圖書館借閱此書」時的網址參數結構。支援變數：
                    <code className="text-[#D4AF37] bg-stone-900 px-1.5 py-0.5 rounded mx-1">{'{title}'}</code>書名、
                    <code className="text-[#D4AF37] bg-stone-900 px-1.5 py-0.5 rounded mx-1">{'{isbn}'}</code>ISBN碼。
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      onClick={() => setUrlPattern("https://library.show.org.tw/search?searchField=TI&searchInput={title}")}
                      className={`text-left p-3.5 rounded-xl border transition-all ${
                        urlPattern === "https://library.show.org.tw/search?searchField=TI&searchInput={title}"
                          ? "bg-[#D4AF37]/15 border-[#D4AF37] text-[#F5F2EB]"
                          : "bg-stone-900 border-stone-800 text-stone-400"
                      }`}
                    >
                      <div className="font-bold text-white">模式 A：標準題名檢索 (預設)</div>
                      <div className="text-[11px] text-stone-400 truncate mt-1">
                        .../search?searchField=TI&searchInput={'{title}'}
                      </div>
                    </button>

                    <button
                      onClick={() => setUrlPattern("https://library.show.org.tw/search?searchField=TI&searchInput={title}&loginstate=cb00")}
                      className={`text-left p-3.5 rounded-xl border transition-all ${
                        urlPattern.includes("loginstate=cb00") && urlPattern.includes("searchField=TI")
                          ? "bg-[#D4AF37]/15 border-[#D4AF37] text-[#F5F2EB]"
                          : "bg-stone-900 border-stone-800 text-stone-400"
                      }`}
                    >
                      <div className="font-bold text-white">模式 B：題名檢索 + 院區代碼 (cb00)</div>
                      <div className="text-[11px] text-stone-400 truncate mt-1">
                        .../search?searchField=TI&searchInput={'{title}'}&loginstate=cb00
                      </div>
                    </button>

                    <button
                      onClick={() => setUrlPattern("https://library.show.org.tw/search?searchField=ISBN&searchInput={isbn}")}
                      className={`text-left p-3.5 rounded-xl border transition-all ${
                        urlPattern.includes("searchField=ISBN")
                          ? "bg-[#D4AF37]/15 border-[#D4AF37] text-[#F5F2EB]"
                          : "bg-stone-900 border-stone-800 text-stone-400"
                      }`}
                    >
                      <div className="font-bold text-white">模式 C：ISBN 唯一碼精準檢索</div>
                      <div className="text-[11px] text-stone-400 truncate mt-1">
                        .../search?searchField=ISBN&searchInput={'{isbn}'}
                      </div>
                    </button>

                    <button
                      onClick={() => setUrlPattern("https://library.show.org.tw/search?searchField=AW&searchInput={title}")}
                      className={`text-left p-3.5 rounded-xl border transition-all ${
                        urlPattern.includes("searchField=AW")
                          ? "bg-[#D4AF37]/15 border-[#D4AF37] text-[#F5F2EB]"
                          : "bg-stone-900 border-stone-800 text-stone-400"
                      }`}
                    >
                      <div className="font-bold text-white">模式 D：全文關鍵字檢索 (AW)</div>
                      <div className="text-[11px] text-stone-400 truncate mt-1">
                        .../search?searchField=AW&searchInput={'{title}'}
                      </div>
                    </button>
                  </div>

                  <div className="pt-2">
                    <label className="block text-stone-300 font-medium mb-1.5">自訂檢索路由模板：</label>
                    <input
                      type="text"
                      value={urlPattern}
                      onChange={(e) => setUrlPattern(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-[#D4AF37] font-mono text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="搜尋館藏書名、作者或 ISBN..."
                      value={dbSearchTerm}
                      onChange={(e) => setDbSearchTerm(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {booksDb
                      .filter(b => b.title.includes(dbSearchTerm) || b.author.includes(dbSearchTerm) || b.isbn.includes(dbSearchTerm))
                      .map(book => (
                        <div key={book.id} className="bg-stone-950 border border-stone-800 rounded-xl p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="sm:w-5/12 truncate">
                            <span className="font-bold text-white">《{book.title}》</span>
                            <span className="text-stone-500 ml-1">({book.author})</span>
                          </div>
                          <div className="sm:w-7/12 flex gap-2">
                            <input
                              type="text"
                              placeholder="貼上單書固定網址 (選填)"
                              value={book.directUrl || ""}
                              onChange={(e) => handleUpdateDirectUrl(book.id, e.target.value)}
                              className="flex-1 bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1 text-[#D4AF37] font-mono text-[11px]"
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-3.5 border-t border-stone-800 bg-stone-950 flex justify-end">
              <button
                onClick={() => setShowAdminModal(false)}
                className="px-5 py-2 rounded-xl bg-[#D4AF37] text-[#121110] font-bold text-xs"
              >
                完成並關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}