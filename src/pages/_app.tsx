import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../styles/global';
import theme from '../styles/theme';
import { UserContextProvider } from './contexts/UserContext';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <UserContextProvider>
      <ThemeProvider theme={theme}>
        {/* <h1> ajdskçfjsdakçfj</h1> */}
        <Component {...pageProps} />
        <GlobalStyle />
      </ThemeProvider>
    </UserContextProvider>
  );
};

export default MyApp;
