import { createTheme } from '@mui/material/styles';
import { getContrastYIQ } from './lib/colors';

import { baseTheme } from './baseTheme';

const pdfTheme = createTheme(baseTheme, {
  typography: {
    // fontSize: 14,
    h1: {
      color: getContrastYIQ(baseTheme.palette.background.primary, baseTheme),
      background: baseTheme.palette.background.primary,
    },
  },
});

// eslint-disable-next-line import/prefer-default-export
export { pdfTheme };
