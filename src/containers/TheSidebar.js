import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavItem,
  CSidebarNavDropdown
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import {
  cilCursor,
  cilHome,
  cilList,
} from '@coreui/icons'

import Items from './Items'

const TheSidebar = () => {

  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none text-center" >
        Path Work
      </CSidebarBrand>
      <CSidebarNav>
        <CSidebarNavItem
          name="Dashboard"
          to="/dashboard"
          icon={<CIcon content={cilHome} customClasses="c-sidebar-nav-icon" />}
        />
        <CSidebarNavTitle>Link</CSidebarNavTitle>
        <CSidebarNavItem
          name="Links"
          to="/links"
          icon={<CIcon content={cilCursor} customClasses="c-sidebar-nav-icon" />}
        />
        <CSidebarNavItem
          name="Social"
          to="/social"
          icon={<CIcon content={cilCursor} customClasses="c-sidebar-nav-icon" />}
        />
        <CSidebarNavTitle>Projetos</CSidebarNavTitle>
        <CSidebarNavDropdown
          name="Todos Projetos"
          to="/projects"
          icon={<CIcon content={cilList} customClasses="c-sidebar-nav-icon" />}
        >
          <Items />
        </CSidebarNavDropdown>
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  )
}

export default React.memo(TheSidebar)