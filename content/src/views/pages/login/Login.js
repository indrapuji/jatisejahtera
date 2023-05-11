import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import newAlert from '../../../components/NewAlert';
import axios from 'axios';
import HostUrl from '../../../utilities/HostUrl';

const Login = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const onFormChange = (event) => {
    const {name, value} = event.target;
    setFormData({...formData, [name]: value});
  };

  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(formData);
      const {data} = await axios({
        method: 'POST',
        url: HostUrl + '/user/login',
        data: formData,
      });
      if (data.role === 'member') return newAlert({status: 'error', message: 'Not Allowed'});
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('role', data.role);
      newAlert({status: 'success', message: 'Berhasil'});
      history.push('/data');
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
      newAlert({status: 'error', message: msg});
    }
  };

  return (
    <div className='c-app c-default-layout flex-row align-items-center'>
      <CContainer>
        <CRow className='justify-content-center'>
          <CCol md='5'>
            <CCardGroup>
              <CCard className='p-4'>
                <h1>Login</h1>
                <p className='text-muted'>Sign In to your account</p>

                <CCardBody>
                  <CForm>
                    <CInputGroup className='mb-3'>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name='cil-user' />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type='text'
                        placeholder='username'
                        autoComplete='username'
                        name='username'
                        onChange={onFormChange}
                      />
                    </CInputGroup>
                    <CInputGroup className='mb-3'>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name='cil-lock-locked' />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type='password'
                        placeholder='Password'
                        autoComplete='current-password'
                        name='password'
                        onChange={onFormChange}
                      />
                    </CInputGroup>
                    <CButton color='primary' size='lg' block onClick={onFormSubmit}>
                      Login
                    </CButton>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
