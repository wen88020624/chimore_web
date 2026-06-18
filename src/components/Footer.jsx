import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.siteFooter}>
      <p className={styles.copyright}>
        © {new Date().getFullYear()} 奇模都市計畫顧問有限公司
      </p>
    </footer>
  );
}
