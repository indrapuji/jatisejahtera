import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';

export default () => {
  const history = useHistory();
  useEffect(() => {
    Aos.init({duration: 3000});
  }, []);
  function handdleNews() {
    history.push('/berita');
  }
  return (
    <div style={{marginTop: 100}}>
      <div data-aos='zoom-in'>
        <div className='container'>
          <div className='row'>
            <div className='card border-success'>
              <div className='card-header'>
                <h5 className='text-center m-2'>Berita</h5>
              </div>
              <div className='card-body'>
                <div className='carousel vert slide' data-ride='carousel' data-interval='2000'>
                  <div className='carousel-inner'>
                    <div className='carousel-item active'>
                      <ul className='linetime'>
                        <li>
                          <h3 onClick={handdleNews}>Yayasan Jati Sejahtera (YKP3JS) Silaturahmi Di Jawa Barat</h3>
                          <p className='article'>
                            Yayasan jati sejahtera (YKP3JS) mengadakan kegiatan Silaturahmi bersama perwakilan yayasan
                            jati sejahtera di jawa barat
                          </p>
                        </li>
                        <li>
                          <h3 onClick={handdleNews}>Sosialisasi Pensiunan Perhutani Jawa Tengah Semarang</h3>
                          <p>
                            Pensiunan perhutani jawa tengah semarang melakukan sosialisasi mengenai biaya bantuan rawat
                            inap dan santunan kematian bagi pensiunan Perhutani.
                          </p>
                        </li>
                        <li>
                          <h3 onClick={handdleNews}>Yayasan Jati Sejahtera Terima Anak Yatim</h3>
                          <p>
                            Panti Asuhan Rimba Bakti di Ngepos II/7 Jrakah Tugurejo, Semarang yang didirikan tahun 1986
                            saat ini masih menerima anak yatim atau yatim piatu . Mereka diberi pendidikan minimal
                            sampai lulus SMK. Khusus yang prestasinya bagus bisa melanjutkan sampai lulus perguruan
                            tinggi. Kini sudah 4 anak asuh lulus perguruan tinggi dan 2 anak lagi masih kuliah.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
