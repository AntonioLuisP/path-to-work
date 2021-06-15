import React from 'react'
import ProjectCreate from '../../views/projects/ProjectCreate'
import { useModal, Actions as ActionModal } from '../../context/ModalContext'

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

  const [, setModal] = useModal()

  const toogleModal = () => {
    setModal(ActionModal.modalSwitch(<ProjectCreate />))
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