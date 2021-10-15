import { Components, Palette, PaletteOptions, TransitionsOptions } from "@mui/material/styles";
import { MixinsOptions } from "@mui/material/styles/createMixins";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import { Shadows } from "@mui/material/styles/shadows";
import { ZIndexOptions } from "@mui/material/styles/zIndex";
import { ThemeOptions as SystemThemeOptions } from "@mui/system";
import { ThemeNames } from "../../interfaces/ThemeNames";
import { darkPalette } from "./dark";
import { lightPalette } from "./light";

interface ThemeOptions extends SystemThemeOptions {
  mixins?: MixinsOptions;
  components?: Components;
  palette?: PaletteOptions;
  shadows?: Shadows;
  transitions?: TransitionsOptions;
  typography?: TypographyOptions | ((palette: Palette) => TypographyOptions);
  zIndex?: ZIndexOptions;
  unstable_strictMode?: boolean;
}

const getDesignTokens = (mode: ThemeNames): ThemeOptions => {
  if (mode === "light") {
    return lightPalette;
  } else if (mode === "dark") {
    return darkPalette;
  } else {
    return lightPalette;
  }
};

export default getDesignTokens;
