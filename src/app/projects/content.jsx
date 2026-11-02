"use client";

import { FeaturedProjects, PageBanner } from "@components";
import useProjectData from "@hooks/use-project-data";
import Typography from "@mui/joy/Typography";
import Link from "next/link";
import styles from "./page.module.scss";

export default function ProjectsContent() {
  const { projectCategories, loading } = useProjectData();

  return (
    <>
      <PageBanner
        src="/assets/projectsBanner.jpg"
        alt="案例實績"
        title="案例實績"
        subtitle="台北市與新北市的都市更新與都市計畫案件。"
      />

      <FeaturedProjects />

      <section className={styles.listSection}>
        {loading && projectCategories.length === 0 ? (
          <Typography level="body-md" className={styles.loading}>
            載入案例中...
          </Typography>
        ) : (
          <div className={styles.categoryGrid}>
            {projectCategories.map((category) => (
              <article key={category.id} className={styles.categoryColumn}>
                <Typography level="title-md" className={styles.categoryTitle}>
                  {category.title}
                </Typography>
                <ol className={styles.projectList}>
                  {category.projects.map((project) => (
                    <li key={project.id}>
                      <Link
                        href={`/projects/${project.id}`}
                        className={styles.projectLink}
                      >
                        {project.title}
                      </Link>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
