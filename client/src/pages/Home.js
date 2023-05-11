import React, {useEffect, useState} from 'react';
import {Card, CardDeck, Image, Button, Modal} from 'react-bootstrap';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import Pendidikan from '../assets/home/pendidikan.png';
import Sosial from '../assets/home/sosial.png';
import Perumahan from '../assets/home/perumahan.png';
import Kesehatan from '../assets/home/kesehatan.png';
import Rawat from '../assets/image/bantuanRawat.jpg';
import Kacamata from '../assets/image/kacamata.png';
import NilaiHidup from '../assets/image/nilaiHidup.jpg';
import SantunanKematian from '../assets/image/santunanKematian.jpg';
import {Link, useHistory} from 'react-router-dom';
import {motion} from 'framer-motion';
import Visimisi from '../components/Visimisi';
import Berita from '../components/Berita';
import '../page.css';
import Aos from 'aos';

// import newBanner from '../assets/image/idulfitri.jpg';
import pensiunan from '../assets/image/JS_7.jpg';
import silaturahmi from '../assets/image/JS_10.jpg';
import sosialisasi from '../assets/image/JS_8.jpg';
import pantiAsuhan from '../assets/image/JS_4.jpg';
import bantuan from '../assets/image/JS_3.jpg';
import silaturahmiBogor from '../assets/image/JS_2.jpg';
import sosialisasiBandung from '../assets/image/JS_1.jpg';
import edukasiBogor from '../assets/image/JS_6.jpg';

import axios from 'axios';
import Swal from 'sweetalert2';
import host from '../hooks/host';

