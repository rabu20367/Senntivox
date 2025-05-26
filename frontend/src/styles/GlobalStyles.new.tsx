import { Global, css } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import React from 'react';

const GlobalStyles: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          height: 100%;
          width: 100%;
        }

        body {
          font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background-color: ${theme.palette.background.default};
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        img {
          max-width: 100%;
          height: auto;
          display: block;
        }
      `}
    />
  );
};

export default GlobalStyles;
