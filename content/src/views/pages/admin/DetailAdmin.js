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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import HostUrl from '../../../utilities/HostUrl';
import Swal from 'sweetalert2';
import NewAlert from 'src/components/NewAlert';

const DetailAdmin = () => {
  const {idAdmin} = useParams();
  const history = useHistory();
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    getDetail();
    // eslint-disable-next-line
  }, []);

  const getDetail = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `${HostUrl}/user/single/${idAdmin}`,
        headers: {
          token: localStorage.token,
        },
      });
      setAdmin(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    history.goBack();
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
            url: `${HostUrl}/user/reset-password/${idAdmin}`,
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
                <span style={{fontSize: 20, fontWeight: 'bold'}}>Data Admin</span>
              </div>
            </CCardHeader>
            <CCardBody>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Nama</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={admin.name} disabled />
                </CCol>
              </CFormGroup>
              {admin.no_induk && (
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel>Nomor Induk</CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput size='sm' value={admin.no_induk} disabled />
                  </CCol>
                </CFormGroup>
              )}
              {admin.email && (
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel>Email</CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput size='sm' value={admin.email} disabled />
                  </CCol>
                </CFormGroup>
              )}
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Username</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={admin.username} disabled />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Password</CLabel>
                </CCol>
                <CCol md='7'>
                  <CInput size='sm' value={admin.password} disabled />
                </CCol>
                <CCol md='2' style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <CButton size='sm' color='warning' onClick={handleReset}>
                    <CIcon name='cil-settings' /> Reset Password
                  </CButton>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Role</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={admin.role} disabled />
                </CCol>
              </CFormGroup>
              {admin.regional && (
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel>Regional</CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput size='sm' value={admin.regional} disabled />
                  </CCol>
                </CFormGroup>
              )}

              {/* <CButton size='sm' color='warning' onClick={handleReset}>
                <CIcon name='cil-settings' /> Reset Password
              </CButton> */}
            </CCardBody>
            <CCardFooter>
              <CButton size='sm' color='primary' onClick={handleBack}>
                <CIcon name='cil-ChevronLeft' /> Kembali
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default DetailAdmin;
