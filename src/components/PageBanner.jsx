import { PLACEHOLDER_IMAGE } from "@utils/site-constants";
import Image from "next/image";
import Link from "next/link";
import styles from "./PageBanner.module.scss";

export default function PageBanner({
  src = PLACEHOLDER_IMAGE,
  alt = "",
  title,
  subtitle,
  crumbs = [],
}) {
  return (
    <section className={styles.pageBanner}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <nav aria-label="頁面路徑" className={styles.crumbs}>
            <Link href="/">首頁</Link>
            {crumbs.map((crumb) => (
              <span key={crumb.label}>
                {" / "}
                {crumb.href ? (
                  <Link href={crumb.href}>{crumb.label}</Link>
                ) : (
                  crumb.label
                )}
              </span>
            ))}
            {" / "}
            <span aria-current="page">{title}</span>
          </nav>
          <h1 className={styles.pageBannerTitle}>{title}</h1>
          {subtitle && <p className={styles.pageBannerSubtitle}>{subtitle}</p>}
        </div>
        <div className={styles.photo}>
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(max-width: 820px) 0px, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
