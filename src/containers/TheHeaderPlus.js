import React from 'react'
import { useDispatch } from 'react-redux'
import { modalAction } from '../actions/modalAction'
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

  const dispatch = useDispatch()

  const toogleModal = () => {
    dispatch(modalAction(<TaskCreate />))
  }

  return (
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
  )
}

export default TheHeaderPlus
