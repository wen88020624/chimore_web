"use client";

import { CircularImage, PageBanner, SectionTitle } from "@components";
import Typography from "@mui/joy/Typography";
import { PLACEHOLDER_IMAGE } from "@utils/site-constants";
import { serviceIcons, serviceSections } from "@utils/site-data";
import Image from "next/image";
import styles from "./page.module.scss";

export default function ServiceContent() {
  return (
    <>
      <PageBanner
        src="/assets/serviceBanner.jpg"
        alt="服務項目"
        title="服務項目"
      />

      <section className={styles.iconSection}>
        <div className={styles.iconGrid}>
          {serviceIcons.map((item) => (
            <article key={item.label} className={styles.iconCard}>
              <div className={styles.iconCircle}>
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={64}
                  height={64}
                />
              </div>
              <Typography level="body-md">{item.label}</Typography>
            </article>
          ))}
        </div>
      </section>

      {serviceSections.map((section) => (
        <section
          key={section.title}
          className={`${styles.alternateSection} ${
            section.imagePosition === "left"
              ? styles.imageLeft
              : styles.imageRight
          }`}
        >
          {section.imagePosition === "left" && (
            <CircularImage
              src={PLACEHOLDER_IMAGE}
              alt={section.title}
              size={300}
            />
          )}
          <div className={styles.sectionContent}>
            <Typography level="h3" className={styles.sectionHeading}>
              {section.title}
            </Typography>
            <ul className={styles.serviceList}>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          {section.imagePosition === "right" && (
            <CircularImage
              src={PLACEHOLDER_IMAGE}
              alt={section.title}
              size={300}
            />
          )}
        </section>
      ))}

      <section className={styles.closingSection}>
        <SectionTitle>服務承諾</SectionTitle>
        <p className={styles.closingText}>
          奇模提供從前期評估、計畫編撰到審議協助的完整顧問服務，
          以務實的專業能力協助客戶穩健推進每一項都市計畫與都更專案。
        </p>
      </section>
    </>
  );
}
