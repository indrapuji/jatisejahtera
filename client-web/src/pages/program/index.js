import React from 'react';
import Layout from '@components/Layout';
import Navigation from '@components/Navigation';
import Program from '@components/Program';
import Footer from '@components/Footer';

function index() {
  return (
    <Layout pageTitle={'PROGRAM || JATISEJAHTERA'}>
      <Navigation />
      <Program bkgClr={'white'} />
      <Footer />
    </Layout>
  );
}

export default index;
