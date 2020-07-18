import { createGlobalStyle } from "styled-components";

// Global Styles
const GlobalStyles = createGlobalStyle`
  * { box-sizing: border-box }

  body {
    margin: 0;
    font-family: ${(props) => props.theme.font.family};
    line-height: ${(props) => props.theme.font.lineHeight};
  }
`;

export default GlobalStyles;
