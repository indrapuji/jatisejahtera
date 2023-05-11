import React, { useState, useRef } from 'react'
import { CContainer, CRow, CCol, CInput, CFormGroup, CForm, CLabel, CCardFooter, CButton, CCard, CCardBody, CCardHeader, CImg, CInputRadio } from '@coreui/react'
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
import axios from 'axios'

const AddGalery = () => {
   // const tanggal_sekarang = new Date()
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
      // <CContainer>
      //    <CRow className='justify-content-center'>
      //       {!dataPrint ? (
      //          <CCol xs='12' md='12'>
      //             <CCard>
      //                <CCardHeader>
      //                   <strong>Data Transfer</strong>
      //                </CCardHeader>
      //                <CCardBody>
      //                   <CForm onSubmit={submitForm}>
      //                      <CFormGroup row>
      //                         <CCol md='3'>template</CCol>
      //                         <CCol md='2' style={{ marginLeft: 20 }}>
      //                            <CInputRadio name='template' value='BTN' defaultChecked onChange={onFormChange} />
      //                            <CImg src={BTN} style={{ width: 100, height: 50, objectFit: 'contain' }} />
      //                         </CCol>
      //                         <CCol md='2'>
      //                            <CInputRadio name='template' value='BRI' onChange={onFormChange} />
      //                            <CImg src={BRI} style={{ width: 100, height: 50, objectFit: 'contain' }} />
      //                         </CCol>
      //                         <CCol md='2'>
      //                            <CInputRadio name='template' value='BCA' onChange={onFormChange} />
      //                            <CImg src={BCA} style={{ width: 100, height: 50, objectFit: 'contain' }} />
      //                         </CCol>
      //                         <CCol md='2'>
      //                            <CInputRadio name='template' value='MANDIRI' onChange={onFormChange} />
      //                            <CImg src={MANDIRI} style={{ width: 100, height: 50, objectFit: 'contain' }} />
      //                         </CCol>
      //                      </CFormGroup>
      //                      <CLabel htmlFor='text-input'>
      //                         <strong>Detail Pengirim</strong>
      //                      </CLabel>
      //                      <CFormGroup row>
      //                         <CCol md='3'>
      //                            <CLabel htmlFor='text-input'>
      //                               <small>Nama</small>
      //                            </CLabel>
      //                         </CCol>
      //                         <CCol md='9'>
      //                            <CInput custom size='sm' value={namaPengirim} disabled onChange={onFormChange} />
      //                         </CCol>
      //                      </CFormGroup>
      //                      <CFormGroup row>
      //                         <CCol md='3'>
      //                            <CLabel htmlFor='text-input'>
      //                               <small>Alamat</small>
      //                            </CLabel>
      //                         </CCol>
      //                         <CCol md='9'>
      //                            <CInput custom size='sm' value={alamatPengirim} disabled onChange={onFormChange} />
      //                         </CCol>
      //                      </CFormGroup>
      //                      <CFormGroup row>
      //                         <CCol md='3'>
      //                            <CLabel htmlFor='text-input'>
      //                               <small>Telepon</small>
      //                            </CLabel>
      //                         </CCol>
      //                         <CCol md='9'>
      //                            <CInput custom size='sm' value={formData.telpon_pengirim} disabled onChange={onFormChange} />
      //                         </CCol>
      //                      </CFormGroup>
      //                      <CFormGroup row>
      //                         <CCol md='3'>
      //                            <CLabel htmlFor='text-input'>
      //                               <small>Nasabah - No Rekening</small>
      //                            </CLabel>
      //                         </CCol>
      //                         <CCol md='9'>
      //                            <CInput custom size='sm' name='rekening_pengirim' onChange={onFormChange} />
      //                         </CCol>
      //                      </CFormGroup>
      //                      <CFormGroup row>
      //                         <CCol md='3'>
      //                            <CLabel htmlFor='text-input'>
      //                               <small>Pusat</small>
      //                            </CLabel>
      //                         </CCol>
      //                         <CCol md='9'>
      //                            <CInput custom size='sm' name='pusat' onChange={onFormChange} />
      //                         </CCol>
      //                      </CFormGroup>
      //                      <CFormGroup row>
      //                         <CCol md='3'>
      //                            <CLabel htmlFor='text-input'>
      //                               <small>Cabang</small>
      //                            </CLabel>
      //                         </CCol>
      //                         <CCol md='9'>
      //                            <CInput custom size='sm' name='cabang' onChange={onFormChange} />
      //                         </CCol>
      //                      </CFormGroup>
      //                      <br />
      //                      <CLabel htmlFor='text-input'>
      //                         <strong>Detail Penerima</strong>
      //                      </CLabel>
      //                      <CFormGroup row>
      //                         <CCol md='3'>
      //                            <CLabel htmlFor='text-input'>
      //                               <small>Nama</small>
      //                            </CLabel>
      //                         </CCol>
      //                         <CCol md='9'>
      //                            <CInput custom size='sm' name='nama_penerima' onChange={onFormChange} />
      //                         </CCol>
      //                      </CFormGroup>
      //                      <CFormGroup row>
      //                         <CCol md='3'>
      //                            <CLabel htmlFor='text-input'>
      //                               <small>Alamat</small>
      //                            </CLabel>
      //                         </CCol>
      //                         <CCol md='9'>
      //                            <CInput custom size='sm' name='alamat_penerima' onChange={onFormChange} />
      //                         </CCol>
      //                      </CFormGroup>
      //                      <CFormGroup row>
      //                         <CCol md='3'>
      //                            <CLabel htmlFor='text-input'>
      //                               <small>Telepon</small>
      //                            </CLabel>
      //                         </CCol>
      //                         <CCol md='9'>
      //                            <CInput custom size='sm' name='telpon_penerima' onChange={onFormChange} />
      //                         </CCol>
      //                      </CFormGroup>
      //                      <CFormGroup row>
      //                         <CCol md='3'>
      //                            <CLabel htmlFor='text-input'>
      //                               <small>No Rekening</small>
      //                            </CLabel>
      //                         </CCol>
      //                         <CCol md='9'>
      //                            <CInput custom size='sm' name='rekening_penerima' onChange={onFormChange} />
      //                         </CCol>
      //                      </CFormGroup>
      //                      <CFormGroup row>
      //                         <CCol md='3'>
      //                            <CLabel htmlFor='text-input'>
      //                               <small>Bank - Cabang (Kota - Negara)</small>
      //                            </CLabel>
      //                         </CCol>
      //                         <CCol md='9'>
      //                            <CInput custom size='sm' name='cabang_penerima' onChange={onFormChange} />
      //                         </CCol>
      //                      </CFormGroup>
      //                      <br />
      //                      <CFormGroup row>
      //                         <CCol md='3'>
      //                            <CLabel htmlFor='text-input'>
      //                               <small>amount Dana</small>
      //                            </CLabel>
      //                         </CCol>
      //                         <CCol md='9'>
      //                            <CInput custom size='sm' name='amount' onChange={onFormChange} />
      //                         </CCol>
      //                      </CFormGroup>

      //                      <CCardFooter>
      //                         <CButton type='submit' size='sm' color='primary' className='float-right' onClick={submitForm}>
      //                            <CIcon name='cil-scrubber' /> Prosess
      //                         </CButton>
      //                      </CCardFooter>
      //                   </CForm>
      //                </CCardBody>
      //             </CCard>
      //          </CCol>
      //       ) : (
      //          <CCol xs='12' md='12'>
      //             <CCard>
      //                <CCardHeader>
      //                   <strong>Preview</strong>
      //                </CCardHeader>
      //                <CCardBody>
      //                   <table
      //                      style={{
      //                         borderWidth: 1,
      //                         borderStyle: 'solid',
      //                         borderColor: 'black',
      //                         width: '100%',
      //                      }}
      //                   >
      //                      <tr
      //                         style={{
      //                            borderWidth: 1,
      //                            borderStyle: 'solid',
      //                            borderColor: 'black',
      //                            height: 50,
      //                         }}
      //                      >
      //                         <th></th>
      //                         <th colSpan='2'>
      //                            <CImg src={BTN} style={{ width: 100 }} />
      //                         </th>
      //                         <td style={{ width: '20%', paddingTop: 20 }}>KC / KCP / KK : </td>
      //                         <th style={{ width: '20%' }}></th>
      //                         <th></th>
      //                         <td style={{ paddingTop: 20 }}>
      //                            Tanggal : {`${tanggal_sekarang.getDate()} - ${tanggal_sekarang.getMonth() + 1} - ${tanggal_sekarang.getFullYear()}`}
      //                         </td>
      //                         <th style={{ width: '1%' }}></th>
      //                      </tr>
      //                      <tr
      //                         style={{
      //                            borderWidth: 1,
      //                            borderStyle: 'solid',
      //                            borderColor: 'black',
      //                            textAlign: 'center',
      //                         }}
      //                      >
      //                         <th colSpan='8' style={{ backgroundColor: '#A5BDD7' }}>
      //                            <strong>FORMULIR TRANSFER DANA</strong>
      //                         </th>
      //                      </tr>
      //                      <tr>
      //                         <td
      //                            colSpan='4'
      //                            style={{
      //                               borderWidth: 1,
      //                               borderStyle: 'solid',
      //                               borderColor: 'black',
      //                               textAlign: 'center',
      //                               height: 50,
      //                            }}
      //                         ></td>
      //                         <td
      //                            colSpan='4'
      //                            rowSpan='2'
      //                            style={{
      //                               borderWidth: 1,
      //                               borderStyle: 'solid',
      //                               borderColor: 'black',
      //                               textAlign: 'center',
      //                            }}
      //                         ></td>
      //                      </tr>
      //                      <tr>
      //                         <td
      //                            colSpan='4'
      //                            style={{
      //                               borderWidth: 1,
      //                               borderStyle: 'solid',
      //                               borderColor: 'black',
      //                               textAlign: 'center',
      //                               height: 50,
      //                            }}
      //                         ></td>
      //                      </tr>
      //                      <tr>
      //                         <td colSpan='8' style={{ height: 10 }}></td>
      //                      </tr>
      //                      <tr>
      //                         <td style={{ width: '1%' }}></td>
      //                         <td
      //                            style={{
      //                               borderWidth: 1,
      //                               borderStyle: 'solid',
      //                               borderColor: 'black',
      //                               textAlign: 'center',
      //                            }}
      //                         >
      //                            Bank tertarik
      //                         </td>
      //                         <td
      //                            style={{
      //                               borderWidth: 1,
      //                               borderStyle: 'solid',
      //                               borderColor: 'black',
      //                               textAlign: 'center',
      //                            }}
      //                         >
      //                            No warkat
      //                         </td>
      //                         <td
      //                            colSpan='2'
      //                            style={{
      //                               borderWidth: 1,
      //                               borderStyle: 'solid',
      //                               borderColor: 'black',
      //                               textAlign: 'center',
      //                            }}
      //                         >
      //                            Nominal valuta
      //                         </td>
      //                         <td
      //                            style={{
      //                               borderWidth: 1,
      //                               borderStyle: 'solid',
      //                               borderColor: 'black',
      //                               textAlign: 'center',
      //                            }}
      //                         >
      //                            Kurs
      //                         </td>
      //                         <td
      //                            style={{
      //                               borderWidth: 1,
      //                               borderStyle: 'solid',
      //                               borderColor: 'black',
      //                               textAlign: 'center',
      //                            }}
      //                         >
      //                            Nominal Rupiah
      //                         </td>
      //                         <td style={{ width: '1%' }}></td>
      //                      </tr>
      //                      <tr style={{ height: 20 }}>
      //                         <td></td>
      //                         <td
      //                            style={{
      //                               borderWidth: 1,
      //                               borderStyle: 'solid',
      //                               borderColor: 'black',
      //                               textAlign: 'center',
      //                            }}
      //                         ></td>
      //                         <td
      //                            style={{
      //                               borderWidth: 1,
      //                               borderStyle: 'solid',
      //                               borderColor: 'black',
      //                               textAlign: 'center',
      //                            }}
      //                         ></td>
      //                         <td
      //                            colSpan='2'
      //                            style={{
      //                               borderWidth: 1,
      //                               borderStyle: 'solid',
      //                               borderColor: 'black',
      //                               textAlign: 'center',
      //                            }}
      //                         ></td>
      //                         <td
      //                            style={{
      //                               borderWidth: 1,
      //                               borderStyle: 'solid',
      //                               borderColor: 'black',
      //                               textAlign: 'center',
      //                            }}
      //                         ></td>
      //                         <td
      //                            style={{
      //                               borderWidth: 1,
      //                               borderStyle: 'solid',
      //                               borderColor: 'black',
      //                               textAlign: 'center',
      //                            }}
      //                         >
      //                            {formatRupiah(formData.amount)}
      //                         </td>
      //                         <td></td>
      //                      </tr>
      //                      <tr>
      //                         <td></td>
      //                         <td colSpan='6' style={{ paddingTop: 5, paddingBottom: 5 }}>
      //                            Terbilang : <span style={{ fontWeight: 'bold' }}>{numberToWords(formData.amount) + ` rupiah`}</span>
      //                         </td>
      //                         <td></td>
      //                      </tr>
      //                      <tr>
      //                         <td
      //                            colSpan='4'
      //                            style={{
      //                               borderWidth: 1,
      //                               borderStyle: 'solid',
      //                               borderColor: 'black',
      //                               paddingLeft: '1%',
      //                               width: '50%',
      //                            }}
      //                         >
      //                            Penerima
      //                            <br />
      //                            Nama&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span style={{ fontWeight: 'bold' }}>{formData.nama_penerima}</span>
      //                            <br />
      //                            Alamat&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span style={{ fontWeight: 'bold' }}>{formData.alamat_penerima}</span>
      //                            <br />
      //                            Telepon&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span style={{ fontWeight: 'bold' }}>{formData.telpon_penerima}</span>
      //                            <br />
      //                            No. rekening&nbsp;: <span style={{ fontWeight: 'bold' }}>{formData.rekening_penerima}</span>
      //                            <br />
      //                            Bank - Cabang (Kota - Negara)&nbsp;: <span style={{ fontWeight: 'bold' }}>{formData.cabang_penerima}</span>
      //                            <br />
      //                            Kode Bank / SWIFT Code&nbsp;:
      //                         </td>
      //                         <td
      //                            colSpan='4'
      //                            style={{
      //                               borderWidth: 1,
      //                               borderStyle: 'solid',
      //                               borderColor: 'black',
      //                               paddingLeft: '1%',
      //                            }}
      //                         >
      //                            Pengirim
      //                            <br />
      //                            Nasabah - No. rekening : <span style={{ fontWeight: 'bold' }}>{formData.rekening_pengirim}</span>
      //                            <br />
      //                            Non Nasabah - No. Identitas :
      //                            <br />
      //                            Nama&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span style={{ fontWeight: 'bold' }}>{formData.nama_pengirim}</span>
      //                            <br />
      //                            Alamat&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span style={{ fontWeight: 'bold' }}>{formData.alamat_pengirim}</span>
      //                            <br />
      //                            Telepon&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span style={{ fontWeight: 'bold' }}>{formData.telpon_pengirim}</span>
      //                            <br />
      //                            Hubungan dg Penerima&nbsp;:
      //                         </td>
      //                      </tr>
      //                      <tr
      //                         style={{
      //                            borderWidth: 1,
      //                            borderStyle: 'solid',
      //                            borderColor: 'black',
      //                         }}
      //                      >
      //                         <td style={{ width: '1%' }}></td>
      //                         <td colSpan='6'>Catatan :</td>
      //                         <td style={{ width: '1%' }}></td>
      //                      </tr>
      //                      <tr>
      //                         <td
      //                            colSpan='4'
      //                            rowSpan='2'
      //                            style={{
      //                               borderWidth: 1,
      //                               borderStyle: 'solid',
      //                               borderColor: 'black',
      //                               paddingLeft: 10,
      //                               paddingBottom: 20,
      //                            }}
      //                         >
      //                            Biaya transaksi (diisi oleh petugas Bank)
      //                            <br />
      //                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      //                               <span style={{ textDecorationLine: 'underline', color: 'white' }}>............................................................</span>
      //                               <span>&nbsp;&nbsp;:&nbsp;&nbsp;</span>
      //                               <span style={{ textDecorationLine: 'underline', color: 'white' }}>............................................................</span>
      //                            </div>
      //                            <br />
      //                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      //                               <span style={{ textDecorationLine: 'underline' }}>
      //                                  <span style={{ color: 'white' }}>............................................................</span>
      //                               </span>
      //                               <span>&nbsp;&nbsp;:&nbsp;&nbsp;</span>
      //                               <span style={{ textDecorationLine: 'underline' }}>
      //                                  <span style={{ color: 'white' }}>............................................................</span>
      //                               </span>
      //                            </div>
      //                            <br />
      //                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      //                               <span style={{ textDecorationLine: 'underline' }}>
      //                                  <span style={{ color: 'white' }}>............................................................</span>
      //                               </span>
      //                               <span>&nbsp;&nbsp;:&nbsp;&nbsp;</span>
      //                               <span style={{ textDecorationLine: 'underline' }}>
      //                                  <span style={{ color: 'white' }}>............................................................</span>
      //                               </span>
      //                            </div>
      //                            <br />
      //                            Total biaya :{' '}
      //                            <span style={{ textDecorationLine: 'underline' }}>
      //                               <span style={{ color: 'white' }}>
      //                                  ..........................................................................................................
      //                               </span>
      //                            </span>
      //                            <br />
      //                            Dibebankan kepada :
      //                         </td>
      //                         <td
      //                            colSpan='4'
      //                            style={{
      //                               borderWidth: 1,
      //                               borderStyle: 'solid',
      //                               borderColor: 'black',
      //                               textAlign: 'center',
      //                               height: 50,
      //                            }}
      //                         >
      //                            <div
      //                               style={{
      //                                  display: 'flex',
      //                                  flexDirection: 'row',
      //                                  justifyContent: 'space-evenly',
      //                                  paddingTop: 50,
      //                               }}
      //                            >
      //                               <div style={{ display: 'flex', flexDirection: 'column' }}>
      //                                  <span style={{ color: 'white' }}>{formData.nama_pengirim}</span>
      //                                  <span style={{ textDecorationLine: 'underline' }}>
      //                                     <span style={{ color: 'white' }}>..................................................</span>
      //                                  </span>
      //                                  <span>TELLER</span>
      //                               </div>
      //                               <div style={{ display: 'flex', flexDirection: 'column' }}>
      //                                  <span>{formData.nama_pengirim}</span>
      //                                  <span style={{ textDecorationLine: 'underline' }}>
      //                                     <span style={{ color: 'white' }}>..................................................</span>
      //                                  </span>
      //                                  <span>PENGIRIM</span>
      //                               </div>
      //                            </div>
      //                         </td>
      //                      </tr>
      //                      <tr>
      //                         <td
      //                            colSpan='4'
      //                            style={{
      //                               borderWidth: 1,
      //                               borderStyle: 'solid',
      //                               borderColor: 'black',
      //                               textAlign: 'center',
      //                               height: 50,
      //                            }}
      //                         ></td>
      //                      </tr>
      //                      <tr
      //                         style={{
      //                            borderWidth: 1,
      //                            borderStyle: 'solid',
      //                            borderColor: 'black',
      //                         }}
      //                      >
      //                         <td colSpan='4'></td>
      //                         <td
      //                            colSpan='4'
      //                            style={{
      //                               borderWidth: 1,
      //                               borderRightStyle: 'solid',
      //                               borderColor: 'black',
      //                               textAlign: 'end',
      //                               paddingRight: 10,
      //                            }}
      //                         >
      //                            <small>Lembar 1. Bank</small>
      //                         </td>
      //                      </tr>
      //                   </table>
      //                   <CCardFooter>
      //                      <CButton type='submit' size='sm' color='primary' className='float-right' onClick={handlePrint}>
      //                         <CIcon name='cil-scrubber' /> Print
      //                      </CButton>
      //                   </CCardFooter>
      //                </CCardBody>
      //             </CCard>
      //          </CCol>
      //       )}
      //    </CRow>
      //    <ComponentToPrint ref={componentRef} dataPrint={dataPrint} />
      // </CContainer>
      <CContainer>
         <CRow className='justify-content-center'>
            <CCol xs='12' md='12'>
               <CCard>
                  <CCardHeader>
                     <strong>Data Transfer</strong>
                  </CCardHeader>
                  <CCardBody>
                     <CForm onSubmit={submitForm}>
                        <CFormGroup row>
                           <CCol md='3'>template</CCol>
                           <CCol md='2' style={{ marginLeft: 20 }}>
                              <CInputRadio name='template' value='BTN' defaultChecked onChange={onFormChange} />
                              <CImg src={BTN} style={{ width: 100, height: 50, objectFit: 'contain' }} />
                           </CCol>
                           <CCol md='2'>
                              <CInputRadio name='template' value='BRI' onChange={onFormChange} />
                              <CImg src={BRI} style={{ width: 100, height: 50, objectFit: 'contain' }} />
                           </CCol>
                           <CCol md='2'>
                              <CInputRadio name='template' value='BCA' onChange={onFormChange} />
                              <CImg src={BCA} style={{ width: 100, height: 50, objectFit: 'contain' }} />
                           </CCol>
                           <CCol md='2'>
                              <CInputRadio name='template' value='MANDIRI' onChange={onFormChange} />
                              <CImg src={MANDIRI} style={{ width: 100, height: 50, objectFit: 'contain' }} />
                           </CCol>
                        </CFormGroup>
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
                              <CInput custom size='sm' value={namaPengirim} disabled onChange={onFormChange} />
                           </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                           <CCol md='3'>
                              <CLabel htmlFor='text-input'>
                                 <small>Alamat</small>
                              </CLabel>
                           </CCol>
                           <CCol md='9'>
                              <CInput custom size='sm' value={alamatPengirim} disabled onChange={onFormChange} />
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
                              <CIcon name='cil-scrubber' /> Prosess
                           </CButton>
                        </CCardFooter>
                     </CForm>
                  </CCardBody>
               </CCard>
            </CCol>
         </CRow>
         <ComponentToPrint ref={componentRef} dataPrint={dataPrint} />
      </CContainer>
   )
}

export default AddGalery
