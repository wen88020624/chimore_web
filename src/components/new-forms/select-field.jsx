"use client";

import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import FormLabel from "@mui/joy/FormLabel";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import { Controller } from "react-hook-form";

export default function SelectField({
  name,
  control,
  label,
  rules,
  options = [],
  placeholder,
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormControl error={!!fieldState.error}>
          {label && <FormLabel>{label}</FormLabel>}
          <Select
            placeholder={placeholder}
            value={field.value ?? null}
            onChange={(_, value) => field.onChange(value)}
          >
            {options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
          {fieldState.error && (
            <FormHelperText>{fieldState.error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
