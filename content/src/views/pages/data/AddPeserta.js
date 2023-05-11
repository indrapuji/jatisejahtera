import React, {useState, useEffect} from 'react';
import {
  CContainer,
  CRow,
  CCol,
  CInput,
  CFormGroup,
  CForm,
  CLabel,
  CCardFooter,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CSelect,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {useHistory, useParams} from 'react-router-dom';
import axios from 'axios';
import HostUrl from '../../../utilities/HostUrl';
import newAlert from '../../../components/NewAlert';

const AddAdmin = () => {
  const {nip} = useParams();
  const [formData, setFormData] = useState({
    name: '',
    nip: '',
    email: '',
    username: '',
    password: '',
    role: 'member',
    regional: '',
  });

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const history = useHistory();
  const onFormChange = (event) => {
    const {name, value} = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getData = async () => {
    try {
      const {data} = await axios({
        method: 'POST',
        url: `https://ws.ykp3js.org/cek`,
        data: {
          nip: nip,
          tokenkey:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiJZS1AzSlNXZWIiLCJ0aW1lc3RhbXAiOjE2NjIyNzM1MDB9.7W1lr29HTvAQDYR1FUIRG3mrsyGqTVAbQe9daDeUz8k',
          act: 'klaim',
        },
      });
      setFormData({...formData, nip: nip, name: data.data.Nama});
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = async (e) => {
    console.log(formData);
    try {
      e.preventDefault();
      const {name, nip, email, username, password, role} = formData;
      if (name === '' || nip === '' || email === '' || username === '' || password === '' || role === '') {
        newAlert({status: 'error', message: 'Isi Semua Form'});
        return;
      }
      await axios({
        method: 'POST',
        url: HostUrl + '/user/user-register',
        data: formData,
        headers: {
          token: localStorage.token,
        },
      });
      newAlert({status: 'success', message: 'Berhasil'});
      history.push('/data');
    } catch (error) {
      const {msg} = error.response.data;
      newAlert({status: 'error', message: msg});
    }
  };
  return (
    <CContainer>
      <CRow className='justify-content-center'>
        <CCol xs='12' md='12'>
          <CCard>
            <CCardHeader>
              <strong>Tambah Peserta</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={submitForm}>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel htmlFor='text-input'>
                      <small>Nama</small>
                    </CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput custom size='sm' name='name' value={formData.name} onChange={onFormChange} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel htmlFor='text-input'>
                      <small>NIP</small>
                    </CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput custom size='sm' name='nip' value={formData.nip} onChange={onFormChange} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel htmlFor='text-input'>
                      <small>Email</small>
                    </CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput custom size='sm' name='email' onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel htmlFor='text-input'>
                      <small>Username</small>
                    </CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput custom size='sm' name='username' onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel htmlFor='text-input'>
                      <small>Password</small>
                    </CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput custom size='sm' type='password' name='password' onChange={onFormChange} />
                  </CCol>
                </CFormGroup>

                {localStorage.role === 'super-admin' && (
                  <CFormGroup row>
                    <CCol md='3'>
                      <CLabel htmlFor='text-input'>
                        <small>Regional</small>
                      </CLabel>
                    </CCol>
                    <CCol md='9'>
                      <CSelect id='select' name='regional' size='sm' onChange={onFormChange}>
                        <option value='0'>Silakan Pilih</option>
                        <option value='kantor-pusat'>Kantor Pusat</option>
                        <option value='jawa-barat'>Jawa Barat dan Banten</option>
                        <option value='jawa-tengah'>Jawa Tengah</option>
                        <option value='jawa-timur'>Jawa Timur</option>
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                )}

                <CCardFooter>
                  <CButton type='submit' size='sm' color='primary' className='float-right' onClick={submitForm}>
                    <CIcon name='cil-scrubber' /> Simpan
                  </CButton>
                </CCardFooter>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default AddAdmin;
