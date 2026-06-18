"use client";

import { CssVarsProvider } from "@mui/joy/styles";
import store from "@redux/store";
import { Provider } from "react-redux";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <CssVarsProvider>{children}</CssVarsProvider>
    </Provider>
  );
}
