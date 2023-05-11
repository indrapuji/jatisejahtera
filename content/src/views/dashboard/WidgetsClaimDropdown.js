import React from 'react';
import {CWidgetDropdown, CRow, CCol, CDropdown, CDropdownMenu, CDropdownItem, CDropdownToggle} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import ChartLineSimple from '../../utilities/ChartLineSimple';

const WidgetsClaimDropdown = (props) => {
  const {data} = props;
  return (
    <>
      {data && (
        <CRow>
          <CCol sm='4' lg='3'>
            <CWidgetDropdown
              color='gradient-primary'
              header={data.totalPengajuan.count}
              text={data.totalPengajuan.nama}
              footerSlot={
                <ChartLineSimple
                  // pointed
                  className='c-chart-wrapper mt-3 mx-3'
                  style={{height: '70px'}}
                  dataPoints={[3, 10, 15, 23, 20, 24, 63, 65, 21]}
                  pointHoverBackgroundColor='primary'
                  label='Register'
                  labels='months'
                />
              }
            >
              <CDropdown>
                <CDropdownToggle color='transparent'>
                  <CIcon name='cil-settings' />
                </CDropdownToggle>
                <CDropdownMenu className='pt-0' placement='bottom-end'>
                  <CDropdownItem to='/data/claim'>Action</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CWidgetDropdown>
          </CCol>

          <CCol sm='4' lg='3'>
            <CWidgetDropdown
              color='gradient-warning'
              header={data.claimCreated.count}
              text={data.claimCreated.nama}
              footerSlot={
                <ChartLineSimple
                  pointed
                  className='mt-3 mx-3'
                  style={{height: '70px'}}
                  dataPoints={[3, 10, 15, 23, 20, 24, 63, 65, 21]}
                  pointHoverBackgroundColor='warning'
                  options={{elements: {line: {tension: 0.00005}}}}
                  label='Updated'
                  labels='months'
                />
              }
            >
              <CDropdown>
                <CDropdownToggle color='transparent'>
                  <CIcon name='cil-location-pin' />
                </CDropdownToggle>
                <CDropdownMenu className='pt-0' placement='bottom-end'>
                  <CDropdownItem to='/data/claim-request'>Action</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CWidgetDropdown>
          </CCol>

          <CCol sm='4' lg='3'>
            <CWidgetDropdown
              color='gradient-success'
              header={data.claimApprove.count}
              text={data.claimApprove.nama}
              footerSlot={
                <ChartLineSimple
                  className='mt-3'
                  style={{height: '70px'}}
                  backgroundColor='rgba(255,255,255,.2)'
                  dataPoints={[3, 10, 15, 23, 20, 24, 63, 65, 21]}
                  options={{elements: {line: {borderWidth: 2.5}}}}
                  pointHoverBackgroundColor='success'
                  label='Not Updated'
                  labels='months'
                />
              }
            >
              <CDropdown>
                <CDropdownToggle color='transparent'>
                  <CIcon name='cil-settings' />
                </CDropdownToggle>
                <CDropdownMenu className='pt-0' placement='bottom-end'>
                  <CDropdownItem to='/approve'>Action</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CWidgetDropdown>
          </CCol>

          <CCol sm='4' lg='3'>
            <CWidgetDropdown
              color='gradient-danger'
              header={data.claimReject.count}
              text={data.claimReject.nama}
              footerSlot={
                <ChartLineSimple
                  className='mt-3'
                  style={{height: '70px'}}
                  backgroundColor='rgba(255,255,255,.2)'
                  dataPoints={[3, 10, 15, 23, 20, 24, 63, 65, 21]}
                  options={{elements: {line: {borderWidth: 2.5}}}}
                  pointHoverBackgroundColor='danger'
                  label='Not Updated'
                  labels='months'
                />
              }
            >
              <CDropdown>
                <CDropdownToggle color='transparent'>
                  <CIcon name='cil-settings' />
                </CDropdownToggle>
                <CDropdownMenu className='pt-0' placement='bottom-end'>
                  <CDropdownItem to='/reject'>Action</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CWidgetDropdown>
          </CCol>
        </CRow>
      )}
    </>
  );
};

export default WidgetsClaimDropdown;
