"use client";

import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import store from "@redux/store";
import { Provider } from "react-redux";

// Joy 元件（Button、Chip…）的 primary 色系對齊 styles/variables.module.scss
const theme = extendTheme({
  fontFamily: {
    body: "var(--font-sans), 'PingFang TC', 'Microsoft JhengHei', sans-serif",
    display:
      "var(--font-sans), 'PingFang TC', 'Microsoft JhengHei', sans-serif",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: "#f2f8f5",
          100: "#e6f1ec",
          200: "#c6e0d5",
          300: "#98c8b6",
          400: "#5ea893",
          500: "#2e7d6b",
          600: "#23604f",
          700: "#1d4f42",
          800: "#173f35",
          900: "#112f28",
        },
      },
    },
  },
});

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <CssVarsProvider theme={theme} defaultMode="light">
        {children}
      </CssVarsProvider>
    </Provider>
  );
}
