import { ThemeOptions } from "@mui/material";

export const darkPalette: ThemeOptions = {
  palette: {
    mode: "dark",
    common: {
      black: "#000",
      white: "#FFF",
    },
    primary: {
      main: "#399AD5",
      light: "#7EB9DD",
      dark: "#2C76A3",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#BD868D",
      light: "#C85262",
      dark: "#3D191E",
      contrastText: "#FFF",
    },
    error: {
      main: "#C00",
      light: "#D54040",
      dark: "#4D1717",
      contrastText: "#FFF",
    },
    warning: {
      main: "#EA8124",
      light: "#EEA86B",
      dark: "#6B3B10",
      contrastText: "#FFF",
    },
    success: {
      main: "#82BD3F",
      light: "#A5C87E",
      dark: "#2A3D14",
      contrastText: "#FFF",
    },
    info: {
      main: "#25638A",
      light: "#5A839D",
      dark: "#173E57",
      contrastText: "#FFF",
    },
    text: {
      primary: "#DEDEDE",
      secondary: "rgba(#DEDEDE, 0.7)",
      disabled: "rgba(#DEDEDE, 0.38)",
    },
    divider: "rgba(255, 255, 255, 0.12)",
    background: {
      paper: "#202020",
      default: "#202020",
    },
  },
};
