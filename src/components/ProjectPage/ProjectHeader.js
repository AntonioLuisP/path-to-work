import React from 'react'
import { useDispatch } from 'react-redux'
import ProjectCreate from '../../views/projects/ProjectCreate'
import { Actions as ActionModal } from '../../redux/modal'

import {
  CBreadcrumb,
  CBreadcrumbItem,
  CButton,
} from '@coreui/react'

import {
  cilPlus,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

export default function ProjectHeader(props) {

  const dispatch = useDispatch()

  const toogleModal = () => {
    dispatch(ActionModal.modalSwitch(<ProjectCreate />))
  }

  return (
    <CBreadcrumb className="border-0 c-subheader-nav">
      <CBreadcrumbItem active>Seus Projetos</CBreadcrumbItem>
      <CButton
        onClick={toogleModal}
      >
        <CIcon content={cilPlus} />
      </CButton>
    </CBreadcrumb>
  )
}