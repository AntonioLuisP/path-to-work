import React from 'react'
import {
  cilCursor,
  cilEducation,
  cilHome,
  cilPenAlt,
  cilShortText,
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
    to: '/theme/colors',
    icon: <CIcon content={cilCursor} customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Projetos de Estudo']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Projetos',
    to: '/projects',
    icon: <CIcon content={cilEducation} customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Questões']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Questões',
    to: '/questions',
    icon: <CIcon content={cilShortText} customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Anotações']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Anotações',
    to: '/anotations',
    icon: <CIcon content={cilPenAlt} customClasses="c-sidebar-nav-icon" />,
  },
]

export default _nav
