import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CButton, CBadge} from '@coreui/react';
import axios from 'axios';
import HostUrl from '../../../utilities/HostUrl';
import changeFormat from 'src/utilities/ChangeFormat';
import {encrypt} from 'src/utilities/RandomLink';
import ReactExport from 'react-export-excel';
import getColumn from 'src/utilities/GetColumn';

const Claim = () => {
  const history = useHistory();
  const [dataPeserta, setDataPeserta] = useState([]);
  const [exData, setExData] = useState([]);

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  // const unixTime = () => {
  //   const date = new Date();
  //   const unixTimestamp = Math.floor(date.getTime() / 1000);
  //   return unixTimestamp;
  // };

  const nameFile = `Report CSA ${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `${HostUrl}/claim`,
        headers: {
          token: localStorage.token,
        },
      });
      console.log(data);
      setExData(getColumn(changeFormat(data)));
      setDataPeserta(changeFormat(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handdleEdit = (claimId) => {
    history.push(`/claim-detail/${encrypt(claimId)}`);
  };

  const getBadge = (status) => {
    switch (status) {
      case 'created':
        return 'info';
      case 'approve':
        return 'success';
      default:
        return 'danger';
    }
  };

  const fields = [
    {key: 'name', label: 'Nama', _style: {width: '15%'}, sorter: true, filter: true},
    {key: 'nip', label: 'No Induk', _style: {width: '15%'}, sorter: true, filter: true},
    {key: 'kategori', label: 'Pengajuan', _style: {width: '15%'}, filter: true},
    {key: 'pemohon', label: 'Pemohon', _style: {width: '15%'}, filter: true},
    {key: 'created_date', label: 'Tanggal Pengajuan', sorter: true},
    {key: 'updated_date', label: 'Tanggal Update', sorter: true},
    {key: 'statusClaim', label: 'Status', filter: true},
    {key: 'show_details', label: '', _style: {width: '5%'}},
  ];

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader color='success'>
              <strong>Pengajuan Claim</strong>
            </CCardHeader>
            <div
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: 15,
              }}
            >
              <div>
                {dataPeserta && (
                  <ExcelFile element={<CButton color='primary'>Download</CButton>} filename={nameFile}>
                    <ExcelSheet data={dataPeserta} name='DATA'>
                      {exData &&
                        exData.map((item, index) => {
                          return <ExcelColumn key={index} label={item.header} value={item.field} />;
                        })}
                    </ExcelSheet>
                  </ExcelFile>
                )}
              </div>
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
                    statusClaim: (item) => {
                      return (
                        <td>
                          <CBadge color={getBadge(item.status)}>
                            {item.status === 'created'
                              ? 'Pengajuan'
                              : item.status === 'approve'
                              ? 'Disetujui'
                              : 'DiTolak'}
                          </CBadge>
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
                              handdleEdit(item.id, item.userId);
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

export default Claim;
