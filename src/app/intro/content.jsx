"use client";

import { CircularImage, PageBanner, SectionTitle } from "@components";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
import { PLACEHOLDER_IMAGE } from "@utils/site-constants";
import {
  environmentPhotos,
  groupPhotos,
  introPhilosophy,
  teamLeaders,
  teamMembers,
  teamStats,
} from "@utils/site-data";
import Image from "next/image";
import styles from "./page.module.scss";

export default function IntroContent() {
  return (
    <>
      <PageBanner
        src="/assets/introBanner.jpg"
        alt="認識奇模"
        title="認識奇模"
      />

      <section className={`${styles.section} ${styles.philosophySection}`}>
        <SectionTitle>{introPhilosophy.title}</SectionTitle>
        <p className={styles.centerText}>{introPhilosophy.description}</p>
      </section>

      <section className={styles.section}>
        <SectionTitle>專業團隊</SectionTitle>
        <div className={styles.leadersRow}>
          {teamLeaders.map((person) => (
            <article key={person.name} className={styles.profileCard}>
              <CircularImage src={person.image} alt={person.name} size={220} />
              <Typography level="title-md">{person.name}</Typography>
              <Typography level="body-sm" className={styles.profileTitle}>
                {person.title}
              </Typography>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <SectionTitle>專業人員</SectionTitle>
        <Grid container spacing={4} className={styles.membersGrid}>
          {teamMembers.map((person) => (
            <Grid key={person.name} xs={6} md={3}>
              <article className={styles.profileCard}>
                <CircularImage
                  src={person.image}
                  alt={person.name}
                  size={160}
                />
                <Typography level="title-sm">{person.name}</Typography>
                <Typography level="body-xs" className={styles.profileTitle}>
                  {person.title}
                </Typography>
              </article>
            </Grid>
          ))}
        </Grid>
      </section>

      <section className={styles.section}>
        <Typography className={styles.centerText}>
          我們重視團隊協作與專業成長，透過跨領域合作與實務累積，持續提升服務品質。
        </Typography>
        <div className={styles.photoGrid}>
          {groupPhotos.map((photo) => (
            <div key={photo.id} className={styles.photoItem}>
              <Image
                src={PLACEHOLDER_IMAGE}
                alt={photo.alt}
                width={400}
                height={260}
                className={styles.rectImage}
              />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <SectionTitle>實務數據</SectionTitle>
        <div className={styles.statsGrid}>
          {teamStats.map((stat) => (
            <div key={stat.label} className={styles.statCard}>
              <Typography className={styles.statValue}>
                {stat.value}
                <span>{stat.unit}</span>
              </Typography>
              <Typography level="body-sm">{stat.label}</Typography>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionTitle>奇模環境</SectionTitle>
        <div className={styles.photoGrid}>
          {environmentPhotos.map((photo) => (
            <div key={photo.id} className={styles.photoItem}>
              <Image
                src={PLACEHOLDER_IMAGE}
                alt={photo.alt}
                width={400}
                height={260}
                className={styles.rectImage}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
