import styles from "./GoogleMap.module.scss";

export default function GoogleMap({ query, title = "地圖" }) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&hl=zh-TW&z=17&output=embed`;

  return (
    <div className={styles.mapWrap}>
      <iframe
        src={src}
        className={styles.map}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      />
    </div>
  );
}
