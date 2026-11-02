import { FACEBOOK_URL } from "@utils/site-constants";
import Link from "next/link";
import styles from "./Footer.module.scss";
import { FacebookIcon } from "./icons";

const footerLinks = [
  { href: "/intro", label: "公司簡介" },
  { href: "/service", label: "服務項目" },
  { href: "/projects", label: "案例實績" },
  { href: "/contact", label: "聯絡我們" },
];

export default function Footer() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerInner}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} 奇模工程有限公司
        </p>
        <nav aria-label="頁尾選單" className={styles.footerNav}>
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.social}
        >
          <FacebookIcon size={20} />
          Facebook
        </a>
      </div>
    </footer>
  );
}
