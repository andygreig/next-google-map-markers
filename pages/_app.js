import App from "next/app";
import { ThemeProvider } from "styled-components";

import GlobalCSS from "../components/global-css";
import theme from "../constants/theme";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <GlobalCSS />
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}
