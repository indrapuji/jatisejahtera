import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CButton } from '@coreui/react'
import axios from 'axios'
import ReactExport from 'react-export-excel'
import newAlert from '../../../components/NewAlert'
import moment from 'moment'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

const DataTransfer = () => {
   const history = useHistory()
   const [tanggal, setTanggal] = useState(null)
   const [dataPeserta, setDataPeserta] = useState([])

   useEffect(() => {
      getData()
      setTanggal(new Date())
   }, [])

   const getData = async () => {
      try {
         const { data } = await axios({
            method: 'GET',
            url: `https://zada.indrapuji.com/v1/jati-transfer/all?limit=50`,
            headers: {
               token: localStorage.token,
            },
         })
         setDataPeserta(data.content.data)
         console.log(data.content.data)
      } catch (error) {
         console.log(error)
      }
   }

   const handleDetail = (transferId) => {
      history.push(`/transfer/${transferId}`)
   }

   const handleDelete = async (transferId) => {
      try {
         const { data } = await axios({
            method: 'DELETE',
            url: `https://zada.indrapuji.com/v1/jati-transfer/delete/${transferId}`,
         })
         newAlert({ status: 'success', message: 'Berhasil' })
         console.log(data)
         getData()
      } catch (error) {
         console.log(error)
      }
   }

   const fields = [
      { key: 'created', label: 'Tanggal', _style: { width: '15%' }, sorter: true, filter: true },
      { key: 'nama_penerima', label: 'Nama Penerima', _style: { width: '15%' }, sorter: true, filter: true },
      { key: 'alamat_penerima', label: 'Alamat Penerima', _style: { width: '35%' }, sorter: true, filter: true },
      { key: 'alamat_pengirim', label: 'Catatan', _style: { width: '25%' }, sorter: true, filter: true },
      { key: 'template', label: 'Blanko', _style: { width: '5%' }, sorter: true, filter: true },
      { key: 'amount', label: 'Jumlah', _style: { width: '10%' }, sorter: true, filter: true },
      { key: 'show_details', label: '', _style: { width: '5%' }, sorter: false, filter: false },
      { key: 'deletedData', label: '', _style: { width: '5%' }, sorter: false, filter: false },
   ]
   return (
      <CRow>
         <CCol>
            <CCard>
               <CCardHeader color='success'>
                  <strong>History</strong>
               </CCardHeader>
               <div style={{ marginTop: 20, marginLeft: 20 }}>
                  <ExcelFile element={<CButton color='warning'>Download Report</CButton>}>
                     <ExcelSheet data={dataPeserta} name={`rilis ${tanggal}`}>
                        <ExcelColumn label='Nama Pengirim' value='nama_pengirim' />
                        <ExcelColumn label='Alamat Pengirim' value='alamat_pengirim' />
                        <ExcelColumn label='Telepon Pengirim' value='telpon_pengirim' />
                        <ExcelColumn label='Rekening Pengirim' value='rekening_pengirim' />
                        <ExcelColumn label='Rekening Penerima' value='nama_penerima' />
                        <ExcelColumn label='Alamat Penerima' value='alamat_penerima' />
                        <ExcelColumn label='Rekening Penerima' value='rekening_penerima' />
                        <ExcelColumn label='Telepon Penerima' value='telpon_penerima' />
                        <ExcelColumn label='Cabang Penerima' value='cabang_penerima' />
                        <ExcelColumn label='Bank Tujuan' value='template' />
                        <ExcelColumn label='Jumlah' value='amount' />
                        <ExcelColumn label='Pusat' value='pusat' />
                        <ExcelColumn label='Cabang' value='cabang' />
                     </ExcelSheet>
                  </ExcelFile>
               </div>
               {dataPeserta && (
                  <CCardBody>
                     <CDataTable
                        items={dataPeserta}
                        fields={fields}
                        itemsPerPageSelect
                        pagination
                        itemsPerPage={20}
                        columnFilter
                        sorter
                        hover
                        striped
                        bordered
                        size='sm'
                        scopedSlots={{
                           created: (item) => {
                              return <div style={{ marginTop: '0.5rem' }}>{moment(item.created_at).format('DD MMMM YYYY')}</div>
                           },
                           show_details: (item) => {
                              return (
                                 <td key={item.id}>
                                    <CButton
                                       color='warning'
                                       size='sm'
                                       onClick={() => {
                                          handleDetail(item.id)
                                       }}
                                    >
                                       Detail
                                    </CButton>
                                 </td>
                              )
                           },
                           deletedData: (item) => {
                              return (
                                 <td key={item.id}>
                                    <CButton
                                       color='danger'
                                       size='sm'
                                       onClick={() => {
                                          handleDelete(item.id)
                                       }}
                                    >
                                       Delete
                                    </CButton>
                                 </td>
                              )
                           },
                        }}
                     />
                  </CCardBody>
               )}
            </CCard>
         </CCol>
      </CRow>
   )
}

export default DataTransfer
