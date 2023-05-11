import React from 'react';
import Navigation from '@components/Navigation';
import Realisasi from '@components/Realisasi';
import Footer from '@components/Footer';
import Layout from '@components/Layout';

function index() {
  return (
    <Layout pageTitle={'DATA REALISASI || JATISEJAHTERA'}>
      <Navigation />
      <Realisasi />
      <Footer />
    </Layout>
  );
}

export default index;
