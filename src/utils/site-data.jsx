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

export const environmentPhotos = Array.from({ length: 6 }, (_, i) => ({
  id: `env-${i + 1}`,
  alt: `辦公環境 ${i + 1}`,
}));

export const groupPhotos = Array.from({ length: 6 }, (_, i) => ({
  id: `group-${i + 1}`,
  alt: `團隊合影 ${i + 1}`,
}));
