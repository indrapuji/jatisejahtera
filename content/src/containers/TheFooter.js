import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
   return (
      <CFooter fixed={false}>
         <div className='mfs-auto'>
            <span className='mr-1'>Powered by</span>
            <a href='https://jatisejahtera.or.id/' target='_blank' rel='noopener noreferrer'>
               Jati Sejahtera
            </a>
         </div>
      </CFooter>
   )
}

export default React.memo(TheFooter)
