"use client";

import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import FormLabel from "@mui/joy/FormLabel";
import Typography from "@mui/joy/Typography";
import Image from "next/image";
import { Controller } from "react-hook-form";
import styles from "./ImageUploadField.module.scss";

export default function ImageUploadField({
  name,
  control,
  label = "封面圖片",
  rules,
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const value = field.value ?? { imageUrl: "", imageFile: null };
        const preview = value.imageFile
          ? URL.createObjectURL(value.imageFile)
          : value.imageUrl;

        const handleChange = (event) => {
          const file = event.target.files?.[0];
          if (!file) {
            return;
          }
          field.onChange({
            imageUrl: value.imageUrl,
            imageFile: file,
          });
        };

        return (
          <FormControl error={!!fieldState.error}>
            {label && <FormLabel>{label}</FormLabel>}
            <input
              type="file"
              accept="image/*"
              className={styles.fileInput}
              onChange={handleChange}
            />
            {preview && (
              <div className={styles.previewWrap}>
                <Image
                  src={preview}
                  alt="封面預覽"
                  width={240}
                  height={160}
                  className={styles.previewImage}
                  unoptimized={
                    preview.startsWith("blob:") || preview.startsWith("data:")
                  }
                />
              </div>
            )}
            {!preview && (
              <Typography level="body-sm" className={styles.hint}>
                尚未選擇圖片
              </Typography>
            )}
            {fieldState.error && (
              <FormHelperText>{fieldState.error.message}</FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
}
