import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Actions as ActionLink } from '../../redux/link'
import { Actions as ActionNotification } from '../../redux/notifications'
import { supabase } from '../../services/supabase'

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

  const id = props.link.id
  const [load, setLoad] = useState(true)
  const [name, setName] = useState(props.link.name)
  const [url, setUrl] = useState(props.link.url)
  const [is_favorite, setIs_favorite] = useState(props.link.is_favorite)
  const [description, setDescription] = useState(props.link.description)

  async function handleEdit(e) {
    e.preventDefault();
    setLoad(false)
    const { data: link, error } = await supabase
      .from("links")
      .update({
        name,
        url,
        is_favorite,
        description,
      })
      .eq('id', id)
      .single()
    if (error) {
      alert("error", error)
      return;
    } else {
      dispatch(ActionLink.selectOne(link))
      dispatch(ActionNotification.addOne({
        header: 'Link Editado:',
        body: link.name,
        id: link.id,
      }))
    }
    setLoad(true)
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
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </CCol>
          <CCol xs="2" md="2">
            <CFormGroup variant="custom-checkbox" inline>
              <CInputCheckbox
                custom
                id="inline-checkbox1"
                name="inline-checkbox1"
                checked={is_favorite}
                onChange={e => setIs_favorite(prev => !prev)}
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
              value={url}
              onChange={e => setUrl(e.target.value)}
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
              value={description}
              onChange={e => setDescription(e.target.value)}
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