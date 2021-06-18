import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Actions as ActionLink } from '../../redux/link'
import { Actions as ActionNotification } from '../../redux/notifications'
import api from "../../services/api"

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

  const [load, setLoad] = useState(true)

  const [link, setLink] = useState({
    'name': '',
    'url': '',
    'favorite': false,
    'description': '',
  })

  console.log(link.favorite)
  async function handleCreate(e) {
    e.preventDefault();
    setLoad(false)
    const data = {
      'name': link.name,
      'url': link.url,
      'favorite': link.favorite,
      'description': link.description,
    }
    try {
      await api.post('link', data, {})
        .then(response => {
          if (response.status === 200) {
            if (data.favorite) {
              dispatch(ActionLink.addOne(response.data))
            }
            dispatch(ActionNotification.addOne({
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