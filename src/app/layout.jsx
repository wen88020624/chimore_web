import { Footer, Header } from "@components";
import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import Providers from "./providers";
import "./globals.scss";

const notoSans = Noto_Sans_TC({
  weight: ["300", "400", "500", "700"],
  display: "swap",
  preload: false,
  variable: "--font-sans",
});

const notoSerif = Noto_Serif_TC({
  weight: ["600", "700"],
  display: "swap",
  preload: false,
  variable: "--font-serif",
});

export const metadata = {
  title: "奇模工程有限公司",
  description:
    "奇模成立於2006年，主要營業項目包括區域計畫、都市計畫、都市更新以及各種主題之規劃研究。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
