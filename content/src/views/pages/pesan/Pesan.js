import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CButton, CBadge} from '@coreui/react';
import axios from 'axios';
import formatDate from 'src/utilities/FormatDate';
import HostUrl from '../../../utilities/HostUrl';

const Pesan = () => {
  const history = useHistory();
  const [dataPesan, setDataPesan] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `${HostUrl}/contact`,
      });
      console.log(data);
      setDataPesan(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBadge = (status) => {
    switch (status) {
      case true:
        return 'success';
      default:
        return 'warning';
    }
  };

  const handdleEdit = (pesanId) => {
    history.push(`/pesan/${pesanId}`);
  };
  const fields = [
    {key: 'nama', label: 'Nama', _style: {width: '20%'}, sorter: true, filter: true},
    {key: 'email', label: 'Email', _style: {width: '20%'}, sorter: true, filter: true},
    {key: 'telp', label: 'Telp', _style: {width: '20%'}, sorter: true, filter: true},
    {key: 'tanggal', label: 'Tanggal Masuk', _style: {width: '20%'}, sorter: true, filter: true},
    {key: 'status_pesan', label: 'Status', sorter: true, filter: true},
    {key: 'show_details', label: '', _style: {width: '5%'}, sorter: false, filter: false},
  ];

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader color='success'>
              <strong>Pesan</strong>
            </CCardHeader>
            {dataPesan && (
              <CCardBody>
                <CDataTable
                  items={dataPesan}
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
                    tanggal: (item) => <td>{formatDate(item.createdAt)}</td>,
                    status_pesan: (item) => {
                      return (
                        <td>
                          <CBadge color={getBadge(item.status)}>{item.status ? 'Sudah Dibaca' : 'Belum Dibaca'}</CBadge>
                        </td>
                      );
                    },

                    show_details: (item) => {
                      return (
                        <td key={item.id}>
                          <CButton
                            color='warning'
                            size='sm'
                            onClick={() => {
                              handdleEdit(item.id);
                            }}
                          >
                            Detail
                          </CButton>
                        </td>
                      );
                    },
                  }}
                />
              </CCardBody>
            )}
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Pesan;
