"use client";

import FormField from "@components/new-forms/form-field";
import SelectField from "@components/new-forms/select-field";
import ImageUploadField from "@components/project-admin/ImageUploadField";
import { useDispatch } from "@hooks/use-redux";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";
import { createProject, updateProject } from "@redux/actions/project";
import { projectRules } from "@utils/project-rules";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./ProjectEditModal.module.scss";

const emptyValues = {
  id: "",
  title: "",
  description: "",
  categoryId: "",
  image: { imageUrl: "", imageFile: null },
  client: "",
  siteLocation: "",
  siteArea: "",
  features: "",
  status: "",
  isFeatured: false,
};

function projectToFormValues(project) {
  if (!project) {
    return emptyValues;
  }

  return {
    id: project.id,
    title: project.title,
    description: project.description || "",
    categoryId: project.categoryId,
    image: { imageUrl: project.image || "", imageFile: null },
    client: project.client || "",
    siteLocation: project.siteLocation || "",
    siteArea: project.siteArea || "",
    features: project.features || "",
    status: project.status || "",
    isFeatured: Boolean(project.isFeatured),
  };
}

export default function ProjectEditModal({
  open,
  project,
  categories,
  saving,
  onClose,
}) {
  const dispatch = useDispatch();
  const isEdit = Boolean(project?.id);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (open) {
      reset(projectToFormValues(project));
    }
  }, [open, project, reset]);

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.title,
  }));

  const onSubmit = (values) => {
    const { image, ...rest } = values;
    const payload = {
      ...rest,
      imageUrl: image.imageUrl,
      imageFile: image.imageFile,
    };

    if (isEdit) {
      dispatch(updateProject(payload));
    } else {
      dispatch(createProject(payload));
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog className={styles.dialog} size="lg">
        <ModalClose />
        <Typography level="h4">{isEdit ? "編輯專案" : "新增專案"}</Typography>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <FormField
            name="title"
            control={control}
            label="標題"
            placeholder="專案標題"
            rules={projectRules.title}
          />

          <SelectField
            name="categoryId"
            control={control}
            label="分類"
            placeholder="選擇分類"
            options={categoryOptions}
            rules={projectRules.categoryId}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <FormControl>
                <FormLabel>描述</FormLabel>
                <Textarea
                  {...field}
                  minRows={3}
                  placeholder="專案描述"
                  value={field.value ?? ""}
                />
              </FormControl>
            )}
          />

          <ImageUploadField name="image" control={control} />

          <div className={styles.grid}>
            <FormField
              name="client"
              control={control}
              label="委託單位"
              placeholder="例：苗栗縣政府"
            />
            <FormField
              name="siteLocation"
              control={control}
              label="基地位置"
              placeholder="例：全苗栗縣"
            />
            <FormField
              name="siteArea"
              control={control}
              label="基地面積"
              placeholder="例：182,031.49公頃"
            />
            <FormField
              name="features"
              control={control}
              label="專案特色"
              placeholder="例：建置中"
            />
            <FormField
              name="status"
              control={control}
              label="狀態"
              placeholder="例：建置中"
            />
          </div>

          <Controller
            name="isFeatured"
            control={control}
            render={({ field }) => (
              <FormControl>
                <Checkbox
                  label="設為精選案例（顯示於首頁）"
                  checked={Boolean(field.value)}
                  onChange={(event) => field.onChange(event.target.checked)}
                />
              </FormControl>
            )}
          />

          <Stack direction="row" spacing={1} className={styles.actions}>
            <Button type="submit" loading={saving}>
              儲存
            </Button>
            <Button variant="outlined" color="neutral" onClick={onClose}>
              取消
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}
