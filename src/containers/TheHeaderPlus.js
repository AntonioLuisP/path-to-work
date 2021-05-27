import React from 'react'
import {
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CTooltip
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPlus,
} from '@coreui/icons'

const TheHeaderPlus = () => {
  return (
    <CHeaderNav className="d-md-down-none mr-auto">
      <CHeaderNavItem className="px-3" >
        <CTooltip
          content='Novo Projeto'
          placement='bottom'
        >
          <CHeaderNavLink to="/projects/create">
            <CIcon content={cilPlus} />
          </CHeaderNavLink>
        </CTooltip>
      </CHeaderNavItem>
    </CHeaderNav>
  )
}

export default TheHeaderPlus
