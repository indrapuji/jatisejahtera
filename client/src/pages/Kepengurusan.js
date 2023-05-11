import React, {useEffect, useState} from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import {Container, Image} from 'react-bootstrap';
import {motion} from 'framer-motion';
import Aos from 'aos';
import 'aos/dist/aos.css';
// import Pengurus from '../assets/pengurus/strukturJS_2.png';
import axios from 'axios';
import host from '../hooks/host';

export default () => {
  const [dataPengurus, setDataPengurus] = useState([]);
  useEffect(() => {
    Aos.init({duration: 2500});
    getPengurus();
  }, []);
  const pageTransition = {
    init: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  };

  const getPengurus = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: host + '/content?category=struktur&status=true',
      });
      setDataPengurus(data[0].image_url);
      console.log(data[0].image_url);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div initial='init' animate='in' exit='out' variants={pageTransition}>
      <Navigation />

      <div style={{position: 'relative'}}>
        <div data-aos='zoom-in' style={{position: 'absolute', left: '-30', zIndex: -1, top: 50}}>
          <Image src={require('../assets/landingpage/leaf_bottom.png')} style={{width: 150}} />
        </div>
        <div data-aos='fade-up' style={{position: 'absolute', left: 1200, zIndex: -1, top: 200}}>
          <Image src={require('../assets/landingpage/leaf_top_large.png')} style={{width: 200}} />
        </div>
        <div style={{marginTop: 50}}>
          <p
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 30,
              marginTop: -20,
            }}
          >
            Susunan Pembina, Pengawas, dan Pengurus YKP3 Jatisejahtera
          </p>
        </div>
        <Container>
          <div>
            {/* <Image src={require('../assets/landingpage/struktur_2.png')} /> */}
            <Image src={dataPengurus} />
          </div>
        </Container>
      </div>

      <Footer />
    </motion.div>
  );
};
