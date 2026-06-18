"use client";

import { FeaturedProjects, PageBanner } from "@components";
import useProjectData from "@hooks/use-project-data";
import Typography from "@mui/joy/Typography";
import styles from "./page.module.scss";

export default function ProjectsContent() {
  const { projectCategories } = useProjectData();

  return (
    <>
      <PageBanner
        src="/assets/projectsBanner.jpg"
        alt="案例實績"
        title="案例實績"
      />

      <FeaturedProjects />

      <section className={styles.listSection}>
        <div className={styles.categoryGrid}>
          {projectCategories.map((category) => (
            <article key={category.title} className={styles.categoryColumn}>
              <Typography level="title-md" className={styles.categoryTitle}>
                {category.title}
              </Typography>
              <ol className={styles.projectList}>
                {category.projects.map((project) => (
                  <li key={project}>{project}</li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
