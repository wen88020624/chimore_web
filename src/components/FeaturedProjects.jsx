"use client";

import useProjectData from "@hooks/use-project-data";
import Typography from "@mui/joy/Typography";
import Image from "next/image";
import Link from "next/link";
import styles from "./FeaturedProjects.module.scss";
import { ArrowRightIcon } from "./icons";

export default function FeaturedProjects({
  title = "精選案例",
  subtitle,
  showMoreLink = false,
  className = "",
}) {
  const { featuredProjects, loading } = useProjectData();

  if (loading && featuredProjects.length === 0) {
    return (
      <section className={`${styles.featuredSection} ${className}`.trim()}>
        <Typography level="body-md" className={styles.loading}>
          載入案例中...
        </Typography>
      </section>
    );
  }

  return (
    <section className={`${styles.featuredSection} ${className}`.trim()}>
      <div className={styles.heading}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
      </div>

      {featuredProjects.map((project, index) => (
        <article
          key={project.id}
          className={index % 2 ? styles.caseRowFlip : styles.caseRow}
        >
          <div className={styles.caseImage}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 820px) 100vw, 50vw"
              unoptimized={
                project.image?.startsWith("data:") ||
                project.image?.startsWith("blob:")
              }
            />
          </div>
          <div className={styles.caseText}>
            {project.status && (
              <span className={styles.status}>{project.status}</span>
            )}
            <h3 className={styles.caseTitle}>{project.title}</h3>
            {project.description && (
              <p className={styles.caseDescription}>{project.description}</p>
            )}
            {(project.client || project.features) && (
              <dl className={styles.caseFacts}>
                {project.client && (
                  <>
                    <dt>業主</dt>
                    <dd>{project.client}</dd>
                  </>
                )}
                {project.features && (
                  <>
                    <dt>計畫類型</dt>
                    <dd>{project.features}</dd>
                  </>
                )}
              </dl>
            )}
            <Link href={`/projects/${project.id}`} className={styles.caseLink}>
              案例詳情 <ArrowRightIcon size={18} />
            </Link>
          </div>
        </article>
      ))}

      {showMoreLink && (
        <div className={styles.moreLinkWrap}>
          <Link href="/projects" className={styles.moreLink}>
            查看全部案例 <ArrowRightIcon size={18} />
          </Link>
        </div>
      )}
    </section>
  );
}
