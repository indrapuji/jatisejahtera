import React, {useState} from 'react';
import {
  CContainer,
  CRow,
  CCol,
  CFormGroup,
  CForm,
  CLabel,
  CCardFooter,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CInputFile,
  CSpinner,
  CInput,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {useHistory, useParams} from 'react-router-dom';
import axios from 'axios';
import HostUrl from '../../../utilities/HostUrl';
import newAlert from '../../../components/NewAlert';
import {decrypt} from 'src/utilities/RandomLink';

const UploadLampiran = () => {
  const {claimId, userId, kategoriClaim} = useParams();
  const [formData, setFormData] = useState({
    bukti_tf: '',
    nominal: 0,
    id: claimId,
    userId: userId,
    kategori: decrypt(kategoriClaim),
  });
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const onFormChange = (event) => {
    const {name, value, files} = event.target;
    if (files) {
      setFormData({...formData, [name]: files[0]});
    } else {
      setFormData({...formData, [name]: value});
    }
  };

  const submitForm = async (e) => {
    try {
      e.preventDefault();

      const {bukti_tf, nominal} = formData;
      if (bukti_tf === '' || nominal === 0) {
        newAlert({status: 'error', message: 'Sertakan Lampiran & nominal'});
        return;
      }
      setLoading(true);
      const newFormData = new FormData();
      for (let keys in formData) {
        newFormData.append(`${keys}`, formData[keys]);
      }

      const {data} = await axios({
        method: 'POST',
        url: HostUrl + '/claim/approve',
        data: newFormData,
        headers: {
          token: localStorage.token,
        },
      });
      console.log(data);
      setLoading(false);
      newAlert({status: 'success', message: 'Berhasil'});
      history.push('/data/claim');
    } catch (error) {
      setLoading(false);
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
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <strong>Upload Lampiran</strong>
                {loading ? <CSpinner /> : <div />}
              </div>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={submitForm}>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel htmlFor='text-input'>
                      <small>Lampiran</small>
                    </CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInputFile size='sm' name='bukti_tf' onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel>
                      <small>Nominal</small>
                    </CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput size='sm' type='number' name='nominal' onChange={onFormChange} />
                  </CCol>
                </CFormGroup>

                <CCardFooter>
                  <CButton type='submit' size='sm' color='primary' className='float-right' onClick={submitForm}>
                    <CIcon name='cil-scrubber' /> Kirim
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

export default UploadLampiran;
