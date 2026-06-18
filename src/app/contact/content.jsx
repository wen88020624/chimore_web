"use client";

import { ContactUs, FacebookLink, OfficeBlock, PageBanner } from "@components";
import Typography from "@mui/joy/Typography";
import { OFFICES } from "@utils/site-constants";
import styles from "./page.module.scss";

export default function ContactContent() {
  return (
    <>
      <PageBanner
        src="/assets/contactUsBanner.jpg"
        alt="聯絡我們"
        title="聯絡我們"
        subtitle="Contact Us"
      />

      {OFFICES.map((office) => (
        <OfficeBlock key={office.id} office={office} />
      ))}

      <section className={styles.socialSection}>
        <Typography level="h3" className={styles.socialTitle}>
          追蹤我們
        </Typography>
        <FacebookLink />
      </section>

      <section className={styles.formSection}>
        <ContactUs />
      </section>
    </>
  );
}
