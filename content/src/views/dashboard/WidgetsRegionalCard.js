import {CRow} from '@coreui/react';
import React from 'react';
import {CCardFooter, CCol, CLink, CWidgetIcon} from '@coreui/react';
import CIcon from '@coreui/icons-react';

const WidgetsRegionalCard = (props) => {
  const {data} = props;
  return (
    <>
      {data && (
        <CRow>
          <CCol xs='12' sm='3' lg='3'>
            <CWidgetIcon
              text={data.kantorPusat.nama}
              header={data.kantorPusat.count}
              color='warning'
              iconPadding={false}
              footerSlot={
                <CCardFooter className='card-footer px-3 py-2'>
                  <CLink className='font-weight-bold font-xs btn-block text-muted' to='/berita'>
                    View more
                    <CIcon name='cil-arrow-right' className='float-right' width='16' />
                  </CLink>
                </CCardFooter>
              }
            >
              <CIcon width={24} name='cil-chart-pie' className='mx-5' />
            </CWidgetIcon>
          </CCol>
          <CCol xs='12' sm='3' lg='3'>
            <CWidgetIcon
              text={data.jawaBarat.nama}
              header={data.jawaBarat.count}
              color='warning'
              iconPadding={false}
              footerSlot={
                <CCardFooter className='card-footer px-3 py-2'>
                  <CLink className='font-weight-bold font-xs btn-block text-muted' to='/galeri'>
                    View more
                    <CIcon name='cil-arrow-right' className='float-right' width='16' />
                  </CLink>
                </CCardFooter>
              }
            >
              <CIcon width={24} name='cil-star' className='mx-5' />
            </CWidgetIcon>
          </CCol>
          <CCol xs='12' sm='3' lg='3'>
            <CWidgetIcon
              text={data.jawaTengah.nama}
              header={data.jawaTengah.count}
              color='warning'
              iconPadding={false}
              footerSlot={
                <CCardFooter className='card-footer px-3 py-2'>
                  <CLink className='font-weight-bold font-xs btn-block text-muted' to='/galeri'>
                    View more
                    <CIcon name='cil-arrow-right' className='float-right' width='16' />
                  </CLink>
                </CCardFooter>
              }
            >
              <CIcon width={24} name='cil-star' className='mx-5' />
            </CWidgetIcon>
          </CCol>
          <CCol xs='12' sm='3' lg='3'>
            <CWidgetIcon
              text={data.jawaTimur.nama}
              header={data.jawaTimur.count}
              color='warning'
              iconPadding={false}
              footerSlot={
                <CCardFooter className='card-footer px-3 py-2'>
                  <CLink className='font-weight-bold font-xs btn-block text-muted' to='/galeri'>
                    View more
                    <CIcon name='cil-arrow-right' className='float-right' width='16' />
                  </CLink>
                </CCardFooter>
              }
            >
              <CIcon width={24} name='cil-star' className='mx-5' />
            </CWidgetIcon>
          </CCol>
        </CRow>
      )}
    </>
  );
};

export default WidgetsRegionalCard;
