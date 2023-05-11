import React, {
  useState,
  // useEffect
} from 'react';
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
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import HostUrl from '../../../utilities/HostUrl';
import newAlert from '../../../components/NewAlert';

const AddAdmin = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    role: '',
    regional: '',
  });

  const [show, setShow] = useState(false);

  const history = useHistory();
  const onFormChange = (event) => {
    const {name, value} = event.target;
    if (name === 'role') {
      if (value === 'admin') {
        setShow(true);
        setFormData({
          ...formData,
          [name]: value,
        });
      } else {
        setShow(false);
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const submitForm = async (e) => {
    console.log(formData);
    try {
      e.preventDefault();
      const {name, username, password, role} = formData;
      if (name === '' || username === '' || password === '' || role === '') {
        newAlert({status: 'error', message: 'Isi Semua Form'});
        return;
      }
      await axios({
        method: 'POST',
        url: HostUrl + '/user/admin-register',
        data: formData,
      });
      newAlert({status: 'success', message: 'Berhasil'});
      history.push('/admin');
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
              <strong>Tambah Admin</strong>
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
                    <CInput custom size='sm' name='name' onChange={onFormChange} />
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
                    <CInput custom size='sm' name='password' onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel htmlFor='text-input'>
                      <small>Role</small>
                    </CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CSelect id='select' name='role' size='sm' onChange={onFormChange}>
                      <option value='0'>Silakan Pilih</option>
                      <option value='super-admin'>Super Admin</option>
                      <option value='admin'>admin</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
                {show && (
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
