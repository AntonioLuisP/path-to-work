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
  CLabel,
  CTextarea,
  CInputCheckbox
} from '@coreui/react'

export default function LinkEdit(props) {

  const dispatch = useDispatch()

  const [load, setLoad] = useState(true)
  const [link, setLink] = useState({
    ...props.link,
    'description': props.link.description === null ? '' : props.link.description
  })

  async function handleEdit(e) {
    e.preventDefault();
    setLoad(false)
    try {
      await api.put('/link/' + link.id, link, {})
        .then(response => {
          if (response.status === 200) {
            dispatch(ActionLink.selectOne(link))
            dispatch(ActionNotification.addOne({
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
                checked={link.favorite}
                onChange={e => setLink({ ...link, 'favorite': !link.favorite })}
              />
              <CLabel variant="custom-checkbox" htmlFor="inline-checkbox1">Favoritar</CLabel>
            </CFormGroup>
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
            load ? 'Salvar' : (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />)
          }
        </CButton>
      </CModalFooter>
    </CForm>

  )
}