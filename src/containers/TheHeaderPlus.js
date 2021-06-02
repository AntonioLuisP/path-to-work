import React, { useState } from 'react'
import TaskCreate from '../views/tasks/TaskCreate'

import {
  CButton,
  CHeaderNav,
  CHeaderNavItem,
  CModal,
  CTooltip,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import {
  cilPlus,
} from '@coreui/icons'

const TheHeaderPlus = () => {

  const [modal, setModal] = useState(false)

  return (
    <CHeaderNav className="d-md-down-none mr-auto">
      <CHeaderNavItem className="px-3" >
        <CTooltip
          content='Novo Projeto'
          placement='bottom'
        >
          <CButton
            onClick={() => setModal(!modal)}
          >
            <CIcon content={cilPlus} />
          </CButton>
        </CTooltip>
        <CModal
          show={modal}
          onClose={setModal}
        >
          <TaskCreate />
        </CModal>
      </CHeaderNavItem>
    </CHeaderNav>
  )
}

export default TheHeaderPlus
