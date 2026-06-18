"use client";

import CategoryPanel from "@components/project-admin/CategoryPanel";
import ProjectEditModal from "@components/project-admin/ProjectEditModal";
import ProjectTable from "@components/project-admin/ProjectTable";
import { useDispatch, useSelector } from "@hooks/use-redux";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { fetchProjectData, resetProjectData } from "@redux/actions/project";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";

export default function AdminProjectsContent() {
  const dispatch = useDispatch();
  const { categories, projects, loading, saving, error } = useSelector(
    (state) => state.project,
  );
  const [editingProject, setEditingProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProjectData());
  }, [dispatch]);

  const handleAdd = () => {
    setEditingProject(null);
    setModalOpen(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingProject(null);
  };

  const handleReset = () => {
    if (window.confirm("確定要重置為預設假資料？所有變更將遺失。")) {
      dispatch(resetProjectData());
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Typography level="h2">案例實績管理</Typography>
        <Typography level="body-md" className={styles.subtitle}>
          管理分類與專案內容，資料暫存於 localStorage，後續可串接 API。
        </Typography>
      </header>

      {error && (
        <Typography level="body-sm" color="danger" className={styles.error}>
          {error}
        </Typography>
      )}

      <CategoryPanel
        categories={categories}
        projects={projects}
        saving={saving}
      />

      <section className={styles.toolbar}>
        <Stack direction="row" spacing={1} className={styles.toolbarActions}>
          <Button onClick={handleAdd}>新增專案</Button>
          <Button variant="outlined" color="neutral" onClick={handleReset}>
            重置假資料
          </Button>
        </Stack>
      </section>

      {loading ? (
        <Typography level="body-md">載入中...</Typography>
      ) : (
        <ProjectTable
          projects={projects}
          categories={categories}
          onEdit={handleEdit}
          saving={saving}
        />
      )}

      <ProjectEditModal
        open={modalOpen}
        project={editingProject}
        categories={categories}
        saving={saving}
        onClose={handleCloseModal}
      />
    </div>
  );
}
