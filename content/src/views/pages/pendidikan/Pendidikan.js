import React, {useEffect, useState} from 'react';
import {CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CButton, CImg} from '@coreui/react';
import axios from 'axios';
import HostUrl from '../../../utilities/HostUrl';
import newAlert from '../../../components/NewAlert';
import Swal from 'sweetalert2';

const fields = [
  {key: 'title', label: 'Deskripsi', _style: {width: '60%'}},
  {key: 'image_url', label: 'Path', _style: {width: '20%'}},
  {key: 'status', label: 'Status', _style: {width: '10%'}},
  {key: 'image', label: 'Image', _style: {width: '20%'}},
  {key: 'action', _style: {width: '10%'}},
];

const Pendidikan = () => {
  const [dataPendidikan, setDataPendidikan] = useState([]);
  useEffect(() => {
    getPendidikan();
  }, []);

  const getPendidikan = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: HostUrl + '/content?category=pendidikan',
      });
      setDataPendidikan(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: 'Do you want to Delete?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `Don't Delete`,
      }).then((result) => {
        if (result.isConfirmed) {
          axios({
            method: 'DELETE',
            url: HostUrl + '/content/' + id,
          });
          newAlert({status: 'success', message: 'Berhasil'});
          getPendidikan();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CRow>
        <CCol xs='12' lg='12'>
          <CCard>
            <CCardHeader>
              <strong>Data Realisasi Pendidikan</strong>
            </CCardHeader>
            <CCol>
              <div style={{marginTop: 15}}>
                <CButton color='success' to='/realisasi/pendidikan/add'>
                  Tambah
                </CButton>
              </div>
            </CCol>
            <CCardBody>
              <CDataTable
                items={dataPendidikan}
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
                            handleDelete(item.id);
                          }}
                        >
                          Delete
                        </CButton>
                      </td>
                    );
                  },
                  image: (item) => (
                    <td>
                      <CImg src={item.image_url} height={100} />
                      {item.status}
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Pendidikan;
