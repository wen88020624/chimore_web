import { PLACEHOLDER_IMAGE } from "./site-constants";

export const homeHero = {
  headline: "專業都更，展望未來",
  subline: "安居樂業 · 永續共生",
  ctaLabel: "了解更多",
  ctaHref: "/intro",
};

export const homeIntro = {
  title: "奇模簡介",
  description:
    "奇模成立於2006年，主要營業項目包括區域計畫、都市計畫、都市更新以及各種主題之規劃研究，以成為多元化經營與發展的都市計畫專業顧問公司為目標。對於都市計畫通盤檢討及個案變更均涉獵極深，目前亦執行許多個案變更之案例。",
};

export const quickNavLinks = [
  { href: "/intro", label: "公司簡介", icon: "/assets/goIntroImg.svg" },
  { href: "/service", label: "服務項目", icon: "/assets/goServiceImg.svg" },
  { href: "/projects", label: "案例實績", icon: "/assets/goProjectsImg.svg" },
];

export const introPhilosophy = {
  title: "經營理念",
  description:
    "我們以專業、誠信與創新為核心，致力於協助客戶完成都市計畫與都市更新相關業務。透過跨領域整合與務實的規劃方法，為城市發展與居住品質創造長期價值。",
};

export const teamLeaders = [
  { name: "王○○", title: "負責人 / 都市計畫顧問", image: PLACEHOLDER_IMAGE },
  { name: "李○○", title: "合夥人 / 都更專案主持", image: PLACEHOLDER_IMAGE },
];

export const teamMembers = [
  { name: "陳○○", title: "都市計畫師", image: PLACEHOLDER_IMAGE },
  { name: "林○○", title: "都更專案經理", image: PLACEHOLDER_IMAGE },
  { name: "張○○", title: "規劃研究員", image: PLACEHOLDER_IMAGE },
  { name: "黃○○", title: "行政專員", image: PLACEHOLDER_IMAGE },
];

export const teamStats = [
  { label: "都更專案經驗", value: "50+", unit: "件" },
  { label: "專業團隊人數", value: "12", unit: "人" },
  { label: "服務年資", value: "18", unit: "年" },
  { label: "審議通過率", value: "95", unit: "%" },
];

export const serviceIcons = [
  { icon: "/assets/goIntroImg.svg", label: "區域計畫" },
  { icon: "/assets/goServiceImg.svg", label: "都市計畫" },
  { icon: "/assets/goProjectsImg.svg", label: "都市更新" },
  { icon: "/assets/goIntroImg.svg", label: "規劃研究" },
  { icon: "/assets/goServiceImg.svg", label: "可行性評估" },
  { icon: "/assets/goProjectsImg.svg", label: "審議協助" },
];

export const serviceSections = [
  {
    title: "區域計畫",
    items: [
      "區域計畫編撰與修訂",
      "政策與發展策略分析",
      "土地使用與空間配置建議",
      "跨部門協調與公聽規劃",
    ],
    imagePosition: "right",
  },
  {
    title: "都市計畫",
    items: [
      "通盤檢討與細部計畫",
      "土地使用分區變更",
      "開發強度與公共設施檢討",
      "計畫書與圖說編製",
    ],
    imagePosition: "left",
  },
  {
    title: "都市更新",
    items: [
      "可行性與權利變換評估",
      "事業計畫編撰",
      "審議程序協助",
      "住戶與地主溝通協調",
    ],
    imagePosition: "right",
  },
  {
    title: "規劃研究",
    items: [
      "交通與停車研究",
      "環境與景觀分析",
      "社會住宅與社區規劃",
      "主題性政策研究",
    ],
    imagePosition: "left",
  },
  {
    title: "專案管理",
    items: [
      "時程與里程碑管理",
      "跨單位文件整合",
      "審查意見回覆",
      "現場勘查與會議支援",
    ],
    imagePosition: "right",
  },
];

export const featuredProjects = [
  {
    id: "wugu",
    title: "新北市五股區審議大會通過",
    image: "/assets/projectInHome1.jpg",
    description:
      "賀擬訂新北市五股區中興段777地號(原更寮段褒子寮小段73-4地號)等9筆(原5筆)土地都市更新事業計畫案 審議大會通過",
    items: ["中興段777地號等9筆土地", "都市更新事業計畫案", "審議大會通過"],
  },
  {
    id: "zhonghe",
    title: "新北市中和區審議大會通過",
    image: "/assets/projectInHome2.jpg",
    description:
      "賀擬訂新北市中和區健康段954地號等7筆土地都市更新事業計畫案 審議大會通過",
    items: ["健康段954地號等7筆土地", "都市更新事業計畫案", "審議大會通過"],
  },
];

export const projectCategories = [
  {
    title: "新北市都市更新",
    projects: [
      "五股區中興段都市更新事業計畫案",
      "中和區健康段都市更新事業計畫案",
      "板橋區○○段都市更新評估案",
      "三重區○○段事業計畫編撰案",
    ],
  },
  {
    title: "台北市都市計畫",
    projects: [
      "信義區土地使用分區變更案",
      "內湖區細部計畫檢討案",
      "士林區○○段開發許可輔導案",
      "北投區○○段規劃研究案",
    ],
  },
  {
    title: "區域與政策規劃",
    projects: [
      "○○縣區域計畫修訂案",
      "○○市產業園區發展策略研究",
      "交通節點周邊土地使用檢討",
      "公共設施用地配置分析",
    ],
  },
  {
    title: "規劃研究專案",
    projects: [
      "社會住宅選址可行性研究",
      "TOD 導向開發潛力評估",
      "都市設計與景觀視覺分析",
      "環境影響與生態檢討輔助",
    ],
  },
];

export const environmentPhotos = Array.from({ length: 6 }, (_, i) => ({
  id: `env-${i + 1}`,
  alt: `辦公環境 ${i + 1}`,
}));

export const groupPhotos = Array.from({ length: 6 }, (_, i) => ({
  id: `group-${i + 1}`,
  alt: `團隊合影 ${i + 1}`,
}));
