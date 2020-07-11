// @ts-nocheck

import * as colors from '@material-ui/core/colors';
import { Palette } from '@material-ui/core/styles/createPalette';

export const lightPalette: Palette = {
  type: "light",
  primary: {
    light: '#576ab3',
    main: '#576ab3',
    dark: '#576ab3',
    contrastText: '#fff',
  },
  secondary: {
    light: '#ffEcb5',
    main: '#ffEcb5',
    dark: '#ffEcb5',
    contrastText: '#ffEcb5',
  },
  info: {
    light: colors.blue[50],
    main: colors.blue[500],
    dark: colors.blue[700],
    contrastText: '#fff',
  },
  warning: {
    light: colors.orange[300],
    main: colors.orange[500],
    dark: colors.orange[700],
    contrastText: '#fff',
  },
  error: {
    light: colors.red[300],
    main: colors.red[500],
    dark: colors.red[700],
    contrastText: '#fff',
  },
  success: {
    light: colors.green[300],
    main: colors.green[500],
    dark: colors.green[700],
    contrastText: '#fff',
  },
  background: {
    default: '#fff',
    paper: '#eee',
  },
  text: {
    primary: colors.common.black,
    secondary: colors.common.black,
    disabled: colors.common.black,
    hint: colors.blue[500],
  },
  action: {
    activatedOpacity: 0.8,
    disabledOpacity: 0.8,
    focusOpacity: 0.8,
    hoverOpacity: 0.9,
    selectedOpacity: 0.8,
  },
  common: {
    black: colors.common.black,
    white: colors.common.white,
  },
  divider: colors.common.black
};
