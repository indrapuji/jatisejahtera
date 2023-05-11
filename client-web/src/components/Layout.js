import React from 'react';
import Head from 'next/head';

const Layout = (props) => {
  return (
    <div>
      <Head>
        <title>{props.pageTitle}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='icon' type='image/png' sizes='32x32' href='favicon.ico' />

        <meta name='robots' content='index, follow' />
        <meta name='googlebot' content='index, follow' />
        <meta
          name='description'
          content='Yayasan Kesejahteraan Pegawai Perum Perhutani (YKP3) JATISEJAHTERA'
          key='desc'
        />
        <meta
          property='og:image'
          content={
            'https://pasangbajaringan.id/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo_tku.a7c88194.png&w=1080&q=75'
          }
        />
        <meta property='og:url' content='https://www.jatisejahtera.or.id/' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={props.pageTitle} />
        <meta property='og:description' content='Yayasan Kesejahteraan Pegawai Perum Perhutani (YKP3) JATISEJAHTERA' />
        <meta property='og:locale' content='id_ID' />
        <meta property='og:site_name' content={props.pageTitle} />
      </Head>

      <div>{props.children}</div>
    </div>
  );
};
export default Layout;
