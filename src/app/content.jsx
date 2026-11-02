"use client";

import { ArrowRightIcon, FeaturedProjects, Icon } from "@components";
import { OFFICES } from "@utils/site-constants";
import {
  homeHero,
  homeIntro,
  quickNavLinks,
  serviceIcons,
} from "@utils/site-data";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss";

export default function HomeContent() {
  const office = OFFICES[0];

  return (
    <>
      <section className={styles.heroSection}>
        <Image
          src="/assets/homeBanner.jpg"
          alt=""
          fill
          priority
          className={styles.heroImage}
          sizes="100vw"
        />
        <div className={styles.heroContent}>
          <p className={styles.heroKicker}>{homeHero.subline}</p>
          <h1 className={styles.heroHeadline}>{homeHero.headline}</h1>
          <p className={styles.heroDescription}>{homeHero.description}</p>
          <Link href={homeHero.ctaHref} className={styles.heroCta}>
            {homeHero.ctaLabel} <ArrowRightIcon size={18} />
          </Link>
        </div>
      </section>

      <section className={styles.introSection}>
        <div className={styles.introInner}>
          <div>
            <h2 className={styles.introTitle}>
              {homeIntro.title}
              <small>{homeIntro.subtitle}</small>
            </h2>
            <p className={styles.introText}>{homeIntro.description}</p>
            <dl className={styles.introFacts}>
              {homeIntro.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={styles.introImageWrap}>
            <Image
              src="/assets/workspaceEnv.jpg"
              alt="奇模團隊開會討論"
              fill
              sizes="(max-width: 820px) 100vw, 45vw"
              className={styles.introImage}
            />
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
              <div className={styles.quickNavPhoto}>
                <Image
                  src={link.image}
                  alt={link.imageAlt}
                  fill
                  sizes="(max-width: 820px) 440px, 33vw"
                />
                <Icon
                  name={link.icon}
                  size={36}
                  className={styles.quickNavIcon}
                />
              </div>
              <span className={styles.quickNavLabel}>
                {link.label} <ArrowRightIcon size={18} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.serviceStrip}>
        <div className={styles.sectionHeading}>
          <h2>服務項目</h2>
          <p>從上位計畫到單一基地，提供完整的規劃與審議服務</p>
        </div>
        <ul className={styles.serviceList}>
          {serviceIcons.map((item) => (
            <li key={item.label}>
              <Link href="/service">
                <span className={styles.serviceDisc}>
                  <Icon name={item.icon} size={30} />
                </span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <FeaturedProjects
        title="案例實績"
        subtitle="近期通過審議的都市更新案"
        showMoreLink
      />

      {office && (
        <section className={styles.officeSection}>
          <div className={styles.officeCard}>
            <div className={styles.officeInfo}>
              <h2>{office.name}</h2>
              <dl>
                <dt>地址</dt>
                <dd>{office.address}</dd>
                {office.phone && (
                  <>
                    <dt>電話</dt>
                    <dd>{office.phone}</dd>
                  </>
                )}
                {office.email && (
                  <>
                    <dt>Email</dt>
                    <dd>{office.email}</dd>
                  </>
                )}
              </dl>
              <Link href="/contact" className={styles.officeCta}>
                與我們聯繫 <ArrowRightIcon size={18} />
              </Link>
            </div>
            <div className={styles.officePhoto}>
              <Image
                src="/assets/office.jpg"
                alt={`${office.name}內部`}
                fill
                sizes="(max-width: 820px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
