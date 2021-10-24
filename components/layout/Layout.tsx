import { Grid, ThemeProvider, createTheme, Container } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
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
      <Header />
      <Container>
        <Grid container component="section" className="content">
          {children}
        </Grid>
      </Container>
      <Footer />
    </ThemeProvider>
  );
};
