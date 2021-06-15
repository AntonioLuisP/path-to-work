import React, { useState } from 'react'
import api from "../../services/api"
import { useDispatch } from 'react-redux'
import { Actions as ActionLink } from '../../redux/links'
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
} from '@coreui/react'

export default function LinkCreate() {

  const [, setNotifications] = useNotifications()

  const dispatch = useDispatch()

  const [load, setLoad] = useState(true)

  const [link, setLink] = useState({
    'name': '',
    'url': '',
  })

  async function handleCreate(e) {
    e.preventDefault();
    setLoad(false)
    const data = {
      'name': link.name,
      'url': link.url
    }
    try {
      await api.post('link', data, {})
        .then(response => {
          if (response.status === 200) {
            dispatch(ActionLink.addOne(response.data))
            setNotifications(ActionNotification.addOne({
              header: 'Link adicionado:',
              body: response.data.name,
              id: response.data.id,
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
    <>
      <CModalHeader closeButton>
        <CModalTitle>Novo Link</CModalTitle>
      </CModalHeader >
      <CForm onSubmit={handleCreate} className="form-horizontal">
        <CModalBody>
          <CFormGroup row>
            <CCol xs="12" md="12">
              <CInput
                id="text-input"
                name="text-input"
                placeholder="Nome"
                value={link.name}
                onChange={e => setLink({ ...link, 'name': e.target.value })}
              />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol xs="12" md="12">
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
              load ? 'Adicionar' : (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />)
            }
          </CButton>
        </CModalFooter>
      </CForm>
    </>
  )
}