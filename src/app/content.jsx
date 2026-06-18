"use client";

import { FeaturedProjects } from "@components";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import { homeHero, homeIntro, quickNavLinks } from "@utils/site-data";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss";

export default function HomeContent() {
  return (
    <>
      <section className={styles.heroSection}>
        <Image
          src="/assets/homeBanner.jpg"
          alt="奇模專業都更展望未來"
          fill
          priority
          className={styles.heroImage}
          sizes="100vw"
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className={styles.heroPanel}>
            <Typography level="h1" className={styles.heroHeadline}>
              {homeHero.headline}
            </Typography>
            <Typography className={styles.heroSubline}>
              {homeHero.subline}
            </Typography>
            <Button
              component={Link}
              href={homeHero.ctaHref}
              className={styles.heroCta}
            >
              {homeHero.ctaLabel}
            </Button>
          </div>
        </div>
      </section>

      <section className={styles.introSection}>
        <div className={styles.introInner}>
          <div className={styles.introImageWrap}>
            <Image
              src="/assets/introBgImg.jpg"
              alt="奇模簡介"
              width={560}
              height={380}
              className={styles.introImage}
            />
          </div>
          <div className={styles.introTextBlock}>
            <Typography level="h2" className={styles.introTitle}>
              {homeIntro.title}
            </Typography>
            <Typography className={styles.introText}>
              {homeIntro.description}
            </Typography>
          </div>
        </div>
      </section>

      <section className={styles.quickNav}>
        <div className={styles.quickNavGrid}>
          {quickNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.quickNavCard}
            >
              <div className={styles.quickNavIcon}>
                <Image
                  src={link.icon}
                  alt={link.label}
                  width={64}
                  height={64}
                />
              </div>
              <Typography level="title-md" className={styles.quickNavLabel}>
                {link.label}
              </Typography>
            </Link>
          ))}
        </div>
      </section>

      <FeaturedProjects
        showTitle
        showMoreLink
        className={styles.homeProjects}
      />
    </>
  );
}
