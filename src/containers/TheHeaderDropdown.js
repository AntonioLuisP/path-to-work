import React from 'react'
import { useHistory } from 'react-router'
import { useAuth } from '../hooks/useAuth'

import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'

import {
  cilAccountLogout,
  cilUser,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

const TheHeaderDropdown = () => {

  const history = useHistory()
  const { handleLogout } = useAuth()

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon content={cilUser} className="mfe-2" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Conta</strong>
        </CDropdownItem>
        <CDropdownItem onClick={() => history.push('/user')}>
          <CIcon content={cilUser} className="mfe-2" />Profile
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={() => handleLogout()}>
          <CIcon content={cilAccountLogout} className="mfe-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
