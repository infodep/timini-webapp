import {ThemeProvider, createTheme} from "@mui/material";
import React, { ReactNode, useState } from "react";
import useAxios from "../../helpers/hooks/useAxios";
import getDesignTokens from "../../helpers/materialui/theme";
import { ThemeNames } from "../../interfaces/ThemeNames";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props): JSX.Element => {
  const [preferredTheme, setPreferredTheme] = useState<ThemeNames>("light");
  useAxios()
    .get("/v1/user/me")
    .then((res) => res.data)
    .then((data) => setPreferredTheme(data.theme))
    .catch(() => console.warn("Warning: Using fallback theme"));

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(preferredTheme)), [preferredTheme]);

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="container mx-auto px-4 flex-grow">
          {children}
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};
