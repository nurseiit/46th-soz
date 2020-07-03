import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';

import Layout from '../components/layout';

class MyApp extends App {
  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider>
        <Head>
          <title>46th søz &mdash; Abai&apos;s qara søz by AI.</title>
        </Head>
        <CSSReset />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    );
  }
}

export default MyApp;
