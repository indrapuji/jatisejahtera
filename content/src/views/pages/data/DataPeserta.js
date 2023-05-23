import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CButton, CBadge} from '@coreui/react';
import axios from 'axios';
import HostUrl from '../../../utilities/HostUrl';
import {encrypt} from 'src/utilities/RandomLink';
import Swal from 'sweetalert2';
import newAlert from 'src/components/NewAlert';
import regionalChange from 'src/utilities/regionalChange';

const DataPeserta = () => {
  const history = useHistory();
  const [dataPeserta, setDataPeserta] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `${HostUrl}/data/allrecord`,
        headers: {
          token: localStorage.token,
        },
      });
      console.log(data);
      setDataPeserta(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handdleEdit = (pesertaId, status) => {
    if (status) {
      history.push(`/user/${pesertaId}`);
    } else {
      history.push(`/update/${encrypt(pesertaId)}`);
    }
  };

  const handleClaim = (username) => {
    history.push(`/claim/${encrypt(username)}`);
  };

  const showPass = () => {
    setShow(!show);
  };

  const handleAdd = async () => {
    try {
      const {value: dataNIP} = await Swal.fire({
        title: 'NIP',
        input: 'text',
        // inputLabel: "Masukkan NIP",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!';
          }
        },
      });
      const {data} = await axios({
        method: 'POST',
        url: `https://ws.ykp3js.org/cek`,
        data: {
          nip: dataNIP,
          tokenkey:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiJZS1AzSlNXZWIiLCJ0aW1lc3RhbXAiOjE2NjIyNzM1MDB9.7W1lr29HTvAQDYR1FUIRG3mrsyGqTVAbQe9daDeUz8k',
          act: 'klaim',
        },
      });

      if (data.status === 200) {
        history.push(`/peserta/add/${data.data.NIP}`);
      } else {
        newAlert({status: 'error', message: 'NIP tidak terdaftar / NIP salah'});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fields = [
    {key: 'name', label: 'Nama', _style: {width: '20%'}, sorter: true, filter: true},
    {key: 'nip', label: 'No Induk', _style: {width: '15%'}, sorter: true, filter: true},
    {key: 'regionalMember', label: 'Satuan Kerja', sorter: true, filter: true},
    {key: 'Username', label: 'Username', _style: {width: '10%'}, sorter: true, filter: true},
    {key: 'Password', label: 'Password', _style: {width: '15%'}, sorter: true, filter: true},
    {key: 'status', label: 'Status Update', _style: {width: '10%'}, sorter: true, filter: true},
    {key: 'show_details', label: '', _style: {width: '5%'}, sorter: false, filter: false},
    {key: 'show_claim', label: '', _style: {width: '5%'}, sorter: false, filter: false},
  ];
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader color='success' style={{display: 'flex', justifyContent: 'space-between'}}>
              <strong>Peserta</strong>
              <CButton color='warning' onClick={showPass}>
                Show Password
              </CButton>
            </CCardHeader>
            <CCol>
              <div style={{marginTop: 15}}>
                <CButton color='success' onClick={handleAdd}>
                  Add Peserta
                </CButton>
              </div>
            </CCol>
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
                    status: (item) => (
                      <td>
                        <CBadge color={item.status ? 'success' : 'danger'}>
                          {item.status ? 'Updated' : 'Need Update'}
                        </CBadge>
                      </td>
                    ),
                    Username: (item) => <td>{show ? item.username : item.username.replace(/./g, '*')}</td>,
                    Password: (item) => <td>{show ? item.password : item.password.replace(/./g, '*')}</td>,
                    regionalMember: (item) => <td>{item.regional && regionalChange(item.regional)}</td>,
                    show_details: (item) => {
                      return (
                        <td key={item.id}>
                          <CButton
                            color={item.status ? 'success' : 'danger'}
                            size='sm'
                            onClick={() => {
                              handdleEdit(item.id, item.status);
                            }}
                          >
                            {item.status ? 'Detail' : 'Update'}
                          </CButton>
                        </td>
                      );
                    },
                    show_claim: (item) => {
                      return (
                        <td key={item.id}>
                          <CButton
                            color={item.status ? 'warning' : 'secondary'}
                            disabled={!item.status}
                            size='sm'
                            onClick={() => {
                              handleClaim(item.username);
                            }}
                          >
                            Claim
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

export default DataPeserta;
