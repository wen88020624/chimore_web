"use client";

import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import { Controller } from "react-hook-form";

export default function FormField({
  name,
  control,
  label,
  rules,
  placeholder,
  type = "text",
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormControl error={!!fieldState.error}>
          {label && <FormLabel>{label}</FormLabel>}
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            value={field.value ?? ""}
          />
          {fieldState.error && (
            <FormHelperText>{fieldState.error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
