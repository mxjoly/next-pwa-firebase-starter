import { TypographyOptions } from '@material-ui/core/styles/createTypography';
import { fontFamily, fontWeights } from './default';
import { lightPalette } from '../palettes';

// Default typography configurations
export const lightTypography: TypographyOptions = {
  fontFamily,
  h1: {
    fontSize: 36,
    fontWeight: fontWeights.fontWeightBold,
    color: lightPalette.text.primary,
  },
  h2: {
    fontSize: 30,
    fontWeight: fontWeights.fontWeightBold,
    color: lightPalette.text.primary,
  },
  h3: {
    fontSize: 26,
    fontWeight: fontWeights.fontWeightMedium,
    color: lightPalette.text.primary,
  },
  h4: {
    fontSize: 22,
    fontWeight: fontWeights.fontWeightMedium,
    color: lightPalette.text.primary,
  },
  h5: {
    fontSize: 20,
    fontWeight: fontWeights.fontWeightMedium,
    color: lightPalette.text.primary,
  },
  h6: {
    fontSize: 18,
    fontWeight: fontWeights.fontWeightMedium,
    color: lightPalette.text.primary,
  },
  subtitle1: {
    fontSize: 16,
    lineHeight: 'normal',
    fontWeight: fontWeights.fontWeightRegular,
    color: lightPalette.text.primary,
  },
  subtitle2: {
    fontSize: 15,
    lineHeight: 'normal',
    fontWeight: fontWeights.fontWeightRegular,
    color: lightPalette.text.primary,
  },
  body1: {
    fontSize: 15,
    lineHeight: 'normal',
    fontWeight: fontWeights.fontWeightRegular,
    color: lightPalette.text.primary,
  },
  body2: {
    fontSize: 13,
    lineHeight: 'normal',
    fontWeight: fontWeights.fontWeightRegular,
    color: lightPalette.text.primary,
  },
  button: {
    fontSize: 15,
    lineHeight: 'normal',
    fontWeight: fontWeights.fontWeightMedium,
    textTransform: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    color: lightPalette.text.hint,
  },
  caption: {
    fontSize: 14,
    lineHeight: 'normal',
    fontWeight: fontWeights.fontWeightRegular,
    color: lightPalette.text.primary,
  },
  overline: {
    fontSize: 14,
    lineHeight: 'normal',
    fontWeight: fontWeights.fontWeightRegular,
    textTransform: 'none',
    textDecoration: 'none',
    color: lightPalette.text.primary,
  },
};