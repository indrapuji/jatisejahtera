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
  const [rev, setRev] = useState({});

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
      setRev({
        tgl_lahir: data.tgl_lahir,
        no_ktp: data.no_ktp,
        no_bpjs: data.no_bpjs,
        nama_bank: data.nama_bank,
        no_rekening: data.no_rekening,
        satuan_kerja: data.satuan_kerja,
        cabang: data.cabang,
        golongan_pangkat: data.golongan_pangkat,
        no_telp: data.no_telp,
        alamat: data.alamat,
        kelurahan: data.kelurahan,
        kecamatan: data.kecamatan,
        kota: data.kota,
        kodepos: data.kodepos,
        provinsi: data.provinsi,
        nama_pasangan: data.nama_pasangan,
        tgl_lahir_pasangan: data.tgl_lahir_pasangan,
        no_telp_pasangan: data.no_telp_pasangan,
        no_ktp_pasangan: data.no_ktp_pasangan,
        no_bpjs_pasangan: data.no_bpjs_pasangan,
        nama_bank_pasangan: data.nama_bank_pasangan,
        no_rekening_pasangan: data.no_rekening_pasangan,
        nama_anak: data.nama_anak,
        tgl_lahir_anak: data.tgl_lahir_anak,
        no_tlp_anak: data.no_tlp_anak,
        no_ktp_anak: data.no_ktp_anak,
        no_bpjs_anak: data.no_bpjs_anak,
        nama_bank_anak: data.nama_bank_anak,
        no_rekening_anak: data.no_rekening_anak,
      });
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

  const onFormChange = (e) => {
    e.preventDefault();
    const {value, name} = e.target;
    console.log(value);
    setRev({
      ...rev,
      [name]: value,
    });
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

  const handleUpdate = async (dataId) => {
    try {
      // e.preventDefault();
      await axios({
        method: 'PUT',
        url: `${HostUrl}/data/update-record/${dataId}`,
        data: rev,
        headers: {
          token: localStorage.token,
        },
      });
      NewAlert({status: 'success', message: 'Data Updated'});
    } catch (error) {
      console.log(error.response);
      NewAlert({status: 'error', message: 'Form Error'});
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
                  <CInput size='sm' value={rev.tgl_lahir} name='tgl_lahir' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>No KTP</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={rev.no_ktp} name='no_ktp' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>No BPJS</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={rev.no_bpjs} name='no_bpjs' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Data Bank</CLabel>
                </CCol>
                <CCol md='3'>
                  <CInput size='sm' value={rev.nama_bank} name='no_bpjs' onChange={onFormChange} />
                </CCol>
                <CCol md='6'>
                  <CInput size='sm' value={rev.no_rekening} name='no_rekening' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Satuan Kerja</CLabel>
                </CCol>
                <CCol md='3'>
                  <CInput size='sm' value={rev.satuan_kerja} disabled />
                </CCol>
                <CCol md='4'>
                  <CInput size='sm' value={rev.cabang} disabled />
                </CCol>
                <CCol md='2'>
                  <CInput size='sm' value={rev.golongan_pangkat} name='golongan_pangkat' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>No Telp Rumah</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={rev.no_telp} name='no_telp' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Alamat</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={rev.alamat} name='alamat' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3' />
                <CCol md='4'>
                  <CInput size='sm' value={rev.kelurahan} name='kelurahan' onChange={onFormChange} />
                </CCol>
                <CCol md='5'>
                  <CInput size='sm' value={rev.kecamatan} name='kecamatan' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3' />
                <CCol md='3'>
                  <CInput size='sm' value={rev.kota} name='kota' onChange={onFormChange} />
                </CCol>
                <CCol md='3'>
                  <CInput size='sm' value={rev.kodepos} name='kodepos' onChange={onFormChange} />
                </CCol>
                <CCol md='3'>
                  <CInput size='sm' value={rev.provinsi} name='provinsi' onChange={onFormChange} />
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
                  <CInput size='sm' value={rev.nama_pasangan} name='nama_pasangan' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Tanggal Lahir Istri / Suami</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={rev.tgl_lahir_pasangan} name='tgl_lahir_pasangan' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>No Telp Istri / Suami</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={rev.no_telp_pasangan} name='no_telp_pasangan' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>No KTP Istri / Suami</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={rev.no_ktp_pasangan} name='no_ktp_pasangan' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>No BPJS Istri / Suami</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={rev.no_bpjs_pasangan} name='no_bpjs_pasangan' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Data Bank Istri / Suami</CLabel>
                </CCol>
                <CCol md='3'>
                  <CInput size='sm' value={rev.nama_bank_pasangan} name='nama_bank_pasangan' onChange={onFormChange} />
                </CCol>
                <CCol md='6'>
                  <CInput
                    size='sm'
                    value={rev.no_rekening_pasangan}
                    name='no_rekening_pasangan'
                    onChange={onFormChange}
                  />
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
                  <CInput size='sm' value={rev.nama_anak} name='nama_anak' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Tanggal Lahir Anak</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={rev.tgl_lahir_anak} name='tgl_lahir_anak' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>No Telp Anak</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={rev.no_tlp_anak} name='no_tlp_anak' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>No KTP Anak</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={rev.no_ktp_anak} name='no_ktp_anak' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>No BPJS Anak</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={rev.no_bpjs_anak} name='no_bpjs_anak' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Data Bank Anak</CLabel>
                </CCol>
                <CCol md='3'>
                  <CInput size='sm' value={rev.nama_bank_anak} name='nama_bank_anak' onChange={onFormChange} />
                </CCol>
                <CCol md='6'>
                  <CInput size='sm' value={rev.no_rekening_anak} name='no_rekening_anak' onChange={onFormChange} />
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
                  onClick={() => handleUpdate(peserta.record_id)}
                >
                  <CIcon name='cil-recycle' /> Update Data
                </CButton>
                <CButton
                  size='sm'
                  style={{marginRight: 20}}
                  color='danger'
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
                        {item.all_in_one && (
                          <div style={{width: 100, height: 120, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                            <a href={item.all_in_one} target='_blank' rel='noopener noreferrer'>
                              <CImg src={filesSuccessImg} style={{width: 100, height: 100, objectFit: 'contain'}} />
                            </a>
                            <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: 8}}>all in one</div>
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
