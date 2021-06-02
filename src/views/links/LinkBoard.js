import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fillLinks } from '../../actions/links'
import { useHistory } from 'react-router-dom'
import { LinkMore } from '../../reusable'
import api from "../../services/api"
import LinkCreate from './LinkCreate'

import {
  CBreadcrumb,
  CBreadcrumbItem,
  CButton,
  CCol,
  CListGroupItem,
  CModal,
  CRow,
} from '@coreui/react'

import {
  cilPlus,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

export default function LinkBoard() {

  const history = useHistory()
  const links = useSelector(state => state.links)
  const dispatch = useDispatch()

  const [modal, setModal] = useState(false)

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
            onClick={() => setModal(!modal)}
          >
            <CIcon content={cilPlus} />
          </CButton>
          <CModal
            show={modal}
            onClose={setModal}
          >
            <LinkCreate />
          </CModal>
        </CBreadcrumb>
      </CCol>
      <CCol xs="12" sm="12" md="12">
        {
          links.map(link => (
            <CListGroupItem
              key={link.id}
              color='light'
            >
              <a
                target='_blank'
                rel="noreferrer noopener"
                href={link.url} >
                {link.name !== null ? link.name : link.url}
              </a>
              <LinkMore to={() => history.push('/links/' + link.id)} />
            </CListGroupItem>
          ))
        }
      </CCol>
    </CRow>
  )
}