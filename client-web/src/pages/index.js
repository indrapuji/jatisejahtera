import React, {useEffect, useState} from 'react';
import Layout from '@components/Layout';
import Navigation from '@components/Navigation';
import TopHeader from '@components/TopHeader';
import Carousel from '@components/Carousel';
import Program from '@components/Program';
import News from '@components/News';
import Testimonial from '@components/Testimonial';
import Contact from '@components/Contact';
import Footer from '@components/Footer';
import Claim from '@components/Claim';
import axios from 'axios';
import Modal from '@components/Modal';
import Realisasi from '@components/Realisasi';
import Galery from '@components/Galery';

export default function Home() {
  const isBrowser = () => typeof window !== 'undefined';

  const [modalShow, setModalShow] = useState(false);
  const [bannerShow, setBannerShow] = useState();
  const [galeriData, setGaleriData] = useState();
  const [newsData, setNewsData] = useState();

  useEffect(() => {
    if (!isBrowser()) return;
    window.scrollTo({top: 0, behavior: 'smooth'});
    getData();
  }, []);

  const getData = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `${process.env.API_URL}/content?category=banner&status=true`,
      });
      if (data.length > 0) {
        setBannerShow(data[0].image_url);
        setModalShow(true);
      }
      const dataGaleri = await axios({
        method: 'GET',
        url: `${process.env.API_URL}/content?category=galeri&status=true`,
      });
      setGaleriData(dataGaleri.data);
      const dataNews = await axios({
        method: 'GET',
        url: `${process.env.API_URL}/content?category=berita&status=true`,
      });
      setNewsData(dataNews.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout pageTitle={'HOME || JATISEJAHTERA'}>
      <TopHeader />
      <Navigation />
      <Modal onShow={modalShow} onHide={() => setModalShow(false)} picture={bannerShow} />
      <Carousel />
      <Program />
      <News data={newsData && newsData.slice(0, 3)} />
      <Testimonial />
      <Contact />
      <Claim />
      <Realisasi hideHeader={false} />
      <Galery data={galeriData && galeriData.slice(0, 4)} showMore />
      <Footer />
    </Layout>
  );
}
