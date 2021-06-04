import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { CookiesProvider } from 'react-cookie';

import GlobalStyle from '../styles/global';
import theme from '../styles/theme';
import UserContextProvider from './contexts/UserContext';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <CookiesProvider>
      <UserContextProvider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
          <GlobalStyle />
        </ThemeProvider>
      </UserContextProvider>
    </CookiesProvider>
  );
};

export default MyApp;
