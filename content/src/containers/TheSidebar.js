import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg,
} from '@coreui/react';

import Logo from '../assets/images/logo.png';

// sidebar nav config
import {_nav, _adminNav} from './_nav';

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);

  return (
    <CSidebar show={show} onShowChange={(val) => dispatch({type: 'set', sidebarShow: val})}>
      <CSidebarBrand className='d-md-down-none' to='/'>
        {/* <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        /> */}
        <CImg src={Logo} height={35} className='c-sidebar-brand-minimized' />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={localStorage.role === 'super-admin' ? _nav : _adminNav}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className='c-d-md-down-none' />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
