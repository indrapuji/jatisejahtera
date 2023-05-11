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
  CSelect,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {useHistory, useParams} from 'react-router-dom';
import axios from 'axios';
import HostUrl from '../../../utilities/HostUrl';
import newAlert from '../../../components/NewAlert';
import {decrypt} from 'src/utilities/RandomLink';

const RequestClaim = () => {
  const {username} = useParams();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState();
  const [claimCategory, setClaimCategory] = useState('');

  const history = useHistory();

  const onFormChange = (event) => {
    const {name, files} = event.target;
    setFormData({...formData, [name]: files[0]});
  };

  const onClaimChange = (event) => {
    setClaimCategory(event.target.value);
  };
  const submitForm = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const newFormData = new FormData();
      for (let keys in formData) {
        newFormData.append(`${keys}`, formData[keys]);
      }

      await axios({
        method: 'POST',
        url: HostUrl + `/claim/${claimCategory}/${decrypt(username)}`,
        data: newFormData,
        headers: {
          token: localStorage.token,
        },
      });
      setLoading(false);
      newAlert({status: 'success', message: 'Berhasil'});
      history.push('/data/claim');
    } catch (error) {
      setLoading(false);
      const {msg} = error.response;
      newAlert({status: 'error', message: msg});
      console.log(error.response);
    }
  };
  return (
    <CContainer>
      <CRow className='justify-content-center'>
        <CCol xs='12' md='12'>
          <CCard>
            <CCardHeader>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <strong>Pengajuan Claim</strong>
                {loading ? <CSpinner /> : <div />}
              </div>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={submitForm}>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel htmlFor='text-input'>
                      <small>Jenis Claim</small>
                    </CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CSelect id='select' name='regional' size='sm' onChange={onClaimChange}>
                      <option value=''>Silakan Pilih</option>
                      <option value='kematian'>Claim Kematian</option>
                      <option value='manfaat'>Claim Manfaat</option>
                      <option value='kesehatan'>Claim Kesehatan</option>
                      <option value='kacamata'>Claim Kacamata</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>

                {claimCategory === 'kematian' && (
                  <CFormGroup row>
                    <CCol md='3'>
                      <CLabel htmlFor='text-input'>
                        <small>Surat Permohonan Ahli Waris</small>
                      </CLabel>
                    </CCol>
                    <CCol md='9'>
                      <CInputFile size='sm' name='permohonan_ahli_waris' onChange={onFormChange} />
                    </CCol>
                  </CFormGroup>
                )}

                {claimCategory === 'manfaat' && (
                  <CFormGroup row>
                    <CCol md='3'>
                      <CLabel htmlFor='text-input'>
                        <small>Surat permohonan pensiunan perum perhutani</small>
                      </CLabel>
                    </CCol>
                    <CCol md='9'>
                      <CInputFile size='sm' name='permohonan_pensiunan' onChange={onFormChange} />
                    </CCol>
                  </CFormGroup>
                )}

                {claimCategory === 'manfaat' && (
                  <CFormGroup row>
                    <CCol md='3'>
                      <CLabel htmlFor='text-input'>
                        <small>Surat pernyataan dari pensiunan perum perhutani</small>
                      </CLabel>
                    </CCol>
                    <CCol md='9'>
                      <CInputFile size='sm' name='pernyataan_dari_pensiunan' onChange={onFormChange} />
                    </CCol>
                  </CFormGroup>
                )}

                {claimCategory === 'kematian' && (
                  <CFormGroup row>
                    <CCol md='3'>
                      <CLabel htmlFor='text-input'>
                        <small>Surat keterangan meninggal dunia dari lurah</small>
                      </CLabel>
                    </CCol>
                    <CCol md='9'>
                      <CInputFile size='sm' name='keterangan_meninggal_dunia_lurah' onChange={onFormChange} />
                    </CCol>
                  </CFormGroup>
                )}

                {claimCategory === 'kematian' && (
                  <CFormGroup row>
                    <CCol md='3'>
                      <CLabel htmlFor='text-input'>
                        <small>Surat keterangan meninggal dari RS apabila peserta meninggal nya di Rumah Sakit</small>
                      </CLabel>
                    </CCol>
                    <CCol md='9'>
                      <CInputFile size='sm' name='keterangan_meninggal_dunia_rumah_sakit' onChange={onFormChange} />
                    </CCol>
                  </CFormGroup>
                )}

                {claimCategory === 'kematian' && (
                  <CFormGroup row>
                    <CCol md='3'>
                      <CLabel htmlFor='text-input'>
                        <small>
                          Surat Keterangan dari Kepolisian apabila peserta meninggal dunia akibat kecelakaan
                        </small>
                      </CLabel>
                    </CCol>
                    <CCol md='9'>
                      <CInputFile size='sm' name='keterangan_kepolisian' onChange={onFormChange} />
                    </CCol>
                  </CFormGroup>
                )}

                {claimCategory === 'kematian' && (
                  <CFormGroup row>
                    <CCol md='3'>
                      <CLabel htmlFor='text-input'>
                        <small>Photo Copy kartu keluarga</small>
                      </CLabel>
                    </CCol>
                    <CCol md='9'>
                      <CInputFile size='sm' name='fotokopi_kk' onChange={onFormChange} />
                    </CCol>
                  </CFormGroup>
                )}

                {claimCategory === 'kesehatan' && (
                  <CFormGroup row>
                    <CCol md='3'>
                      <CLabel htmlFor='text-input'>
                        <small>Surat permohonan bantuan biaya rawat inap dari pensiunan</small>
                      </CLabel>
                    </CCol>
                    <CCol md='9'>
                      <CInputFile size='sm' name='surat_permohonan_bantuan_biaya' onChange={onFormChange} />
                    </CCol>
                  </CFormGroup>
                )}

                {claimCategory === 'kesehatan' && (
                  <CFormGroup row>
                    <CCol md='3'>
                      <CLabel htmlFor='text-input'>
                        <small>Kuitansi asli dari Rumah Sakit pensiunan di rawat</small>
                      </CLabel>
                    </CCol>
                    <CCol md='9'>
                      <CInputFile size='sm' name='kuitansi_asli_rs' onChange={onFormChange} />
                    </CCol>
                  </CFormGroup>
                )}

                {claimCategory === 'kesehatan' && (
                  <CFormGroup row>
                    <CCol md='3'>
                      <CLabel htmlFor='text-input'>
                        <small>Surat keterangan sakit yang di tanda tangani oleh rumah sakit</small>
                      </CLabel>
                    </CCol>
                    <CCol md='9'>
                      <CInputFile size='sm' name='surat_keterangan_rs' onChange={onFormChange} />
                    </CCol>
                  </CFormGroup>
                )}

                {claimCategory === 'kacamata' && (
                  <CFormGroup row>
                    <CCol md='3'>
                      <CLabel htmlFor='text-input'>
                        <small>Fotocopy KTP</small>
                      </CLabel>
                    </CCol>
                    <CCol md='9'>
                      <CInputFile size='sm' name='fotokopi_ktp' onChange={onFormChange} />
                    </CCol>
                  </CFormGroup>
                )}

                {claimCategory !== '' && (
                  <>
                    <CFormGroup row>
                      <CCol md='3'>
                        <CLabel htmlFor='text-input'>
                          <small>Photo copy kartu peserta</small>
                        </CLabel>
                      </CCol>
                      <CCol md='9'>
                        <CInputFile size='sm' name='fotokopi_kp' onChange={onFormChange} />
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md='3'>
                        <CLabel htmlFor='text-input'>
                          <small>Photo Copy Sk.Pensiun</small>
                        </CLabel>
                      </CCol>
                      <CCol md='9'>
                        <CInputFile size='sm' name='fotokopi_sk_pensiun' onChange={onFormChange} />
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md='3'>
                        <CLabel htmlFor='text-input'>
                          <small>Foto selfie dangan memegang KTP</small>
                        </CLabel>
                      </CCol>
                      <CCol md='9'>
                        <CInputFile size='sm' name='foto_selfie' onChange={onFormChange} />
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md='3'>
                        <CLabel htmlFor='text-input'>
                          <small>All In One</small>
                        </CLabel>
                      </CCol>
                      <CCol md='9'>
                        <CInputFile size='sm' name='all_in_one' onChange={onFormChange} />
                      </CCol>
                    </CFormGroup>
                  </>
                )}

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

export default RequestClaim;
