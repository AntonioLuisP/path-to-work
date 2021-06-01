import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { SeeMore, ToasterNotification } from '../../reusable'
import api from "../../services/api"

import {
  CBreadcrumb,
  CBreadcrumbItem,
  CButton,
  CCard,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CRow,
} from '@coreui/react'

export default function LinkBoard() {

  const history = useHistory()

  const [load, setLoad] = useState(true)
  const [url, setUrl] = useState('')
  const [notifications, setNotifications] = useState({})
  const [links, setLinks] = useState([])

  useEffect(() => {
    api.get('link')
      .then(response => {
        if (response.status === 200) {
          setLinks(response.data.data)
        }
      })
  }, [])

  async function handleCreate(e) {
    e.preventDefault();
    setLoad(false)
    const data = {
      url,
    }
    try {
      await api.post('link', data, {})
        .then(response => {
          if (response.status === 200) {
            setLinks([...links, response.data])
            setNotifications({
              header: 'Link adicionado:',
              body: response.data.name,
              id: response.data.id,
            })
          }
        })
    } catch (error) {
      alert("erro")
      console.log(error)
    } finally {
      setLoad(true)
    }
  }

  return (
    <CRow>
      <ToasterNotification notificaton={notifications} />
      <CCol xs="12" sm="12" md="12">
        <CForm onSubmit={handleCreate} className="form-horizontal">
          <CFormGroup row>
            <CCol xl="12" md="12" sm="12">
              <CInputGroup>
                <CInput
                  id="text-input"
                  name="text-input"
                  placeholder="Link"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                />
                <CInputGroupAppend>
                  <CButton type="submit" color="success" disabled={!load}>
                    {
                      load ? 'Adicionar' : (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />)
                    }
                  </CButton>
                </CInputGroupAppend>
              </CInputGroup>
            </CCol>
          </CFormGroup>
        </CForm>
      </CCol>
      <CCol xs="12" sm="12" md="12">
        <CBreadcrumb className="border-0 c-subheader-nav">
          <CBreadcrumbItem active>Seus Links</CBreadcrumbItem>
        </CBreadcrumb>
        <CRow>
          {
            links.map(link => (
              <CCol xs="12" sm="12" md="12" key={link.id}>
                <CCard>
                  <CCardHeader color="secondary">
                    {link.name}
                    <div className="card-header-actions">
                      <SeeMore to={() => history.push('/links/' + link.id)} />
                    </div>
                  </CCardHeader>
                </CCard>
              </CCol>
            ))
          }
        </CRow>
      </CCol>
    </CRow>
  )
}