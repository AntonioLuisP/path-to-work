import React from 'react'
import { useDispatch } from 'react-redux'
import LinkComponent  from './LinkComponent'
import LinkCreate from '../../views/links/LinkCreate'
import { modalAction } from '../../actions/modalAction'

import {
  CBreadcrumb,
  CBreadcrumbItem,
  CButton,
  CCol,
  CRow,
} from '@coreui/react'

import {
  cilPlus,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

export default function LinkBoard(props) {

  const dispatch = useDispatch()

  const links = props.links
  
  const toogleModal = () => {
    dispatch(modalAction(<LinkCreate />))
  }

  return (
    <CRow>
      <CCol xs="12" sm="12" md="12">
        <CBreadcrumb className="border-0 c-subheader-nav">
          <CBreadcrumbItem active>Seus Links</CBreadcrumbItem>
          <CButton
            onClick={toogleModal}
          >
            <CIcon content={cilPlus} />
          </CButton>
        </CBreadcrumb>
        {
          links.map(link => (
            <LinkComponent key={link.id} link={link} />
          ))
        }
      </CCol>
    </CRow>
  )
}