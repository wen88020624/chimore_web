import Typography from "@mui/joy/Typography";
import GoogleMapEmbed from "./GoogleMapEmbed";
import styles from "./OfficeBlock.module.scss";

export default function OfficeBlock({ office }) {
  return (
    <section className={styles.officeBlock}>
      <div className={styles.info}>
        <Typography level="h3" className={styles.officeName}>
          {office.name}
        </Typography>
        <dl className={styles.details}>
          <div>
            <dt>地址</dt>
            <dd>{office.address}</dd>
          </div>
          {office.phone && (
            <div>
              <dt>電話</dt>
              <dd>{office.phone}</dd>
            </div>
          )}
          {office.fax && (
            <div>
              <dt>傳真</dt>
              <dd>{office.fax}</dd>
            </div>
          )}
          {office.email && (
            <div>
              <dt>電子郵件</dt>
              <dd>
                <a href={`mailto:${office.email}`}>{office.email}</a>
              </dd>
            </div>
          )}
        </dl>
      </div>
      <GoogleMapEmbed
        query={office.mapQuery || office.address}
        title={`${office.name}地圖`}
      />
    </section>
  );
}
