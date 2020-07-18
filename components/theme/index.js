import React from "react";
import { ThemeProvider } from "styled-components";
import styledTheme from "../../constants/theme";

const Theme = ({ children }) => (
  <ThemeProvider theme={styledTheme}>{children}</ThemeProvider>
);

export default Theme;
