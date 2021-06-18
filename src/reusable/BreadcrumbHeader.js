import React, { useState } from 'react'
import { Modal } from '../reusable'

import {
  CBreadcrumb,
  CBreadcrumbItem,
  CButton,
} from '@coreui/react'

import {
  cilPlus,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

export default function BreadcrumbHeader({ title, component }) {

  const [modal, setModal] = useState(false)

  const toogleModal = () => {
    setModal(old => !old)
  }

  return (
    <CBreadcrumb className="border-0 c-subheader-nav">
      <CBreadcrumbItem active>{title}</CBreadcrumbItem>
      <CButton
        onClick={toogleModal}
      >
        <CIcon content={cilPlus} />
      </CButton>
      <Modal show={modal} onClose={toogleModal} component={component} />
    </CBreadcrumb>
  )
}