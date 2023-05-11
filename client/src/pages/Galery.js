import React, {useState, useEffect} from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import {Container} from 'react-bootstrap';
import {motion} from 'framer-motion';
import {Modal, Image} from 'react-bootstrap';
import GaleriCount from '../hooks/GaleriCount';
import axios from 'axios';
import host from '../hooks/host';

export default () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const [prev, setPrev] = useState('');
  const [newImage, setNewImage] = useState([]);

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: host + '/content?category=galeri&status=true',
      });
      setNewImage(GaleriCount(data));
    } catch (error) {
      console.log(error);
    }
  };

  function handleShow(imageshow) {
    setShow(true);
    setPrev(imageshow);
  }

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
  return (
    <motion.div
      initial='init'
      animate='in'
      exit='out'
      variants={pageTransition}
      style={{display: 'flex', flexDirection: 'column'}}
    >
      <Navigation />
      <Container>
        <div style={{marginTop: 50}}>
          <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>GALERY</p>
        </div>
        {newImage &&
          newImage.map((item, index) => {
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
      <div style={{position: 'fixed', bottom: 0, width: '100vw'}}>
        <Footer />
      </div>
    </motion.div>
  );
};
