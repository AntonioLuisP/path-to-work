import React, { useState } from 'react'
import { Modal } from '../reusable'
import TaskCreate from '../views/tasks/TaskCreate'

import {
  CButton,
  CHeaderNav,
  CHeaderNavItem,
  CTooltip,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import {
  cilPlus,
} from '@coreui/icons'

const TheHeaderPlus = () => {

  const [modal, setModal] = useState(false)

  const toogleModal = () => {
    setModal(old => !old)
  }

  return (
    <>
      <Modal show={modal} onClose={toogleModal} component={<TaskCreate />} />
      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3" >
          <CTooltip
            content='Nova Tarefa'
            placement='bottom'
          >
            <CButton
              onClick={toogleModal}
            >
              <CIcon content={cilPlus} />
            </CButton>
          </CTooltip>
        </CHeaderNavItem>
      </CHeaderNav>
    </>
  )
}

export default TheHeaderPlus
