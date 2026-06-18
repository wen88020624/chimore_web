"use client";

import { COMPANY_NAME } from "@utils/site-constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";

const navItems = [
  { href: "/", label: "首頁" },
  { href: "/intro", label: "公司簡介" },
  { href: "/service", label: "服務項目" },
  { href: "/projects", label: "案例實績" },
  { href: "/contact", label: "聯絡我們" },
];

export default function Header() {
  const pathname = usePathname();
  const transparent = pathname === "/";

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={transparent ? styles.siteHeaderTransparent : styles.siteHeader}
    >
      <div className={styles.headerInner}>
        <Link href="/" className={styles.brand}>
          <div className={styles.brandLogo}>
            <Image
              src="/assets/chimore.png"
              alt="奇模"
              width={48}
              height={48}
              priority
              className={styles.brandIcon}
            />
          </div>
          <span className={styles.brandName}>{COMPANY_NAME}</span>
        </Link>
        <nav>
          <ul className={styles.headerNav}>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={
                    isActive(item.href) ? styles.activeLink : styles.navLink
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
