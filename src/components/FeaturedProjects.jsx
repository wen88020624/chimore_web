"use client";

import useProjectData from "@hooks/use-project-data";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Image from "next/image";
import Link from "next/link";
import styles from "./FeaturedProjects.module.scss";

export default function FeaturedProjects({
  showTitle = false,
  showMoreLink = false,
  className = "",
}) {
  const { featuredProjects, loading } = useProjectData();

  if (loading && featuredProjects.length === 0) {
    return (
      <section className={`${styles.featuredSection} ${className}`.trim()}>
        <Typography level="body-md">載入案例中...</Typography>
      </section>
    );
  }

  return (
    <section className={`${styles.featuredSection} ${className}`.trim()}>
      {showTitle && (
        <Typography level="h2" className={styles.sectionTitle}>
          案例實績
        </Typography>
      )}
      <div className={styles.featuredGrid}>
        {featuredProjects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className={styles.featuredCardLink}
          >
            <article className={styles.featuredCard}>
              <div className={styles.featuredImageWrap}>
                <Image
                  src={project.image || "/assets/projectInHome1.jpg"}
                  alt={project.title}
                  width={600}
                  height={420}
                  className={styles.featuredImage}
                  unoptimized={
                    project.image?.startsWith("data:") ||
                    project.image?.startsWith("blob:")
                  }
                />
              </div>
              <Typography level="title-lg" className={styles.featuredTitle}>
                {project.title}
              </Typography>
              {project.description && (
                <Typography className={styles.featuredDescription}>
                  {project.description}
                </Typography>
              )}
              {!project.description && project.items?.length > 0 && (
                <ul className={styles.featuredList}>
                  {project.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </article>
          </Link>
        ))}
      </div>
      {showMoreLink && (
        <div className={styles.moreLinkWrap}>
          <Button component={Link} href="/projects" className={styles.moreLink}>
            查看更多案例
          </Button>
        </div>
      )}
    </section>
  );
}
