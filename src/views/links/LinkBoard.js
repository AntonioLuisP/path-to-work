import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fillLinks } from '../../actions/links'
import { useHistory } from 'react-router-dom'
import { More } from '../../reusable'
import api from "../../services/api"
import LinkCreate from './LinkCreate'
import { modalAction } from '../../actions/modalAction'

import {
  CBreadcrumb,
  CBreadcrumbItem,
  CButton,
  CCol,
  CListGroupItem,
  CRow,
} from '@coreui/react'

import {
  cilPlus,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

export default function LinkBoard() {

  const history = useHistory()
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
              <More to={() => history.push('/links/' + link.id)} />
            </CListGroupItem>
          ))
        }
      </CCol>
    </CRow>
  )
}