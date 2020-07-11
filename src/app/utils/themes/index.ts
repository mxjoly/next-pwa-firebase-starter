import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { lightPalette, darkPalette } from './palettes';
import { lightTypography, darkTypography } from './typographies';

// Default light theme
let lightTheme: Theme = createMuiTheme({
  palette: {
    ...lightPalette
  },
  typography: {
    ...lightTypography
  },
  spacing: 5
});

// Dark theme
let darkTheme: Theme = createMuiTheme({
  palette: {
    ...darkPalette
  },
  typography: {
    ...darkTypography,
  },
  spacing: 5
});

export {
  lightTheme,
  darkTheme
}