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

export default function BreadcrumbHeader({ title, quantidade, component }) {

  const [modal, setModal] = useState(false)

  const toogleModal = () => {
    setModal(old => !old)
  }

  return (
    <>
      <CBreadcrumb className="c-subheader-nav justify-content-between">
        <CBreadcrumbItem active>{title + ' (' + quantidade + ')'} </CBreadcrumbItem>
        <Modal show={modal} onClose={toogleModal} component={component} />
        <div className="d-md-down-none mfe-2 c-subheader-nav">
          <CButton
            onClick={toogleModal}
          >
            <CIcon content={cilPlus} />
          </CButton>
        </div>
      </CBreadcrumb>
    </>
  )
}