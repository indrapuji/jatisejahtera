import React, { useState, useEffect, useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { CContainer, CRow, CCol, CInput, CFormGroup, CForm, CLabel, CCardFooter, CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import newAlert from '../../../components/NewAlert'

import ComponentToPrint from './ComponentToPrint'
import { useReactToPrint } from 'react-to-print'

const SingleTransfer = () => {
   const { transferId } = useParams()
   const history = useHistory()
   const [detail, setDetail] = useState()
   const [dataPrint, setDataPrint] = useState('')

   const namaPengirim = 'YKP3 JATI SEJAHTERA'
   const alamatPengirim = 'D/A WISMA PERHUTANI, JALAN VILLA NO.1 GATOT SUBROTO, KAV. 17 – 18 JAKARTA SELATAN'

   useEffect(() => {
      getDetail()
      // eslint-disable-next-line
   }, [transferId])

   const getDetail = async () => {
      try {
         const { data } = await axios({
            method: 'GET',
            url: `https://zada.indrapuji.com/v1/jati-transfer/single/${transferId}`,
         })
         setDetail(data.content.data)
      } catch (error) {
         console.log(error)
      }
   }

   const handleBack = () => {
      history.goBack()
   }

   const onFormChange = (event) => {
      const { value, name } = event.target
      setDetail({
         ...detail,
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
      } = detail
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
      await setDataPrint(detail)
      const createData = await axios({
         method: 'POST',
         url: `https://zada.indrapuji.com/v1/jati-transfer/create`,
         data: { data: detail },
         headers: {
            token: localStorage.token,
         },
      })
      console.log(createData)
      handlePrint()
      newAlert({ status: 'success', message: 'Berhasil' })
      history.push('/transfer/data')
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
      <CContainer>
         {detail && (
            <CRow className='justify-content-center'>
               <CCol xs='12' md='12'>
                  <CCard>
                     <CCardHeader>
                        <strong>Data Transfer</strong>
                     </CCardHeader>
                     <CCardBody>
                        <CForm>
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
                                 <CInput custom size='sm' name='telpon_pengirim' value={detail.telpon_pengirim} disabled />
                              </CCol>
                           </CFormGroup>
                           <CFormGroup row>
                              <CCol md='3'>
                                 <CLabel htmlFor='text-input'>
                                    <small>Nasabah - No Rekening</small>
                                 </CLabel>
                              </CCol>
                              <CCol md='9'>
                                 <CInput custom size='sm' name='rekening_pengirim' value={detail.rekening_pengirim} onChange={onFormChange} />
                              </CCol>
                           </CFormGroup>
                           <CFormGroup row>
                              <CCol md='3'>
                                 <CLabel htmlFor='text-input'>
                                    <small>Pusat</small>
                                 </CLabel>
                              </CCol>
                              <CCol md='9'>
                                 <CInput custom size='sm' name='pusat' value={detail.pusat} onChange={onFormChange} />
                              </CCol>
                           </CFormGroup>
                           <CFormGroup row>
                              <CCol md='3'>
                                 <CLabel htmlFor='text-input'>
                                    <small>Cabang</small>
                                 </CLabel>
                              </CCol>
                              <CCol md='9'>
                                 <CInput custom size='sm' name='cabang' value={detail.cabang} onChange={onFormChange} />
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
                                 <CInput custom size='sm' name='nama_penerima' value={detail.nama_penerima} onChange={onFormChange} />
                              </CCol>
                           </CFormGroup>
                           <CFormGroup row>
                              <CCol md='3'>
                                 <CLabel htmlFor='text-input'>
                                    <small>Alamat</small>
                                 </CLabel>
                              </CCol>
                              <CCol md='9'>
                                 <CInput custom size='sm' name='alamat_penerima' value={detail.alamat_penerima} onChange={onFormChange} />
                              </CCol>
                           </CFormGroup>
                           <CFormGroup row>
                              <CCol md='3'>
                                 <CLabel htmlFor='text-input'>
                                    <small>Telepon</small>
                                 </CLabel>
                              </CCol>
                              <CCol md='9'>
                                 <CInput custom size='sm' name='telpon_penerima' value={detail.telpon_penerima} onChange={onFormChange} />
                              </CCol>
                           </CFormGroup>
                           <CFormGroup row>
                              <CCol md='3'>
                                 <CLabel htmlFor='text-input'>
                                    <small>No Rekening</small>
                                 </CLabel>
                              </CCol>
                              <CCol md='9'>
                                 <CInput custom size='sm' name='rekening_penerima' value={detail.rekening_penerima} onChange={onFormChange} />
                              </CCol>
                           </CFormGroup>
                           <CFormGroup row>
                              <CCol md='3'>
                                 <CLabel htmlFor='text-input'>
                                    <small>Bank - Cabang (Kota - Negara)</small>
                                 </CLabel>
                              </CCol>
                              <CCol md='9'>
                                 <CInput custom size='sm' name='cabang_penerima' value={detail.cabang_penerima} onChange={onFormChange} />
                              </CCol>
                           </CFormGroup>
                           <CFormGroup row>
                              <CCol md='3'>
                                 <CLabel htmlFor='text-input'>
                                    <small>amount Dana</small>
                                 </CLabel>
                              </CCol>
                              <CCol md='9'>
                                 <CInput custom size='sm' name='amount' value={detail.amount} onChange={onFormChange} />
                              </CCol>
                           </CFormGroup>
                           <CFormGroup row>
                              <CCol md='3'>
                                 <CLabel htmlFor='text-input'>
                                    <small>Catatan</small>
                                 </CLabel>
                              </CCol>
                              <CCol md='9'>
                                 <CInput custom size='sm' name='alamat_pengirim' value={detail.alamat_pengirim} onChange={onFormChange} />
                              </CCol>
                           </CFormGroup>

                           <CCardFooter>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                 <CButton size='sm' color='info' className='float-right' onClick={handlePrint}>
                                    <CIcon name='cil-scrubber' /> Re-Print
                                 </CButton>
                                 <div>
                                    <CButton size='sm' color='warning' className='float-right' onClick={submitForm}>
                                       <CIcon name='cil-scrubber' /> Simpan {'&'} print
                                    </CButton>
                                    <CButton size='sm' color='primary' className='float-right' onClick={handleBack} style={{ marginRight: 20 }}>
                                       <CIcon name='cil-scrubber' /> Kembali
                                    </CButton>
                                 </div>
                              </div>
                           </CCardFooter>
                        </CForm>
                     </CCardBody>
                  </CCard>
               </CCol>
            </CRow>
         )}
         <ComponentToPrint ref={componentRef} dataPrint={dataPrint ? dataPrint : detail} />
      </CContainer>
   )
}

export default SingleTransfer
