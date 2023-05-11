import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CButton } from '@coreui/react'
import axios from 'axios'
import HostUrl from '../../../utilities/HostUrl'
import newAlert from '../../../components/NewAlert'

const fields = [
   { key: 'title', label: 'Nama', _style: { width: '30%' } },
   { key: 'text', label: 'Deskripsi', _style: { width: '50%' } },
   { key: 'image', label: 'Data', _style: { width: '20%' } },
   { key: 'action', _style: { width: '10%' } },
]
const Upload = () => {
   const [dataUpload, setDataUpload] = useState([])
   useEffect(() => {
      getUpload()
   }, [])

   const getUpload = async () => {
      try {
         const { data } = await axios({
            method: 'GET',
            url: HostUrl + '/content?category=upload',
         })
         setDataUpload(data)
         console.log(data)
      } catch (error) {
         console.log(error)
      }
   }

   const handleDelete = async (id) => {
      try {
         const { data } = await axios({
            method: 'DELETE',
            url: HostUrl + '/content/' + id,
         })
         newAlert({ status: 'success', message: 'Berhasil' })
         getUpload()
         console.log(data)
      } catch (error) {
         console.log(error)
      }
   }
   return (
      <>
         <CRow>
            <CCol xs='12' lg='12'>
               <CCard>
                  <CCardHeader>
                     <strong>Upload</strong>
                  </CCardHeader>
                  <CCol>
                     <div style={{ marginTop: 15 }}>
                        <CButton color='success' to='/upload/add'>
                           Tambah
                        </CButton>
                     </div>
                  </CCol>
                  <CCardBody>
                     <CDataTable
                        items={dataUpload}
                        fields={fields}
                        itemsPerPage={10}
                        pagination
                        scopedSlots={{
                           action: (item, index) => {
                              return (
                                 <td>
                                    <CButton
                                       color='danger'
                                       // variant="outline"
                                       // shape="pill"
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
                           image: (item) => (
                              <div style={{ paddingTop: 10 }}>
                                 <a href={item.image_url} target='_blank' rel='noreferrer' download>
                                    Click to View
                                 </a>
                              </div>
                           ),
                        }}
                     />
                  </CCardBody>
               </CCard>
            </CCol>
         </CRow>
      </>
   )
}

export default Upload
