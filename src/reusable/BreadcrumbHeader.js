import React from 'react'
import { useDispatch } from 'react-redux'
import { Actions as ActionModal } from '../redux/modal'
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

  const dispatch = useDispatch()

  const toogleModal = () => {
    dispatch(ActionModal.modalSwitch(true, component))
  }

  return (
    <CBreadcrumb className="border-0 c-subheader-nav">
      <CBreadcrumbItem active>{title}</CBreadcrumbItem>
      <CButton
        onClick={toogleModal}
      >
        <CIcon content={cilPlus} />
      </CButton>
      <Modal />
    </CBreadcrumb>
  )
}