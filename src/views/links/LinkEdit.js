import React, { useState } from 'react'
import api from "../../services/api"
import { useNotifications, Actions as ActionNotification } from '../../context/NotificationsContext'

import {
  CButton,
  CCol,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
} from '@coreui/react'

export default function LinkEdit(props) {

  const [, setNotifications] = useNotifications()

  const [load, setLoad] = useState(true)
  const [link, setLink] = useState(props.link)

  async function handleEdit(e) {
    e.preventDefault();
    setLoad(false)
    const data = {
      'name': link.name,
      'url': link.url
    }
    try {
      await api.put('/link/' + link.id, data, {})
        .then(response => {
          if (response.status === 200) {
            setNotifications(ActionNotification.addOne({
              header: 'Link Editado:',
              body: link.name,
              id: link.id,
            }))
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
    <CForm onSubmit={handleEdit} className="form-horizontal">
      <CModalHeader>
        <CModalTitle>Editar Link</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormGroup row>
          <CCol xs="12" md="12">
            <CInput
              id="text-input"
              name="text-input"
              placeholder="Nome"
              value={link.name}
              onChange={e => setLink({ ...link, 'name': e.target.value })} />
          </CCol>
        </CFormGroup>
        <CFormGroup row>
          <CCol xs="12" md="12">
            <CLabel htmlFor="text-input">Link</CLabel>
            <CInput
              id="text-input"
              name="text-input"
              placeholder="Url"
              value={link.url}
              onChange={e => setLink({ ...link, 'url': e.target.value })}
            />
          </CCol>
        </CFormGroup>
      </CModalBody>
      <CModalFooter>
        <CButton type="submit" color="success" disabled={!load}>
          {
            load ? 'Salvar' : (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />)
          }
        </CButton>
      </CModalFooter>
    </CForm>

  )
}