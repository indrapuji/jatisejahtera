import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CButton} from '@coreui/react'
import axios from 'axios'
import HostUrl from '../../../utilities/HostUrl'
import changeFormat from 'src/utilities/ChangeFormat'
import {encrypt} from 'src/utilities/RandomLink'

const ClaimRequest = () => {
  const history = useHistory()
  const [dataPeserta, setDataPeserta] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `${HostUrl}/claim?status=process`,
        headers: {
          token: localStorage.token
        }
      })
      console.log(data)
      console.log(changeFormat(data))
      setDataPeserta(changeFormat(data))
    } catch (error) {
      console.log(error)
    }
  }

  const handdleEdit = (claimId) => {
    history.push(`/claim-detail/${encrypt(claimId)}`)
  }
  const fields = [
    {key: 'name', label: 'Nama', _style: {width: '20%'}, sorter: true, filter: true},
    {key: 'nip', label: 'No Induk', _style: {width: '15%'}, sorter: true, filter: true},
    {key: 'regional', label: 'Regional', sorter: true, filter: true},
    {key: 'kategori', label: 'Pengajuan', _style: {width: '15%'}},
    {key: 'pemohon', label: 'Pemohon', _style: {width: '15%'}},
    {key: 'created_date', label: 'Tanggal Pengajuan', sorter: true, filter: true},
    {key: 'show_details', label: '', _style: {width: '5%'}}
  ]
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader color='success'>
              <strong>Proses Claim</strong>
            </CCardHeader>
            {dataPeserta && (
              <CCardBody>
                <CDataTable
                  items={dataPeserta}
                  fields={fields}
                  itemsPerPageSelect
                  pagination
                  itemsPerPage={20}
                  sorter
                  hover
                  striped
                  bordered
                  size='sm'
                  scopedSlots={{
                    showNama: (item) => {
                      return <td>{item.nama}</td>
                    },
                    showNoInduk: (item) => {
                      return <td>{item.no_induk}</td>
                    },
                    showEmail: (item) => {
                      return <td>{item.email}</td>
                    },
                    showSatuanKerja: (item) => {
                      return <td>{item.satuan_kerja}</td>
                    },
                    show_details: (item) => {
                      return (
                        <td key={item.id}>
                          <CButton
                            color='warning'
                            size='sm'
                            onClick={() => {
                              handdleEdit(item.id, item.userId)
                            }}
                          >
                            Detail
                          </CButton>
                        </td>
                      )
                    }
                  }}
                />
              </CCardBody>
            )}
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default ClaimRequest
