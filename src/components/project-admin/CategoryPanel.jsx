"use client";

import FormField from "@components/new-forms/form-field";
import { useDispatch } from "@hooks/use-redux";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@redux/actions/project";
import { categoryRules } from "@utils/project-rules";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./CategoryPanel.module.scss";

export default function CategoryPanel({ categories, projects, saving }) {
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: { title: "" },
  });

  const getProjectCount = (categoryId) =>
    projects.filter((project) => project.categoryId === categoryId).length;

  const onSubmit = (values) => {
    if (editingId) {
      dispatch(updateCategory({ id: editingId, title: values.title }));
      setEditingId(null);
    } else {
      dispatch(createCategory({ title: values.title }));
    }
    reset({ title: "" });
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setValue("title", category.title);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    reset({ title: "" });
  };

  const handleDelete = (categoryId) => {
    const count = getProjectCount(categoryId);
    if (count > 0) {
      window.alert("此分類下仍有專案，請先移動或刪除專案");
      return;
    }
    if (window.confirm("確定要刪除此分類？")) {
      dispatch(deleteCategory(categoryId));
    }
  };

  return (
    <section className={styles.panel}>
      <Typography level="h3" className={styles.title}>
        分類管理
      </Typography>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="title"
          control={control}
          label={editingId ? "編輯分類" : "新增分類"}
          placeholder="分類名稱"
          rules={categoryRules.title}
        />
        <Stack direction="row" spacing={1}>
          <Button type="submit" loading={saving}>
            {editingId ? "儲存分類" : "新增分類"}
          </Button>
          {editingId && (
            <Button
              variant="outlined"
              color="neutral"
              onClick={handleCancelEdit}
            >
              取消
            </Button>
          )}
        </Stack>
      </form>

      <div className={styles.categoryList}>
        {categories.map((category) => (
          <div key={category.id} className={styles.categoryItem}>
            <Chip variant="soft" color="primary">
              {category.title}
            </Chip>
            <Typography level="body-sm" className={styles.count}>
              {getProjectCount(category.id)} 件專案
            </Typography>
            {editingId === category.id ? (
              <Input size="sm" value={category.title} readOnly />
            ) : (
              <Stack direction="row" spacing={0.5}>
                <Button
                  size="sm"
                  variant="outlined"
                  onClick={() => handleEdit(category)}
                >
                  編輯
                </Button>
                <IconButton
                  size="sm"
                  color="danger"
                  variant="outlined"
                  onClick={() => handleDelete(category.id)}
                >
                  刪
                </IconButton>
              </Stack>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
