import React from 'react';
import {CWidgetDropdown, CRow, CCol, CDropdown, CDropdownMenu, CDropdownItem, CDropdownToggle} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import ChartLineSimple from '../../utilities/ChartLineSimple';

const WidgetsDropdown = (props) => {
  const {data} = props;
  return (
    <>
      {data && (
        <CRow>
          <CCol sm='6' lg='4'>
            <CWidgetDropdown
              color='gradient-primary'
              header={data.pendidikan.count}
              text={data.pendidikan.nama}
              footerSlot={
                <ChartLineSimple
                  // pointed
                  className='c-chart-wrapper mt-3 mx-3'
                  style={{height: '70px'}}
                  dataPoints={['']}
                  pointHoverBackgroundColor='primary'
                  label='Pendidikan'
                  labels='months'
                />
              }
            >
              <CDropdown>
                <CDropdownToggle color='transparent'>
                  <CIcon name='cil-settings' />
                </CDropdownToggle>
                <CDropdownMenu className='pt-0' placement='bottom-end'>
                  <CDropdownItem to='/realisasi/pendidikan'>Action</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CWidgetDropdown>
          </CCol>

          <CCol sm='6' lg='4'>
            <CWidgetDropdown
              color='gradient-info'
              header={data.perumahan.count}
              text={data.perumahan.nama}
              footerSlot={
                <ChartLineSimple
                  // pointed
                  className='mt-3 mx-3'
                  style={{height: '70px'}}
                  dataPoints={['']}
                  pointHoverBackgroundColor='info'
                  options={{elements: {line: {tension: 0.00001}}}}
                  label='Members'
                  labels='months'
                />
              }
            >
              <CDropdown>
                <CDropdownToggle color='transparent'>
                  <CIcon name='cil-location-pin' />
                </CDropdownToggle>
                <CDropdownMenu className='pt-0' placement='bottom-end'>
                  <CDropdownItem to='/realisasi/perumahan'>Action</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CWidgetDropdown>
          </CCol>

          <CCol sm='6' lg='4'>
            <CWidgetDropdown
              color='gradient-warning'
              header={data.kesehatan.count}
              text={data.kesehatan.nama}
              footerSlot={
                <ChartLineSimple
                  className='mt-3'
                  style={{height: '70px'}}
                  backgroundColor='rgba(255,255,255,.2)'
                  dataPoints={['']}
                  options={{elements: {line: {borderWidth: 2.5}}}}
                  pointHoverBackgroundColor='warning'
                  label='Members'
                  labels='months'
                />
              }
            >
              <CDropdown>
                <CDropdownToggle color='transparent'>
                  <CIcon name='cil-settings' />
                </CDropdownToggle>
                <CDropdownMenu className='pt-0' placement='bottom-end'>
                  <CDropdownItem to='/realisasi/kesehatan'>Action</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CWidgetDropdown>
          </CCol>
        </CRow>
      )}
    </>
  );
};

export default WidgetsDropdown;
