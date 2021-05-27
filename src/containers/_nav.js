import React from 'react'
import {
  cilCursor,
  cilEducation,
  cilHome,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon content={cilHome} customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Link']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Links',
    to: '/links',
    icon: <CIcon content={cilCursor} customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Social',
    to: '/social',
    icon: <CIcon content={cilCursor} customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Projetos']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Projetos',
    to: '/projects',
    icon: <CIcon content={cilEducation} customClasses="c-sidebar-nav-icon" />,
  },
]

export default _nav
