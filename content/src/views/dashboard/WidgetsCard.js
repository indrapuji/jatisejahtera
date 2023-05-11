import { CRow } from '@coreui/react'
import React from 'react'
import { CCardFooter, CCol, CLink, CWidgetIcon } from '@coreui/react'
import CIcon from '@coreui/icons-react'

const WidgetsCard = (props) => {
   const { data } = props
   return (
      <>
         {data && (
            <CRow>
               <CCol xs='12' sm='6' lg='6'>
                  <CWidgetIcon
                     text={data.berita.nama}
                     header={data.berita.count}
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
               <CCol xs='12' sm='6' lg='6'>
                  <CWidgetIcon
                     text={data.galeri.nama}
                     header={data.galeri.count}
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
   )
}

export default WidgetsCard
