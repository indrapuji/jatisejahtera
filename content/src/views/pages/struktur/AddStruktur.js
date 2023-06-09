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
  CInputFile,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import HostUrl from '../../../utilities/HostUrl';
import newAlert from '../../../components/NewAlert';

const AddStruktur = () => {
  const [formData, setFormData] = useState({
    image_url: '',
    category: 'struktur',
    title: '',
    subtitle: '',
    status: true,
  });

  const history = useHistory();

  const onFormChange = (event) => {
    const {name, value, files} = event.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const submitForm = async (e) => {
    try {
      e.preventDefault();
      const {image_url, title, desc} = formData;
      if (image_url === '' || title === '' || desc === '') {
        newAlert({status: 'error', message: 'Isi Semua Form'});
        return;
      }
      const newFormData = new FormData();
      for (let keys in formData) {
        newFormData.append(`${keys}`, formData[keys]);
      }

      const {data} = await axios({
        method: 'GET',
        url: HostUrl + '/content?category=struktur',
      });

      const newData = data.filter((item) => item.status === true);
      if (newData.length > 0) {
        newAlert({status: 'error', message: 'Tidak Boleh lebih dari 1 struktur aktif'});
        return;
      }
      await axios({
        method: 'POST',
        url: HostUrl + '/content/create',
        data: newFormData,
      });
      newAlert({status: 'success', message: 'Berhasil'});
      history.push('/struktur');
    } catch (error) {
      const {msg} = error.response.data;
      newAlert({status: 'error', message: msg});
      console.log(error.response.data);
    }
  };
  return (
    <CContainer>
      <CRow className='justify-content-center'>
        <CCol xs='12' md='12'>
          <CCard>
            <CCardHeader>
              <strong>Tambah Struktur</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={submitForm}>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel htmlFor='text-input'>
                      <small>Title</small>
                    </CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput custom size='sm' name='title' onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel htmlFor='text-input'>
                      <small>image</small>
                    </CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInputFile size='sm' name='image_url' onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
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

export default AddStruktur;
