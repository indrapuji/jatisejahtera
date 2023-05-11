import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CCardFooter,
  CInput,
  CLabel,
  CContainer,
  CFormGroup,
  CImg,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import filesImg from 'src/assets/images/png-file.png';
import filesSuccessImg from 'src/assets/images/png-file-success.png';
import axios from 'axios';
import HostUrl from '../../../utilities/HostUrl';
import {encrypt} from 'src/utilities/RandomLink';
import Swal from 'sweetalert2';
import NewAlert from 'src/components/NewAlert';
import formatDate from 'src/utilities/FormatDate';

const DetailPeserta = () => {
  const {idPeserta} = useParams();
  const history = useHistory();
  const [peserta, setPeserta] = useState([]);
  const [claimData, setClaimData] = useState([]);

  useEffect(() => {
    getDetail();
    // eslint-disable-next-line
  }, []);

  const getDetail = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `${HostUrl}/data/single/${idPeserta}`,
        headers: {
          token: localStorage.token,
        },
      });
      console.log(data);
      setPeserta(data);
      const claimHistory = await axios({
        method: 'GET',
        url: `${HostUrl}/claim?userId=${idPeserta}`,
        headers: {
          token: localStorage.token,
        },
      });
      console.log('===>', claimHistory.data);
      setClaimData(claimHistory.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleClaim = (username) => {
    history.push(`/claim/${encrypt(username)}`);
  };

  const colorHeader = (statusClaim) => {
    switch (statusClaim) {
      case 'created':
        return 'info';
      case 'approve':
        return 'success';
      default:
        return 'danger';
    }
  };

  const handleReset = () => {
    try {
      Swal.fire({
        title: 'Do you want to reset password?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `Don't Reset`,
      }).then((result) => {
        if (result.isConfirmed) {
          axios({
            method: 'PUT',
            url: `${HostUrl}/user/reset-password/${idPeserta}`,
            headers: {
              token: localStorage.token,
            },
          });
          NewAlert({status: 'success', message: 'Password has been reset'});
          getDetail();
        }
      });
    } catch (error) {
      NewAlert({status: 'error', message: 'Isi Semua'});
    }
  };

  return (
    <CContainer>
      <CRow className='justify-content-center'>
        <CCol xs='12' md='12'>
          <CCard>
            <CCardHeader>
              <div>
                <span style={{fontSize: 20, fontWeight: 'bold'}}>Data Peserta</span>
              </div>
            </CCardHeader>
            <CCardBody>
              <div style={{marginBottom: 20}}>
                <strong>Data Diri</strong>
              </div>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Nama</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={peserta.name} disabled />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Nomor Induk</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={peserta.nip} disabled />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Email</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={peserta.email} disabled />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Tanggal Lahir</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={peserta.tgl_lahir} disabled />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>No KTP</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={peserta.no_ktp} disabled />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>No BPJS</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={peserta.no_bpjs} disabled />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Data Bank</CLabel>
                </CCol>
                <CCol md='3'>
                  <CInput size='sm' value={peserta.nama_bank} disabled />
                </CCol>
                <CCol md='6'>
                  <CInput size='sm' value={peserta.no_rekening} disabled />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Satuan Kerja</CLabel>
                </CCol>
                <CCol md='4'>
                  <CInput size='sm' value={peserta.satuan_kerja} disabled />
                </CCol>
                <CCol md='5'>
                  <CInput size='sm' value={peserta.golongan_pangkat} disabled />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>No Telp Rumah</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={peserta.no_telp} disabled />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Alamat</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={peserta.alamat} disabled />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3' />
                <CCol md='4'>
                  <CInput size='sm' value={peserta.kelurahan} disabled />
                </CCol>
                <CCol md='5'>
                  <CInput size='sm' value={peserta.kecamatan} disabled />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3' />
                <CCol md='3'>
                  <CInput size='sm' value={peserta.kota} disabled />
                </CCol>
                <CCol md='3'>
                  <CInput size='sm' value={peserta.kodepos} disabled />
                </CCol>
                <CCol md='3'>
                  <CInput size='sm' value={peserta.provinsi} disabled />
                </CCol>
              </CFormGroup>
              <div style={{marginBottom: 20, marginTop: 30}}>
                <strong>Data Pendukung 1</strong>
              </div>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Nama Istri / Suami</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={peserta.nama_pasangan} disabled />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Tanggal Lahir Istri / Suami</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={peserta.tgl_lahir_pasangan} disabled />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>No Telp Istri / Suami</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={peserta.no_telp_pasangan} disabled />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>No KTP Istri / Suami</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={peserta.no_ktp_pasangan} disabled />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>No BPJS Istri / Suami</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={peserta.no_bpjs_pasangan} disabled />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Data Bank Istri / Suami</CLabel>
                </CCol>
                <CCol md='3'>
                  <CInput size='sm' value={peserta.nama_bank_pasangan} disabled />
                </CCol>
                <CCol md='6'>
                  <CInput size='sm' value={peserta.no_rekening_pasangan} disabled />
                </CCol>
              </CFormGroup>
              <div style={{marginBottom: 20, marginTop: 30}}>
                <strong>Data Pendukung 2</strong>
              </div>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Nama Anak</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={peserta.nama_anak} disabled />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Tanggal Lahir Anak</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={peserta.tgl_lahir_anak} disabled />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>No Telp Anak</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={peserta.no_tlp_anak} disabled />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>No KTP Anak</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={peserta.no_ktp_anak} disabled />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>No BPJS Anak</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={peserta.no_bpjs_anak} disabled />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Data Bank Anak</CLabel>
                </CCol>
                <CCol md='3'>
                  <CInput size='sm' value={peserta.nama_bank_anak} disabled />
                </CCol>
                <CCol md='6'>
                  <CInput size='sm' value={peserta.no_rekening_anak} disabled />
                </CCol>
              </CFormGroup>
            </CCardBody>
            <CCardFooter style={{display: 'flex', justifyContent: 'space-between'}}>
              <CButton size='sm' color='primary' onClick={handleBack}>
                <CIcon name='cil-ChevronLeft' /> Kembali
              </CButton>
              <div>
                <CButton
                  size='sm'
                  style={{marginRight: 20}}
                  color='warning'
                  onClick={() => handleReset(peserta.username)}
                >
                  <CIcon name='cil-settings' /> Reset Password
                </CButton>
                <CButton size='sm' color='info' onClick={() => handleClaim(peserta.username)}>
                  Ajukan Claim <CIcon name='cil-ChevronRight' />
                </CButton>
              </div>
            </CCardFooter>
          </CCard>

          <CCard>
            <CCardHeader>
              <div>
                <span style={{fontSize: 20, fontWeight: 'bold'}}>Claim Histori</span>
              </div>
            </CCardHeader>
            <CCardBody>
              {claimData &&
                claimData.map((item) => (
                  <CCard key={item.id}>
                    <CCardHeader
                      color={colorHeader(item.status)}
                      style={{display: 'flex', justifyContent: 'space-between'}}
                    >
                      <div>{item.kategori}</div>
                      <div>{formatDate(item.created_date)}</div>
                    </CCardHeader>
                    <CCardBody>
                      <div style={{display: 'flex', flexWrap: 'wrap', marginBottom: 30}}>
                        {item.fotokopi_kk && (
                          <div style={{width: 100, height: 120, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                            <a href={peserta.fotokopi_kk} target='_blank' rel='noopener noreferrer'>
                              <CImg src={filesImg} style={{width: 100, height: 100, objectFit: 'contain'}} />
                            </a>
                            <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: 8}}>Kartu Keluarga</div>
                          </div>
                        )}
                        {item.fotokopi_kp && (
                          <div style={{width: 100, height: 120, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                            <a href={item.fotokopi_kp} target='_blank' rel='noopener noreferrer'>
                              <CImg src={filesImg} style={{width: 100, height: 100, objectFit: 'contain'}} />
                            </a>
                            <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: 8}}>Kartu Peserta</div>
                          </div>
                        )}
                        {item.fotokopi_sk_pensiun && (
                          <div style={{width: 100, height: 120, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                            <a href={item.fotokopi_sk_pensiun} target='_blank' rel='noopener noreferrer'>
                              <CImg src={filesImg} style={{width: 100, height: 100, objectFit: 'contain'}} />
                            </a>
                            <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: 8}}>SK Pensiun</div>
                          </div>
                        )}
                        {item.keterangan_kepolisian && (
                          <div style={{width: 100, height: 120, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                            <a href={item.keterangan_kepolisian} target='_blank' rel='noopener noreferrer'>
                              <CImg src={filesImg} style={{width: 100, height: 100, objectFit: 'contain'}} />
                            </a>
                            <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: 8}}>Surat Kepolisian</div>
                          </div>
                        )}
                        {item.keterangan_menginggal_dunia_lurah && (
                          <div style={{width: 100, height: 120, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                            <a href={item.keterangan_menginggal_dunia_lurah} target='_blank' rel='noopener noreferrer'>
                              <CImg src={filesImg} style={{width: 100, height: 100, objectFit: 'contain'}} />
                            </a>
                            <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: 8}}>SK Lurah</div>
                          </div>
                        )}
                        {item.keterangan_meninggal_dunia_rumah_sakit && (
                          <div style={{width: 100, height: 120, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                            <a
                              href={item.keterangan_meninggal_dunia_rumah_sakit}
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              <CImg src={filesImg} style={{width: 100, height: 100, objectFit: 'contain'}} />
                            </a>
                            <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: 8}}>SK Rumah Sakit</div>
                          </div>
                        )}
                        {item.fotokopi_ktp && (
                          <div style={{width: 100, height: 120, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                            <a href={item.lampiran} target='_blank' rel='noopener noreferrer'>
                              <CImg src={filesImg} style={{width: 100, height: 100, objectFit: 'contain'}} />
                            </a>
                            <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: 8}}>KTP</div>
                          </div>
                        )}
                        {item.permohonan_ahli_waris && (
                          <div style={{width: 100, height: 120, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                            <a href={item.permohonan_ahli_waris} target='_blank' rel='noopener noreferrer'>
                              <CImg src={filesImg} style={{width: 100, height: 100, objectFit: 'contain'}} />
                            </a>
                            <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: 8}}>Surat Ahli Waris</div>
                          </div>
                        )}
                        {item.permohonan_pensiunan && (
                          <div style={{width: 100, height: 120, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                            <a href={item.permohonan_pensiunan} target='_blank' rel='noopener noreferrer'>
                              <CImg src={filesImg} style={{width: 100, height: 100, objectFit: 'contain'}} />
                            </a>
                            <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: 8}}>
                              Surat Permohonan Pensiunan
                            </div>
                          </div>
                        )}
                        {item.pernyataan_dari_pensiunan && (
                          <div style={{width: 100, height: 120, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                            <a href={item.pernyataan_dari_pensiunan} target='_blank' rel='noopener noreferrer'>
                              <CImg src={filesImg} style={{width: 100, height: 100, objectFit: 'contain'}} />
                            </a>
                            <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: 8}}>
                              Surat Pernyataan Pensiunan dari Perhutani
                            </div>
                          </div>
                        )}
                        {item.kuitansi_asli_rs && (
                          <div style={{width: 100, height: 120, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                            <a href={item.kuitansi_asli_rs} target='_blank' rel='noopener noreferrer'>
                              <CImg src={filesImg} style={{width: 100, height: 100, objectFit: 'contain'}} />
                            </a>
                            <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: 8}}>Kuitansi Asli RS</div>
                          </div>
                        )}
                        {item.surat_keterangan_rs && (
                          <div style={{width: 100, height: 120, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                            <a href={item.surat_keterangan_rs} target='_blank' rel='noopener noreferrer'>
                              <CImg src={filesImg} style={{width: 100, height: 100, objectFit: 'contain'}} />
                            </a>
                            <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: 8}}>
                              Surat Keterangan Sakit dari RS
                            </div>
                          </div>
                        )}
                        {item.surat_permohonan_bantuan_biaya && (
                          <div style={{width: 100, height: 120, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                            <a href={item.surat_permohonan_bantuan_biaya} target='_blank' rel='noopener noreferrer'>
                              <CImg src={filesImg} style={{width: 100, height: 100, objectFit: 'contain'}} />
                            </a>
                            <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: 8}}>
                              Surat Permohonan Bantuan Biaya
                            </div>
                          </div>
                        )}
                        {item.foto_selfie && (
                          <div style={{width: 100, height: 120, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                            <a href={item.foto_selfie} target='_blank' rel='noopener noreferrer'>
                              <CImg src={filesImg} style={{width: 100, height: 100, objectFit: 'contain'}} />
                            </a>
                            <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: 8}}>Foto Selfie</div>
                          </div>
                        )}
                        {item.lampiran && (
                          <div style={{width: 100, height: 120, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                            <a href={item.lampiran} target='_blank' rel='noopener noreferrer'>
                              <CImg src={filesSuccessImg} style={{width: 100, height: 100, objectFit: 'contain'}} />
                            </a>
                            <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: 8}}>Lampiran</div>
                          </div>
                        )}
                      </div>
                      {item.pesan && (
                        <CFormGroup row>
                          <CCol md='1'>
                            <CLabel>Pesan</CLabel>
                          </CCol>
                          <CCol md='11'>
                            <CInput size='sm' value={item.pesan} disabled />
                          </CCol>
                        </CFormGroup>
                      )}

                      {item.nominal && (
                        <CFormGroup row>
                          <CCol md='1'>
                            <CLabel>Nominal</CLabel>
                          </CCol>
                          <CCol md='11'>
                            <CInput size='sm' value={item.nominal} disabled />
                          </CCol>
                        </CFormGroup>
                      )}
                    </CCardBody>
                  </CCard>
                ))}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default DetailPeserta;
