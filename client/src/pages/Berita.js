import React, {useEffect, useState} from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import {Modal, Container, Image} from 'react-bootstrap';
import {motion} from 'framer-motion';
import axios from 'axios';
import host from '../hooks/host';
import GaleriCount from '../hooks/GaleriCount';

export default () => {
  const [news, setNews] = useState([]);
  const [show, setShow] = useState(false);
  const [prev, setPrev] = useState('');
  const handleClose = () => setShow(false);
  useEffect(() => {
    getNews();
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

  const getNews = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: host + '/content?category=berita',
      });
      setNews(GaleriCount(data));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  function handleShow(imageshow) {
    setShow(true);
    setPrev(imageshow);
  }
  return (
    <motion.div initial='init' animate='in' exit='out' variants={pageTransition}>
      <Navigation />
      <Container>
        <p style={{fontWeight: 'bold', textAlign: 'center', fontSize: 50}}>Berita</p>
        <Container>
          {/* {news &&
            news.map((item, index) => {
              return (
                <Row ley={index} style={{ marginBottom: 10 }}>
                  <Col md="4">
                    <Image src={item.image_url} rounded style={{ height: 200, width: 300 }} />
                  </Col>
                  <Col>
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <p style={{ fontWeight: "bold" }}>{item.title}</p>
                      <p>{item.text}</p>
                    </motion.div>
                  </Col>
                </Row>
              );
            })} */}
          {news &&
            news.map((item, index) => {
              return (
                <div style={{padding: 10}}>
                  <div className='container mt-40'>
                    <div className='row mt-30'>
                      {item.map((data, idx) => {
                        return (
                          <div className='col-md-3 col-sm-6' onClick={() => handleShow(data.image_url)}>
                            <div className='box15'>
                              <img src={data.image_url} style={{height: '10rem'}} alt='' />
                              <div className='box-content'>
                                <h3 className='titleHome' style={{textAlign: 'center'}}>
                                  {data.title}
                                </h3>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          <Modal size='lg' show={show} onHide={handleClose} keyboard={false}>
            <Modal.Body style={{display: 'flex', justifyContent: 'center'}}>
              <Image src={prev} style={{height: 510}} />
            </Modal.Body>
          </Modal>
        </Container>
      </Container>
      <div style={{position: 'fixed', bottom: 0, width: '100vw'}}>
        <Footer />
      </div>
    </motion.div>
  );
};
