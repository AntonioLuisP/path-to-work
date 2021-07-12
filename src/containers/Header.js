import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Actions as ActionSidebar } from '../redux/sidebar'
import { Logout } from '.'

import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CBreadcrumbRouter,
} from '@coreui/react'

import {
  cilCursor,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

import routes from '../routes'

const Header = () => {

  const dispatch = useDispatch()

  const sidebar = useSelector(state => state.sidebar)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebar) ? false : 'responsive'
    dispatch(ActionSidebar.showSwitch(val))
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebar) ? true : 'responsive'
    dispatch(ActionSidebar.showSwitch(val))
  }

  return (
    <CHeader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          content={cilCursor}
          height={35}
        />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
      </CHeaderNav>
      <Logout />
    </CHeader>
  )
}

export default Header
