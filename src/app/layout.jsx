import { Footer, Header } from "@components";
import Providers from "./providers";
import "./globals.scss";

export const metadata = {
  title: "奇模工程有限公司",
  description:
    "奇模成立於2006年，主要營業項目包括區域計畫、都市計畫、都市更新以及各種主題之規劃研究。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
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
