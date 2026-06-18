import { PLACEHOLDER_IMAGE } from "@utils/site-constants";
import Image from "next/image";
import styles from "./PageBanner.module.scss";

export default function PageBanner({
  src = PLACEHOLDER_IMAGE,
  alt,
  title,
  subtitle,
}) {
  return (
    <div className={styles.pageBanner}>
      <Image src={src} alt={alt} width={1920} height={400} priority />
      <div className={styles.overlay} />
      <div className={styles.bannerContent}>
        <h1 className={styles.pageBannerTitle}>{title}</h1>
        {subtitle && <p className={styles.pageBannerSubtitle}>{subtitle}</p>}
      </div>
    </div>
  );
}
