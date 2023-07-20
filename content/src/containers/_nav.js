import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name='cil-speedometer' customClasses='c-sidebar-nav-icon' />
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Pengkinian Data']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Admin',
    to: '/admin',
    icon: <CIcon name='cil-people' customClasses='c-sidebar-nav-icon' />
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Data',
    to: '/data',
    icon: <CIcon name='cil-people' customClasses='c-sidebar-nav-icon' />
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Claim',
    route: '/claim',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Semua Claim',
        to: '/data/claim'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Pengajuan',
        to: '/data/claim-request'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Proses',
        to: '/data/claim-process'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Approve',
        to: '/approve'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Reject',
        to: '/reject'
      }
    ]
  },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Whatsapp',
  //   to: '/message',
  //   icon: <CIcon name='cil-star' customClasses='c-sidebar-nav-icon' />
  // },

  {
    _tag: 'CSidebarNavTitle',
    _children: ['Content']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Data Realisasi',
    route: '/realisasi',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Pendidikan',
        to: '/realisasi/pendidikan'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Perumahan',
        to: '/realisasi/perumahan'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Kesehatan',
        to: '/realisasi/kesehatan'
      }
    ]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Banner',
    to: '/banner',
    icon: <CIcon name='cil-window' customClasses='c-sidebar-nav-icon' />
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Carousel',
    to: '/carousel',
    icon: <CIcon name='cil-star' customClasses='c-sidebar-nav-icon' />
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Berita',
    to: '/berita',
    icon: <CIcon name='cil-newspaper' customClasses='c-sidebar-nav-icon' />
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Galeri',
    to: '/galeri',
    icon: <CIcon name='cil-image' customClasses='c-sidebar-nav-icon' />
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Struktur',
    to: '/struktur',
    icon: <CIcon name='cil-building' customClasses='c-sidebar-nav-icon' />
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Testimoni',
    to: '/testimoni',
    icon: <CIcon name='cil-user' customClasses='c-sidebar-nav-icon' />
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Pesan',
    to: '/pesan',
    icon: <CIcon name='cil-inbox' customClasses='c-sidebar-nav-icon' />
  }
  // {
  //   _tag: 'CSidebarNavTitle',
  //   _children: ['Print'],
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Transfer',
  //   to: '/transfer',
  //   icon: <CIcon name='cil-star' customClasses='c-sidebar-nav-icon' />,
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'History',
  //   to: '/transfer/data',
  //   icon: <CIcon name='cil-puzzle' customClasses='c-sidebar-nav-icon' />,
  // },
]

const _adminNav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name='cil-speedometer' customClasses='c-sidebar-nav-icon' />
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Pengkinian Data']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Admin',
    to: '/admin',
    icon: <CIcon name='cil-people' customClasses='c-sidebar-nav-icon' />
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Data',
    to: '/data',
    icon: <CIcon name='cil-people' customClasses='c-sidebar-nav-icon' />
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Claim',
    route: '/claim',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Semua Claim',
        to: '/data/claim'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Pengajuan',
        to: '/data/claim-request'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Approve',
        to: '/approve'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Reject',
        to: '/reject'
      }
    ]
  }
]

export {_nav, _adminNav}
