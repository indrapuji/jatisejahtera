import React, {useState} from 'react';
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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import HostUrl from '../../../utilities/HostUrl';
import newAlert from '../../../components/NewAlert';

const ChangePassword = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    old_password: '',
    new_password: '',
    validate: '',
  });

  const onFormChange = (event) => {
    const {name, value} = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const submitForm = async (e) => {
    try {
      e.preventDefault();
      const {old_password, new_password, validate} = formData;
      if (old_password === '' || new_password === '' || validate === '') {
        newAlert({status: 'error', message: 'Isi Semua Form'});
        return;
      }
      if (new_password !== validate) {
        newAlert({status: 'error', message: 'Password Tidak Sama'});
        return;
      }
      await axios({
        method: 'PUT',
        url: HostUrl + '/user/update-password',
        data: {old_password, new_password},
        headers: {
          token: localStorage.token,
        },
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
              <strong>Ganti Password</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={submitForm}>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel htmlFor='text-input'>
                      <small>Old Password</small>
                    </CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput custom size='sm' name='old_password' type='password' onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel htmlFor='text-input'>
                      <small>New Password</small>
                    </CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput custom size='sm' name='new_password' type='password' onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel htmlFor='text-input'>
                      <small>Ulangi Password</small>
                    </CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput custom size='sm' name='validate' type='password' onChange={onFormChange} />
                  </CCol>
                </CFormGroup>

                <CCardFooter>
                  <CButton type='submit' size='sm' color='success' className='float-right' onClick={submitForm}>
                    <CIcon name='cil-scrubber' /> Ganti Password
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

export default ChangePassword;
