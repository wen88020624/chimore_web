import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import { featuredProjects } from "@utils/site-data";
import Image from "next/image";
import Link from "next/link";
import styles from "./FeaturedProjects.module.scss";

export default function FeaturedProjects({
  showTitle = false,
  showMoreLink = false,
  className = "",
}) {
  return (
    <section className={`${styles.featuredSection} ${className}`.trim()}>
      {showTitle && (
        <Typography level="h2" className={styles.sectionTitle}>
          案例實績
        </Typography>
      )}
      <div className={styles.featuredGrid}>
        {featuredProjects.map((project) => (
          <article key={project.id} className={styles.featuredCard}>
            <div className={styles.featuredImageWrap}>
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={420}
                className={styles.featuredImage}
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
