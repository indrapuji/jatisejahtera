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
  CTextarea,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import HostUrl from '../../../utilities/HostUrl';

const DetailPesan = () => {
  const {idPesan} = useParams();
  const history = useHistory();
  const [pesan, setPesan] = useState([]);

  useEffect(() => {
    getDetail();
    // eslint-disable-next-line
  }, []);

  const getDetail = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `${HostUrl}/contact/single/${idPesan}`,
      });
      setPesan(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = async () => {
    try {
      await axios({
        method: 'PUT',
        url: `${HostUrl}/contact/read/${idPesan}`,
      });
      history.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CContainer>
      <CRow className='justify-content-center'>
        <CCol xs='12' md='12'>
          <CCard>
            <CCardHeader>
              <div>
                <span style={{fontSize: 20, fontWeight: 'bold'}}>Detail Pesan</span>
              </div>
            </CCardHeader>
            <CCardBody>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Nama</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={pesan.nama} disabled />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Email</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={pesan.email} disabled />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Nomor Telp</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={pesan.telp} disabled />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Alamat</CLabel>
                </CCol>
                <CCol md='9'>
                  <CInput size='sm' value={pesan.alamat} disabled />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md='3'>
                  <CLabel>Pesan</CLabel>
                </CCol>
                <CCol md='9'>
                  <CTextarea rows={5} size='sm' value={pesan.pesan} disabled />
                </CCol>
              </CFormGroup>
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

export default DetailPesan;
