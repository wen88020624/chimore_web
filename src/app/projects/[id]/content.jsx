"use client";

import { PageBanner } from "@components";
import { useDispatch, useSelector } from "@hooks/use-redux";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import {
  clearSelectedProject,
  fetchProjectById,
  fetchProjectData,
} from "@redux/actions/project";
import { getCategoryTitle } from "@utils/project-view-utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import styles from "./page.module.scss";

const DETAIL_FIELDS = [
  { key: "client", label: "委託單位" },
  { key: "siteLocation", label: "基地位置" },
  { key: "siteArea", label: "基地面積" },
  { key: "features", label: "專案特色" },
  { key: "status", label: "狀態" },
];

export default function ProjectDetailContent({ projectId }) {
  const dispatch = useDispatch();
  const {
    categories,
    selectedProject,
    selectedProjectLoading,
    selectedProjectError,
  } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(fetchProjectData());
    dispatch(fetchProjectById(projectId));
    return () => {
      dispatch(clearSelectedProject());
    };
  }, [dispatch, projectId]);

  if (selectedProjectLoading) {
    return (
      <div className={styles.page}>
        <Typography level="body-lg">載入專案資料中...</Typography>
      </div>
    );
  }

  if (selectedProjectError || !selectedProject) {
    return (
      <div className={styles.page}>
        <Typography level="h3">找不到專案</Typography>
        <Typography level="body-md" className={styles.errorText}>
          {selectedProjectError || "此案例可能已下架或不存在。"}
        </Typography>
        <Button component={Link} href="/projects" className={styles.backButton}>
          返回案例實績
        </Button>
      </div>
    );
  }

  const categoryTitle = getCategoryTitle(
    categories,
    selectedProject.categoryId,
  );

  return (
    <>
      <PageBanner
        src="/assets/projectsBanner.jpg"
        alt={selectedProject.title}
        title={selectedProject.title}
      />

      <article className={styles.page}>
        <div className={styles.metaRow}>
          {categoryTitle && (
            <Chip variant="soft" color="primary">
              {categoryTitle}
            </Chip>
          )}
          {selectedProject.isFeatured && (
            <Chip variant="soft" color="success">
              精選案例
            </Chip>
          )}
        </div>

        {selectedProject.image && (
          <div className={styles.imageWrap}>
            <Image
              src={selectedProject.image}
              alt={selectedProject.title}
              width={960}
              height={540}
              className={styles.coverImage}
              unoptimized={
                selectedProject.image.startsWith("data:") ||
                selectedProject.image.startsWith("blob:")
              }
            />
          </div>
        )}

        {selectedProject.description && (
          <section className={styles.section}>
            <Typography level="title-lg" className={styles.sectionTitle}>
              專案說明
            </Typography>
            <Typography level="body-md" className={styles.description}>
              {selectedProject.description}
            </Typography>
          </section>
        )}

        <section className={styles.section}>
          <Typography level="title-lg" className={styles.sectionTitle}>
            專案資訊
          </Typography>
          <dl className={styles.detailList}>
            {DETAIL_FIELDS.map((field) => (
              <div key={field.key} className={styles.detailItem}>
                <dt>{field.label}</dt>
                <dd>{selectedProject[field.key] || "—"}</dd>
              </div>
            ))}
          </dl>
        </section>

        <Button component={Link} href="/projects" variant="outlined">
          返回案例實績列表
        </Button>
      </article>
    </>
  );
}
