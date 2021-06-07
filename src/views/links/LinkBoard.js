import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fillLinks } from '../../actions/links'
import { LinkComponent } from '../../components'
import api from "../../services/api"
import LinkCreate from './LinkCreate'
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

export default function LinkBoard() {

  const dispatch = useDispatch()

  const links = useSelector(state => state.links)

  const toogleModal = () => {
    dispatch(modalAction(<LinkCreate />))
  }

  useEffect(() => {
    api.get('link')
      .then(response => {
        if (response.status === 200) {
          dispatch(fillLinks(response.data.data))
        }
      })
  }, [dispatch])

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
      </CCol>
      <CCol xs="12" sm="12" md="12">
        {
          links.map(link => (
            <LinkComponent key={link.id} link={link} />
          ))
        }
      </CCol>
    </CRow>
  )
}