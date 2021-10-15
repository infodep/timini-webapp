import { ThemeOptions } from "@mui/material";

export const lightPalette: ThemeOptions = {
  palette: {
    mode: "light",
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
      main: "#D69E4F",
      light: "#DDBF94",
      dark: "#574020",
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
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.0.6)",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
    divider: "rgba(0, 0, 0, 0.12)",
    background: {
      paper: "#fff",
      default: "#fff",
    },
  },
};
