import React, {useEffect, useState} from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import {Container, Image} from 'react-bootstrap';
import {motion} from 'framer-motion';
import Aos from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import host from '../hooks/host';

export default () => {
  const [dataKesehatan, setDataKesehatan] = useState([]);
  useEffect(() => {
    Aos.init({duration: 2500});
    getKesehatan();
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

  const getKesehatan = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: host + '/content?category=kesehatan&status=true',
      });
      setDataKesehatan(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div initial='init' animate='in' exit='out' variants={pageTransition}>
      <Navigation />
      <Container>
        <div style={{marginTop: 50}}>
          <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>Realisasi Kesehatan</p>
        </div>
        {dataKesehatan &&
          dataKesehatan.map((item, index) => {
            return (
              <div key={index} data-aos='fade-up'>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 40,
                    marginBottom: 20,
                  }}
                >
                  <Image src={item.image_url} rounded style={{height: 400, width: 700}} />
                </div>
                <p style={{textAlign: 'center', marginTop: -10}}>{item.title}</p>
              </div>
            );
          })}
      </Container>

      <Footer />
    </motion.div>
  );
};
