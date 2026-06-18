"use client";

import CategoryPanel from "@components/project-admin/CategoryPanel";
import ProjectEditModal from "@components/project-admin/ProjectEditModal";
import ProjectTable from "@components/project-admin/ProjectTable";
import { useDispatch, useSelector } from "@hooks/use-redux";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { fetchProjectData, resetProjectData } from "@redux/actions/project";
import { isUseProjectMock } from "@utils/project-config";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";

export default function AdminProjectsContent() {
  const dispatch = useDispatch();
  const { categories, projects, loading, saving, error } = useSelector(
    (state) => state.project,
  );
  const [editingProject, setEditingProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const useMock = isUseProjectMock();

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

  const handleReload = () => {
    dispatch(fetchProjectData());
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Typography level="h2">案例實績管理</Typography>
        <Typography level="body-md" className={styles.subtitle}>
          {useMock
            ? "目前為 mock 模式，資料由本地 mock service 提供，後端就緒後可切換 API。"
            : "資料由後端 API 提供，所有使用者將看到相同內容。"}
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
          {useMock ? (
            <Button variant="outlined" color="neutral" onClick={handleReset}>
              重置假資料
            </Button>
          ) : (
            <Button variant="outlined" color="neutral" onClick={handleReload}>
              重新載入
            </Button>
          )}
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