export default () => {
  const history = useHistory();

  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  const [profileData, setProfileData] = useState(false);
  const [dataPengajuan, setDataPengajuan] = useState({
    claim_kematians: '',
    claim_kesehatans: '',
    claim_nilai_hidups: '',
    claim_pendidikans: '',
    claim_perumahans: '',
  });

  const [bannerShow, setBannerShow] = useState();

  useEffect(() => {
    Aos.init({duration: 2500});
    getBanner();
    if (localStorage.token) {
      getProfileData();
    }
  }, []);

  useEffect(() => {
    if (profileData) claimData();
    // eslint-disable-next-line
  }, [profileData]);

  const claimData = () => {
    let temp = {
      claim_kematians: '',
      claim_kesehatans: '',
      claim_nilai_hidups: '',
      claim_pendidikans: '',
      claim_perumahans: '',
    };
    for (let keys in dataPengajuan) {
      if (profileData[keys][0]) {
        if (profileData[keys][0].status === '1') {
          temp[keys] = `Checking Staff`;
        } else if (profileData[keys][0].status === '2') {
          temp[keys] = `Proses Pencairan`;
        } else if (profileData[keys][0].status === '3') {
          temp[keys] = `Pencairan Berhasil`;
        } else if (profileData[keys][0].status === '4') {
          temp[keys] = `Checking Finance`;
        } else if (profileData[keys][0].status === '5') {
          temp[keys] = `Verified`;
        } else if (profileData[keys][0].status === '0') {
          temp[keys] = `Ditolak`;
        }
      } else temp[keys] = '-';
    }
    setDataPengajuan(temp);
    console.log(temp);
  };

  const getProfileData = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `${host}/users/profile`,
        headers: {
          token: localStorage.token,
        },
      });
      setProfileData(data);
      console.log(data);
    } catch (err) {
      let msg = '';
      if (err.response) {
        if (Array.isArray(err.response.data.msg)) {
          msg = err.response.data.msg.join('<br>');
        } else {
          msg = err.response.data.msg;
        }
      } else if (err.request) {
        msg = err.request;
      } else {
        msg = err.message;
      }
      console.log(msg);
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Oops...',
      //   html: `${msg}`,
      // });
    }
  };

  const getBanner = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        // url: `http://localhost:3001/content?category=banner&status=true`,
        url: `${host}/content?category=banner&status=true`,
      });
      if (data.length > 0) {
        setBannerShow(data[0].image_url);
        setModalShow(true);
      }
    } catch (error) {
      console(error);
    }
  };

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

  function handdleKematian() {
    history.push('/claim/kematian');
  }
  function handdleManfaat() {
    history.push('/claim/manfaat');
  }
  function handdleKesehatan() {
    history.push('/claim/kesehatan');
  }
  function handdleKacamata() {
    history.push('/claim/kacamata');
  }
  function handdlePengkinian() {
    history.push('/data/update');
  }

  const handleCek = async () => {
    try {
      const {value: dataNIP} = await Swal.fire({
        title: 'NIP',
        input: 'text',
        // inputLabel: "Masukkan NIP",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!';
          }
        },
      });

      const {data} = await axios({
        method: 'POST',
        url: `https://ws.ykp3js.org/cek`,
        data: {
          nip: dataNIP,
          tokenkey:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiJZS1AzSlNXZWIiLCJ0aW1lc3RhbXAiOjE2NjIyNzM1MDB9.7W1lr29HTvAQDYR1FUIRG3mrsyGqTVAbQe9daDeUz8k',
          act: 'klaim',
        },
      });

      if (data.status === 200) {
        let len = data.dataKlaim.length;
        let textCons = null;
        if (len > 0) {
          if (len === 1) {
            textCons = `Anda Sudah mengajukan ${data.dataKlaim[0].JenisKlaim}`;
          } else {
            textCons = `Anda Sudah mengajukan ${len} jenis Klaim`;
          }
        } else {
          textCons = 'Anda belum pernah mengajukan Klaim';
        }
        console.log(data);
        Swal.fire(`HAI ${data.data.Nama}`, `${textCons}`, 'question');
      } else {
        // Swal.fire(
        //   `NIP tidak terdaftar / NIP salah`,
        //   `Cek kembali NIP anda`,
        //   "question"
        // );

        Swal.fire({
          title: `NIP tidak terdaftar / NIP salah`,
          text: `Cek kembali NIP anda`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Daftar',
        }).then((result) => {
          if (result.isConfirmed) {
            history.push('/daftar-baru');
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [modalShow, setModalShow] = useState(false);

  function NotificationPopUp(props) {
    return (
      <Modal {...props} centered>
        <Modal.Body>
          {/* <Image src={newBanner} style={{justifyContent: 'center', width: 550}} /> */}
          <Image src={bannerShow} style={{justifyContent: 'center', width: 550}} />
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <motion.div initial='init' animate='in' exit='out' variants={pageTransition}>
      <div className='bannerHome'>
        <Navigation />
        <NotificationPopUp show={modalShow} onHide={() => setModalShow(false)} />
        <div className='program'>
          <div data-aos='fade-up'>
            <p className='programTitle'>Program kami</p>
          </div>
          <div className='cardProgram'>
            <CardDeck>
              <div data-aos='zoom-in'>
                <div
                  data-aos='fade-right'
                  style={{
                    position: 'absolute',
                    zIndex: 1,
                    left: -100,
                    top: 200,
                  }}
                >
                  <Image src={require('../assets/landingpage/leaf_bottom.png')} style={{width: 200}} />
                </div>
                <div data-aos='zoom-in' style={{position: 'absolute', left: -100, top: 1150}}>
                  <Image src={require('../assets/landingpage/leaf_bottom.png')} style={{width: 200}} />
                </div>
                <Card
                  style={{
                    width: '18rem',
                    borderRadius: 20,
                    backgroundColor: 'red',
                    borderColor: 'red',
                    borderWidth: 5,
                  }}
                >
                  <Card.Img variant='top' src={Pendidikan} style={{height: '10rem', borderRadius: 40}} />
                  <Card.Body>
                    <Link to='/program/pendidikan'>
                      <h3
                        style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          color: 'black',
                        }}
                      >
                        Pendidikan
                      </h3>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
              <div data-aos='zoom-in'>
                <Card
                  style={{
                    width: '18rem',
                    borderRadius: 20,
                    backgroundColor: 'purple',
                    borderColor: 'purple',
                    borderWidth: 5,
                  }}
                >
                  <Card.Img variant='top' src={Sosial} style={{height: '10rem', borderRadius: 40}} />
                  <Card.Body>
                    <Link to='/program/sosial'>
                      <h3
                        style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          color: 'black',
                        }}
                      >
                        Sosial
                      </h3>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
              <div data-aos='zoom-in'>
                <Card
                  style={{
                    width: '18rem',
                    borderRadius: 20,
                    backgroundColor: 'blue',
                    borderColor: 'blue',
                    borderWidth: 5,
                  }}
                >
                  <Card.Img variant='top' src={Perumahan} style={{height: '10rem', borderRadius: 40}} />
                  <Card.Body>
                    <Link to='/program/perumahan'>
                      <h3
                        style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          color: 'black',
                        }}
                      >
                        Perumahan
                      </h3>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
              <div data-aos='zoom-in'>
                <div
                  data-aos='fade-left'
                  style={{
                    position: 'absolute',
                    zIndex: 1,
                    left: 150,
                    top: 200,
                  }}
                >
                  <Image src={require('../assets/landingpage/leaf_top.png')} style={{width: 150}} />
                </div>
                <Card
                  style={{
                    width: '18rem',
                    borderRadius: 20,
                    backgroundColor: 'green',
                    borderColor: 'green',
                    borderWidth: 5,
                  }}
                >
                  <Card.Img variant='top' src={Kesehatan} style={{height: '10rem', borderRadius: 40}} />
                  <Card.Body>
                    <Link to='/program/kesehatan'>
                      <h3
                        style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          color: 'black',
                        }}
                      >
                        Kesehatan
                      </h3>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            </CardDeck>
          </div>
          <div data-aos='fade-up'>
            <p className='claimTitle'>Pengajuan Claim</p>
          </div>
          <div data-aos='fade-up' style={{display: 'flex', justifyContent: 'center'}}>
            <Card
              style={{
                width: '18rem',
                borderRadius: 20,
                borderWidth: 5,
                cursor: 'pointer',
              }}
              onClick={handleCek}
            >
              <Card.Body>
                <h3 style={{textAlign: 'center', color: 'black'}}>Cek Klaim</h3>
              </Card.Body>
            </Card>
          </div>
          <div
            data-aos='zoom-in'
            style={{
              marginLeft: 10,
              marginRight: 10,
              marginTop: 30,
              marginBottom: 50,
            }}
          >
            <CardDeck>
              <Card style={{borderRadius: 20}}>
                <Card.Body>
                  <Card.Img variant='top' src={SantunanKematian} style={{height: '10rem', borderRadius: 40}} />
                  <Card.Title>Santunan Kematian</Card.Title>
                  <Card.Text>
                    Santunan kematian dibayarkan kepada ahli waris,selambat-lambatnya 14 hari kerja setelah berkas
                    pengajuan diterima dengan lengkap dan benar oleh Yayasan.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  {dataPengajuan && dataPengajuan.claim_kematians === '-' ? (
                    <Button variant='success' block onClick={handdleKematian}>
                      Ajukan
                    </Button>
                  ) : (
                    <Button variant='secondary' block disabled>
                      Anda Sedang / Sudah Mengajukan
                    </Button>
                  )}
                </Card.Footer>
              </Card>
              <Card style={{borderRadius: 20}}>
                <Card.Body>
                  <Card.Img variant='top' src={NilaiHidup} style={{height: '10rem'}} />
                  <Card.Title>Manfaat Nilai Hidup</Card.Title>
                  <Card.Text>
                    Nilai Hidup dibayarkan kepada peserta,selambat-lambatnya 14 hari kerja setelah berkas pengajuan
                    diterima dengan lengkap dan benar oleh Yayasan.
                    {'                    '}
                    <br />
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  {dataPengajuan && dataPengajuan.claim_nilai_hidups === '-' ? (
                    <Button variant='success' block onClick={handdleManfaat}>
                      Ajukan
                    </Button>
                  ) : (
                    <Button variant='secondary' block disabled>
                      Anda Sedang / Sudah Mengajukan
                    </Button>
                  )}
                </Card.Footer>
              </Card>
              <Card style={{borderRadius: 20}}>
                <Card.Body>
                  <Card.Img variant='top' src={Rawat} style={{height: '10rem'}} />
                  <Card.Title>Bantuan Rawat Inap</Card.Title>
                  <Card.Text>
                    Penggantian Biaya Rawat Inap dibayarkan kepada peserta,selambat-lambatnya 14 hari kerja setelah
                    berkas pengajuan diterima dengan lengkap dan benar oleh Yayasan.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  {dataPengajuan && dataPengajuan.claim_kesehatans ? (
                    <Button variant='success' block onClick={handdleKesehatan}>
                      Ajukan
                    </Button>
                  ) : (
                    <Button variant='secondary' block disabled>
                      Anda Sedang / Sudah Mengajukan
                    </Button>
                  )}
                </Card.Footer>
              </Card>
              <Card style={{borderRadius: 20}}>
                <Card.Body>
                  <Card.Img variant='top' src={Kacamata} style={{height: '10rem'}} />
                  <Card.Title>Bantuan Kacamata</Card.Title>
                  <Card.Text>
                    Penggantian Pembelian Kacamata dibayarkan kepada peserta,selambat-lambatnya 14 hari kerja setelah
                    berkas pengajuan diterima dengan lengkap dan benar oleh Yayasan.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  {dataPengajuan && dataPengajuan.claim_pendidikans ? (
                    <Button variant='success' block onClick={handdleKacamata}>
                      Pengajuan
                    </Button>
                  ) : (
                    <Button variant='secondary' block disabled>
                      Anda Sedang / Sudah Mengajukan
                    </Button>
                  )}
                </Card.Footer>
              </Card>
            </CardDeck>
          </div>

          {/* <Profile /> */}

          <Berita />

          <Visimisi />
        </div>
        <div style={{marginTop: 50}}>
          <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>GALERY</p>
        </div>
        <div style={{padding: 10, marginBottom: 10}}>
          <div className='container mt-40'>
            <div className='row mt-30'>
              <div data-aos='flip-up' className='col-md-3 col-sm-6'>
                <div className='box15'>
                  <img src={pensiunan} style={{height: '10rem'}} alt='' />
                  <div className='box-content'>
                    <h3 className='titleHome' style={{textAlign: 'center'}}>
                      Edukasi kepada pensiunan di jombang
                    </h3>
                  </div>
                </div>
              </div>

              <div data-aos='flip-up' className='col-md-3 col-sm-6'>
                <div className='box15'>
                  <img src={silaturahmi} style={{height: '10rem'}} alt='' />
                  <div className='box-content'>
                    <h3 className='titleHome' style={{textAlign: 'center'}}>
                      Edukasi dan silaturahmi pensiunan di bogor
                    </h3>
                  </div>
                </div>
              </div>
              <div data-aos='flip-up' className='col-md-3 col-sm-6'>
                <div className='box15'>
                  <img src={sosialisasi} style={{height: '10rem'}} alt='' />
                  <div className='box-content'>
                    <h3 className='titleHome' style={{textAlign: 'center'}}>
                      Edukasi dan sosialisasi kepada pensiunan di jombang
                    </h3>
                  </div>
                </div>
              </div>
              <div data-aos='flip-up' className='col-md-3 col-sm-6'>
                <div className='box15'>
                  <img src={pantiAsuhan} style={{height: '10rem'}} alt='' />
                  <div className='box-content'>
                    <h3 className='titleHome' style={{textAlign: 'center'}}>
                      Kunjungan ke panti asuhan rimba bakti
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{padding: 10, marginBottom: 50}}>
          <div className='container mt-40'>
            <div className='row mt-30'>
              <div data-aos='flip-up' className='col-md-3 col-sm-6'>
                <div className='box15'>
                  <img src={bantuan} style={{height: '10rem'}} alt='' />
                  <div className='box-content'>
                    <h3 className='titleHome' style={{textAlign: 'center'}}>
                      Penyerahan bantuan kepada pengurus panti asuhan rimba bakti
                    </h3>
                  </div>
                </div>
              </div>

              <div data-aos='flip-up' className='col-md-3 col-sm-6'>
                <div className='box15'>
                  <img src={silaturahmiBogor} style={{height: '10rem'}} alt='' />
                  <div className='box-content'>
                    <h3 className='titleHome' style={{textAlign: 'center'}}>
                      Silaturahmi pensiunan di bogor
                    </h3>
                  </div>
                </div>
              </div>
              <div data-aos='flip-up' className='col-md-3 col-sm-6'>
                <div className='box15'>
                  <img src={sosialisasiBandung} style={{height: '10rem'}} alt='' />
                  <div className='box-content'>
                    <h3 className='titleHome' style={{textAlign: 'center'}}>
                      Sosialisasi di bandung dengan pensiunan dan calon pensiunan
                    </h3>
                  </div>
                </div>
              </div>
              <div data-aos='flip-up' className='col-md-3 col-sm-6'>
                <div className='box15'>
                  <img src={edukasiBogor} style={{height: '10rem'}} alt='' />
                  <div className='box-content'>
                    <h3 className='titleHome' style={{textAlign: 'center'}}>
                      Edukasi kepada pensiunan di bogor
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div data-aos='zoom-in'>
          <Card
            id='pengkinian-data'
            style={{
              borderRadius: 20,
              marginLeft: 350,
              marginRight: 350,
              marginBottom: 50,
            }}
          >
            <Card.Body>
              <Card.Title style={{textAlign: 'center'}}>Perbaharui Data Peserta</Card.Title>
              <Card.Text style={{textAlign: 'center'}}>Perbaharui data anda sekarang</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant='success' block onClick={handdlePengkinian}>
                Pengkinian Data
              </Button>
            </Card.Footer>
          </Card>
        </div>

        {/* <div id="pengkinian-data">
          <img src={WhatsApp} style={{ height: "5rem" }} alt="" />
        </div> */}

        <Footer />
      </div>
    </motion.div>
  );
};

// import React from 'react';
// import under from '../assets/image/under.png';

// function Home() {
//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: '100vw',
//         height: '100vh',
//         backgroundColor: '#f6f6f6',
//       }}
//     >
//       <img src={under} alt='Italian Trulli' style={{ width: '100%' }} />
//     </div>
//   );
// }

// export default Home;
