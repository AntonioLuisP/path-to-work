import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Actions as ActionLink } from '../../redux/link'
import { Actions as ActionNotification } from '../../redux/notifications'
import { useAuth } from '../../hooks/useAuth';

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
  CTextarea,
  CLabel,
  CInputCheckbox
} from '@coreui/react'

export default function LinkCreate() {

  const dispatch = useDispatch()

  const { user } = useAuth()
  const [load, setLoad] = useState(true)

  const [link, setLink] = useState({
    'name': '',
    'url': '',
    'favorite': false,
    'description': '',
  })

  async function handleCreate(e) {
    e.preventDefault();
    setLoad(false)

    dispatch(ActionLink.addOne(link))
    dispatch(ActionNotification.addOne({
      header: 'Link adicionado:',
      body: link.name,
      id: link.id,
    }))
    setLoad(true)
  }

  return (
    <>
      <CModalHeader closeButton>
        <CModalTitle>Novo Link</CModalTitle>
      </CModalHeader >
      <CForm onSubmit={handleCreate} className="form-horizontal">
        <CModalBody>
          <CFormGroup row>
            <CCol xs="10" md="10">
              <CInput
                id="text-input"
                name="text-input"
                placeholder="Nome"
                value={link.name}
                onChange={e => setLink({ ...link, 'name': e.target.value })}
              />
            </CCol>
            <CCol xs="2" md="2">
              <CFormGroup variant="custom-checkbox" inline>
                <CInputCheckbox
                  custom
                  id="inline-checkbox1"
                  name="inline-checkbox1"
                  value={link.favorite}
                  onChange={e => setLink({ ...link, 'favorite': !link.favorite })}
                />
                <CLabel variant="custom-checkbox" htmlFor="inline-checkbox1">Favoritar</CLabel>
              </CFormGroup>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol xs="12" md="12">
              <CInput
                id="text-input"
                name="text-input"
                placeholder="Url"
                type='url'
                required
                value={link.url}
                onChange={e => setLink({ ...link, 'url': e.target.value })}
              />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol xs="12" md="12">
              <CTextarea
                name="textarea-input"
                id="textarea-input"
                rows="3"
                maxLength='500'
                placeholder="Descrição..."
                value={link.description}
                onChange={e => setLink({ ...link, 'description': e.target.value })}
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