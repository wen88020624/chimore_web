"use client";

import FormField from "@components/new-forms/form-field";
import { useDispatch, useSelector } from "@hooks/use-redux";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";
import { submitContact } from "@redux/actions/contact";
import { contactRules } from "@utils/contact-rules";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import styles from "./ContactUs.module.scss";

export default function ContactUs() {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contact);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    if (success) {
      reset();
    }
  }, [success, reset]);

  const onSubmit = (values) => {
    dispatch(submitContact(values));
  };

  return (
    <div className={styles.contactSection}>
      <Typography level="h2">線上留言</Typography>
      <form className={styles.contactForm} onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="name"
          control={control}
          label="姓名"
          placeholder="姓名"
          rules={contactRules.name}
        />

        <FormField
          name="email"
          control={control}
          label="電子郵件"
          type="email"
          placeholder="電子郵件"
          rules={contactRules.email}
        />

        <Controller
          name="message"
          control={control}
          rules={contactRules.message}
          render={({ field, fieldState }) => (
            <FormControl error={!!fieldState.error}>
              <Typography level="body-sm" sx={{ mb: 0.5 }}>
                訊息內容
              </Typography>
              <Textarea
                {...field}
                minRows={4}
                placeholder="訊息內容"
                value={field.value ?? ""}
              />
              {fieldState.error && (
                <FormHelperText>{fieldState.error.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Button type="submit" loading={loading} className={styles.submitBtn}>
          送出
        </Button>

        {success && (
          <p className={styles.successMessage}>感謝您的訊息，我們已收到。</p>
        )}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>
    </div>
  );
}
