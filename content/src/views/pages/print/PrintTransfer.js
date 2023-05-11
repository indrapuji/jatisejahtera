import React, { useState, useRef } from 'react'
import { CContainer, CRow, CCol, CInput, CFormGroup, CLabel, CCardFooter, CButton, CCard, CCardBody, CCardHeader, CImg, CCardGroup } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import newAlert from '../../../components/NewAlert'
import { useReactToPrint } from 'react-to-print'
import ComponentToPrint from './ComponentToPrint'
// import formatRupiah from '../../../utilities/FormatRupiah'
// import numberToWords from '../../../utilities/NumberToWords'
import BCA from '../../../assets/images/BCA.png'
import BRI from '../../../assets/images/BRI.png'
import BTN from '../../../assets/images/BTN.png'
import MANDIRI from '../../../assets/images/MANDIRI.png'
import BNI from '../../../assets/images/BNI.png'
import axios from 'axios'

const AddGalery = () => {
   const [showChoose, setShowChoose] = useState(true)
   const [dataPrint, setDataPrint] = useState('')
   const [formData, setFormData] = useState({
      nama_pengirim: 'Indra',
      alamat_pengirim: '',
      telpon_pengirim: '021-5252983',
      rekening_pengirim: '',
      pusat: '',
      cabang: '',
      nama_penerima: '',
      alamat_penerima: '',
      telpon_penerima: '',
      rekening_penerima: '',
      cabang_penerima: '',
      amount: '',
      template: '',
   })
   const namaPengirim = 'YKP3 JATI SEJAHTERA'
   const alamatPengirim = 'D/A WISMA PERHUTANI, JALAN VILLA NO.1 GATOT SUBROTO, KAV. 17 – 18 JAKARTA SELATAN'

   const onFormChange = (event) => {
      const { name, value } = event.target
      console.log('name', name)
      console.log('value', value)
      setFormData({
         ...formData,
         [name]: value,
      })
   }

   const submitForm = async (e) => {
      e.preventDefault()
      const {
         nama_pengirim,
         alamat_pengirim,
         telpon_pengirim,
         rekening_pengirim,
         pusat,
         cabang,
         nama_penerima,
         alamat_penerima,
         telpon_penerima,
         rekening_penerima,
         cabang_penerima,
         amount,
      } = formData
      if (
         nama_pengirim === '' ||
         alamat_pengirim === '' ||
         telpon_pengirim === '' ||
         rekening_pengirim === '' ||
         pusat === '' ||
         cabang === '' ||
         nama_penerima === '' ||
         alamat_penerima === '' ||
         telpon_penerima === '' ||
         rekening_penerima === '' ||
         cabang_penerima === '' ||
         amount === ''
      ) {
         newAlert({ status: 'error', message: 'Isi Semua Form' })
         return
      }
      await setDataPrint(formData)
      const createData = await axios({
         method: 'POST',
         url: `https://zada.indrapuji.com/v1/jati-transfer/create`,
         data: { data: formData },
         headers: {
            token: localStorage.token,
         },
      })
      console.log(createData)
      handlePrint()
      newAlert({ status: 'success', message: 'Berhasil' })
   }

   const handleChoose = (blanko) => {
      setShowChoose(false)
      setFormData({ ...formData, template: blanko })
   }

   const componentRef = useRef()

   const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      pageStyle: `@page {
         size: legal;
         margin: 0px;
      }

      @media all {
         .pagebreak {
         display: none;
         }
      }

      @media print {
         .pagebreak {
         display: block;
         page-break-before: always;
         page-break-after: always;
         }
      }`,
   })
   return (
      <div className='c-app c-default-layout flex-row align-items-center'>
         <CContainer>
            {showChoose ? (
               <CCardGroup>
                  <CCard>
                     <CCardHeader>
                        <div className='text-center h3 text-primary'>
                           <strong>PILIH BLANKO</strong>
                        </div>
                     </CCardHeader>
                     <CCardBody>
                        <CRow>
                           <CCol xs='12' style={{ border: '1px solid black', marginBottom: 10 }}>
                              <CButton block onClick={() => handleChoose('btn')}>
                                 <CImg src={BTN} style={{ width: 100, height: 100, objectFit: 'contain' }} />
                              </CButton>
                           </CCol>
                           <CCol xs='12' style={{ border: '1px solid black', marginBottom: 10 }}>
                              <CButton block onClick={() => handleChoose('bri')}>
                                 <CImg src={BRI} style={{ width: 100, height: 100, objectFit: 'contain' }} />
                              </CButton>
                           </CCol>
                           <CCol xs='12' style={{ border: '1px solid black', marginBottom: 10 }}>
                              <CButton block onClick={() => handleChoose('bca')}>
                                 <CImg src={BCA} style={{ width: 100, height: 100, objectFit: 'contain' }} />
                              </CButton>
                           </CCol>
                           <CCol xs='12' style={{ border: '1px solid black', marginBottom: 10 }}>
                              <CButton block onClick={() => handleChoose('bni')}>
                                 <CImg src={BNI} style={{ width: 100, height: 100, objectFit: 'contain' }} />
                              </CButton>
                           </CCol>
                           <CCol xs='12' style={{ border: '1px solid black', marginBottom: 10 }}>
                              <CButton block onClick={() => handleChoose('mandiri')}>
                                 <CImg src={MANDIRI} style={{ width: 100, height: 100, objectFit: 'contain' }} />
                              </CButton>
                           </CCol>
                        </CRow>
                     </CCardBody>
                  </CCard>
               </CCardGroup>
            ) : (
               <CRow className='justify-content-center'>
                  <CCol xs='12' md='12'>
                     <CCard>
                        <CCardHeader>
                           <strong>Data Transfer</strong>
                        </CCardHeader>
                        <CCardBody>
                           <CLabel htmlFor='text-input'>
                              <strong>Detail Pengirim</strong>
                           </CLabel>
                           <CFormGroup row>
                              <CCol md='3'>
                                 <CLabel htmlFor='text-input'>
                                    <small>Nama</small>
                                 </CLabel>
                              </CCol>
                              <CCol md='9'>
                                 <CInput custom size='sm' value={namaPengirim} disabled />
                              </CCol>
                           </CFormGroup>
                           <CFormGroup row>
                              <CCol md='3'>
                                 <CLabel htmlFor='text-input'>
                                    <small>Alamat</small>
                                 </CLabel>
                              </CCol>
                              <CCol md='9'>
                                 <CInput custom size='sm' value={alamatPengirim} disabled />
                              </CCol>
                           </CFormGroup>
                           <CFormGroup row>
                              <CCol md='3'>
                                 <CLabel htmlFor='text-input'>
                                    <small>Telepon</small>
                                 </CLabel>
                              </CCol>
                              <CCol md='9'>
                                 <CInput custom size='sm' value={formData.telpon_pengirim} disabled onChange={onFormChange} />
                              </CCol>
                           </CFormGroup>
                           <CFormGroup row>
                              <CCol md='3'>
                                 <CLabel htmlFor='text-input'>
                                    <small>Nasabah - No Rekening</small>
                                 </CLabel>
                              </CCol>
                              <CCol md='9'>
                                 <CInput custom size='sm' name='rekening_pengirim' onChange={onFormChange} />
                              </CCol>
                           </CFormGroup>
                           <CFormGroup row>
                              <CCol md='3'>
                                 <CLabel htmlFor='text-input'>
                                    <small>Pusat</small>
                                 </CLabel>
                              </CCol>
                              <CCol md='9'>
                                 <CInput custom size='sm' name='pusat' onChange={onFormChange} />
                              </CCol>
                           </CFormGroup>
                           <CFormGroup row>
                              <CCol md='3'>
                                 <CLabel htmlFor='text-input'>
                                    <small>Cabang</small>
                                 </CLabel>
                              </CCol>
                              <CCol md='9'>
                                 <CInput custom size='sm' name='cabang' onChange={onFormChange} />
                              </CCol>
                           </CFormGroup>
                           <CFormGroup row>
                              <CCol md='3'>
                                 <CLabel htmlFor='text-input'>
                                    <small>KC / KCP / KK</small>
                                 </CLabel>
                              </CCol>
                              <CCol md='9'>
                                 <CInput custom size='sm' name='nama_pengirim' onChange={onFormChange} />
                              </CCol>
                           </CFormGroup>
                           <br />
                           <CLabel htmlFor='text-input'>
                              <strong>Detail Penerima</strong>
                           </CLabel>
                           <CFormGroup row>
                              <CCol md='3'>
                                 <CLabel htmlFor='text-input'>
                                    <small>Nama</small>
                                 </CLabel>
                              </CCol>
                              <CCol md='9'>
                                 <CInput custom size='sm' name='nama_penerima' onChange={onFormChange} />
                              </CCol>
                           </CFormGroup>
                           <CFormGroup row>
                              <CCol md='3'>
                                 <CLabel htmlFor='text-input'>
                                    <small>Alamat</small>
                                 </CLabel>
                              </CCol>
                              <CCol md='9'>
                                 <CInput custom size='sm' name='alamat_penerima' onChange={onFormChange} />
                              </CCol>
                           </CFormGroup>
                           <CFormGroup row>
                              <CCol md='3'>
                                 <CLabel htmlFor='text-input'>
                                    <small>Telepon</small>
                                 </CLabel>
                              </CCol>
                              <CCol md='9'>
                                 <CInput custom size='sm' name='telpon_penerima' onChange={onFormChange} />
                              </CCol>
                           </CFormGroup>
                           <CFormGroup row>
                              <CCol md='3'>
                                 <CLabel htmlFor='text-input'>
                                    <small>No Rekening</small>
                                 </CLabel>
                              </CCol>
                              <CCol md='9'>
                                 <CInput custom size='sm' name='rekening_penerima' onChange={onFormChange} />
                              </CCol>
                           </CFormGroup>
                           <CFormGroup row>
                              <CCol md='3'>
                                 <CLabel htmlFor='text-input'>
                                    <small>Bank - Cabang (Kota - Negara)</small>
                                 </CLabel>
                              </CCol>
                              <CCol md='9'>
                                 <CInput custom size='sm' name='cabang_penerima' onChange={onFormChange} />
                              </CCol>
                           </CFormGroup>
                           <br />
                           <CFormGroup row>
                              <CCol md='3'>
                                 <CLabel htmlFor='text-input'>
                                    <small>Amount Dana</small>
                                 </CLabel>
                              </CCol>
                              <CCol md='9'>
                                 <CInput custom size='sm' name='amount' onChange={onFormChange} />
                              </CCol>
                           </CFormGroup>
                           <br />
                           <CFormGroup row>
                              <CCol md='3'>
                                 <CLabel htmlFor='text-input'>
                                    <small>Catatan</small>
                                 </CLabel>
                              </CCol>
                              <CCol md='9'>
                                 <CInput custom size='sm' name='alamat_pengirim' onChange={onFormChange} />
                              </CCol>
                           </CFormGroup>

                           <CCardFooter>
                              <CButton type='submit' size='sm' color='primary' className='float-right' onClick={submitForm}>
                                 <CIcon name='cil-scrubber' /> Print
                              </CButton>
                           </CCardFooter>
                        </CCardBody>
                     </CCard>
                  </CCol>
               </CRow>
            )}
            <ComponentToPrint ref={componentRef} dataPrint={dataPrint} />
         </CContainer>
      </div>
   )
}

export default AddGalery
