import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CButton} from '@coreui/react';
import axios from 'axios';
import HostUrl from '../../../utilities/HostUrl';
import regionalChange from 'src/utilities/regionalChange';

const DataAdmin = () => {
  const history = useHistory();
  const [dataAdmin, setDataAdmin] = useState([]);
  const [role, setRole] = useState();

  useEffect(() => {
    getData();
    setRole(localStorage.role);
    // eslint-disable-next-line
  }, []);

  const hideAdmin = (adminUser) => {
    const hideUser = adminUser.filter((x) => x.username !== 'indrapuji');
    return hideUser;
  };

  const getData = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `${HostUrl}/user/admin`,
        headers: {
          token: localStorage.token,
        },
      });
      console.log(hideAdmin(data));
      setDataAdmin(hideAdmin(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handdleEdit = (adminId) => {
    history.push(`/detail/${adminId}`);
  };
  const fields = [
    {key: 'name', label: 'Nama', _style: {width: '20%'}, sorter: true, filter: true},
    {key: 'role', label: 'Role', _style: {width: '20%'}, sorter: true, filter: true},
    {key: 'username', label: 'Username', _style: {width: '20%'}, sorter: true, filter: true},
    {key: 'passwordHide', label: 'Password', sorter: true, filter: true},
    {key: 'regionAdmin', label: 'Regional', sorter: true, filter: true},
    {key: 'show_details', label: '', _style: {width: '5%'}, sorter: false, filter: false},
  ];

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader color='success'>
              <strong>Admin</strong>
            </CCardHeader>
            <CCol>
              {role === 'super-admin' && (
                <div style={{marginTop: 15}}>
                  <CButton color='success' to='/admin/add'>
                    Add Admin
                  </CButton>
                </div>
              )}
            </CCol>
            {dataAdmin && (
              <CCardBody>
                <CDataTable
                  items={dataAdmin}
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
                    region: (item) => <td>{item.regional ? item.regional : '-'}</td>,
                    passwordHide: (item) => <td>{item.password && item.password.replace(/./g, '*')}</td>,
                    regionAdmin: (item) => <td>{item.regional && regionalChange(item.regional)}</td>,
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

export default DataAdmin;
