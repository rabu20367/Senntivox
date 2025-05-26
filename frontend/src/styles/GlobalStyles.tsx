import { Global, css, type CSSObject } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import React from 'react';

const GlobalStyles: React.FC = () => {
  const theme = useTheme();
  
  const styles: CSSObject = {
    '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
    'html, body, #root': {
      height: '100%',
      width: '100%',
    },
    body: {
      fontFamily: '\'Roboto\', \'Helvetica\', \'Arial\', sans-serif',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      backgroundColor: theme.palette.background.default,
    },
    a: {
      textDecoration: 'none',
      color: 'inherit',
    },
    img: {
      maxWidth: '100%',
      height: 'auto',
      display: 'block',
    },
  };

  return <Global styles={styles} />;
};

export default GlobalStyles;
