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
  CSelect,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import HostUrl from '../../../utilities/HostUrl';
import NewAlert from 'src/components/NewAlert';
import {decrypt} from 'src/utilities/RandomLink';
import {kapusSection, jabarSection, jatengSection, jatimSection} from 'src/utilities';

const DetailPeserta = () => {
  const {idPeserta} = useParams();
  const history = useHistory();
  const [peserta, setPeserta] = useState({});
  const [edit, setEdit] = useState({});
  const [region, setRegion] = useState();

  useEffect(() => {
    getDetail();
    // eslint-disable-next-line
  }, []);

  const getDetail = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `${HostUrl}/user/single/${decrypt(idPeserta)}`,
        headers: {
          token: localStorage.token,
        },
      });
      console.log(data);
      setPeserta(data);
      setRegion(data.regional);
      // const result = await axios({
      //   method: 'GET',
      //   url: `${HostUrl}/data/single/${decrypt(idPeserta)}`,
      //   headers: {
      //     token: localStorage.token,
      //   },
      // });
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    history.goBack();
  };

  const onFormChange = (event) => {
    const {value, name} = event.target;
    console.log(name, value);
    setEdit({
      ...edit,
      [name]: value,
    });
  };

  const submitForm = async () => {
    try {
      const {cabang, golongan_pangkat} = edit;
      console.log('cabang', cabang);
      if (cabang === '0' || golongan_pangkat === '0' || cabang === undefined || golongan_pangkat === undefined) {
        NewAlert({status: 'error', message: 'cabang dan golongan tidak boleh kosong'});
        return;
      }
      // await axios({
      //   method: 'POST',
      //   url: `${HostUrl}/data/staff-record/${decrypt(idPeserta)}`,
      //   data: {
      //     tgl_lahir: edit.tgl_lahir,
      //     no_ktp: edit.no_ktp,
      //     no_bpjs: edit.no_bpjs,
      //     nama_bank: edit.nama_bank,
      //     no_rekening: edit.no_rekening,
      //     satuan_kerja: region,
      //     cabang: edit.cabang,
      //     golongan_pangkat: edit.golongan_pangkat,
      //     no_telp: edit.no_telp,
      //     alamat: edit.alamat,
      //     kelurahan: edit.kelurahan,
      //     kecamatan: edit.kecamatan,
      //     kota: edit.kota,
      //     kodepos: edit.kodepos,
      //     provinsi: edit.provinsi,
      //     nama_pasangan: edit.nama_pasangan,
      //     tgl_lahir_pasangan: edit.tgl_lahir_pasangan,
      //     no_telp_pasangan: edit.no_telp_pasangan,
      //     no_ktp_pasangan: edit.no_ktp_pasangan,
      //     no_bpjs_pasangan: edit.no_bpjs_pasangan,
      //     nama_bank_pasangan: edit.nama_bank_pasangan,
      //     no_rekening_pasangan: edit.no_rekening_pasangan,
      //     nama_anak: edit.nama_anak,
      //     tgl_lahir_anak: edit.tgl_lahir_anak,
      //     no_tlp_anak: edit.no_tlp_anak,
      //     no_ktp_anak: edit.no_ktp_anak,
      //     no_bpjs_anak: edit.no_bpjs_anak,
      //     nama_bank_anak: edit.nama_bank_anak,
      //     no_rekening_anak: edit.no_rekening_anak,
      //   },
      //   headers: {
      //     token: localStorage.token,
      //   },
      // });
      console.log(edit);
      NewAlert({status: 'success', message: `Update Data Berhasil`});
      // history.push('/data');
    } catch (error) {
      const {msg} = error.response.data;
      NewAlert({status: 'error', message: msg});
    }
  };

  return (
    <CContainer>
      <CRow className='justify-content-center'>
        <CCol xs='12' md='12'>
          <CCard>
            <CCardHeader>
              <div>
                <span style={{fontSize: 20, fontWeight: 'bold'}}>Update Data Peserta</span>
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
                  <CLabel>Username</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={peserta.username} disabled />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Password</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={peserta.password} disabled />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Tanggal Lahir</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' type='date' name='tgl_lahir' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>No KTP</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' name='no_ktp' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>No BPJS</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' name='no_bpjs' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Data Bank</CLabel>
                </CCol>
                <CCol md='3'>
                  <CInput size='sm' name='nama_bank' placeholder='Nama Bank' onChange={onFormChange} />
                </CCol>
                <CCol md='6'>
                  <CInput size='sm' name='no_rekening' placeholder='No Rekening' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>
                    Satuan Kerja <span style={{color: 'red'}}>*</span>
                  </CLabel>
                </CCol>
                <CCol md='3'>
                  <CInput size='sm' value={peserta.regional} name='satuan_kerja' disabled onChange={onFormChange} />
                </CCol>
                <CCol md='4'>
                  <CSelect id='select' name='cabang' size='sm' onChange={onFormChange}>
                    <option value='0'>Cabang</option>
                    {region === 'kantor-pusat' &&
                      kapusSection.map((data, index) => {
                        return (
                          <option key={index} value={data.value}>
                            {data.labelKey}
                          </option>
                        );
                      })}
                    {region === 'jawa-barat' &&
                      jabarSection.map((data, index) => {
                        return (
                          <option key={index} value={data.value}>
                            {data.labelKey}
                          </option>
                        );
                      })}
                    {region === 'jawa-tengah' &&
                      jatengSection.map((data, index) => {
                        return (
                          <option key={index} value={data.value}>
                            {data.labelKey}
                          </option>
                        );
                      })}
                    {region === 'jawa-timur' &&
                      jatimSection.map((data, index) => {
                        return (
                          <option key={index} value={data.value}>
                            {data.labelKey}
                          </option>
                        );
                      })}
                  </CSelect>
                </CCol>
                <CCol md='2'>
                  <CSelect id='select' name='golongan_pangkat' size='sm' onChange={onFormChange}>
                    <option value='0'>Golongan</option>
                    <option value='A/I'>A/I</option>
                    <option value='II'>II</option>
                    <option value='III'>III</option>
                    <option value='IV'>IV</option>
                  </CSelect>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>No Telp Rumah</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' name='no_telp' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Alamat</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' name='alamat' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3' />
                <CCol md='4'>
                  <CInput size='sm' name='kelurahan' onChange={onFormChange} placeholder='kelurahan' />
                </CCol>
                <CCol md='5'>
                  <CInput size='sm' name='kecamatan' onChange={onFormChange} placeholder='kecamatan' />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3' />
                <CCol md='3'>
                  <CInput size='sm' name='kota' onChange={onFormChange} placeholder='kota' />
                </CCol>
                <CCol md='3'>
                  <CInput size='sm' name='kodepos' onChange={onFormChange} placeholder='kodepos' />
                </CCol>
                <CCol md='3'>
                  <CInput size='sm' name='provinsi' onChange={onFormChange} placeholder='provinsi' />
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
                  <CInput size='sm' name='nama_pasangan' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Tanggal Lahir Istri / Suami</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' type='date' name='tgl_lahir_pasangan' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>No Telp Istri / Suami</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' name='no_telp_pasangan' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>No KTP Istri / Suami</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' name='no_ktp_pasangan' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>No BPJS Istri / Suami</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' name='no_bpjs_pasangan' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Data Bank Istri / Suami</CLabel>
                </CCol>
                <CCol md='3'>
                  <CInput size='sm' name='nama_bank_pasangan' placeholder='Nama Bank' onChange={onFormChange} />
                </CCol>
                <CCol md='6'>
                  <CInput size='sm' name='no_rekening_pasangan' placeholder='No Rekening' onChange={onFormChange} />
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
                  <CInput size='sm' name='nama_anak' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Tanggal Lahir Anak</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' type='date' name='tgl_lahir_anak' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>No Telp Anak</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' name='no_tlp_anak' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>No KTP Anak</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' name='no_ktp_anak' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>No BPJS Anak</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' name='no_bpjs_anak' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Data Bank Anak</CLabel>
                </CCol>
                <CCol md='3'>
                  <CInput size='sm' name='nama_bank_anak' placeholder='Nama Bank' onChange={onFormChange} />
                </CCol>
                <CCol md='6'>
                  <CInput size='sm' name='no_rekening_anak' placeholder='No Rekening' onChange={onFormChange} />
                </CCol>
              </CFormGroup>
            </CCardBody>
            <CCardFooter style={{display: 'flex', justifyContent: 'space-between'}}>
              <CButton size='sm' color='primary' onClick={handleBack}>
                <CIcon name='cil-ChevronLeft' /> Kembali
              </CButton>
              <CButton size='sm' color='warning' onClick={submitForm}>
                <CIcon name='cil-settings' /> Update
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default DetailPeserta;
