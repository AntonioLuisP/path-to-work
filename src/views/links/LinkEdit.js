import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from '../../services/supabase'
import { Favorite } from '../../reusable/';
import { Actions as ActionNotification } from '../../redux/notifications'
import { Error } from '../../reusable'

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
} from '@coreui/react'

export default function LinkEdit(props) {

  const dispatch = useDispatch()

  const id = props.link.id
  const [load, setLoad] = useState(true)
  const [errors, setErrors] = useState([])

  const [name, setName] = useState(props.link.name)
  const [url, setUrl] = useState(props.link.url)
  const [is_favorite, setIs_favorite] = useState(props.link.is_favorite)
  const [description, setDescription] = useState(props.link.description)

  async function handleEdit(e) {
    e.preventDefault();
    setLoad(false)
    setErrors([])
    if (name.length < 3 || name.trim() === '') {
      setErrors(prev => [...prev, 'O nome deve ter mais que 3 digitos'])
    } else {
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
        setErrors(prev => [...prev, error.message])
      } else {
        props.edit(link)
        dispatch(ActionNotification.addOne({
          header: 'Link Editado:',
          body: link.name,
          id: link.id,
        }))
      }
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
              required
              value={name}
              valid={name.length > 2 && name.trim() !== ''}
              onChange={e => setName(e.target.value)}
            />
          </CCol>
          <CCol xs="2" md="2">
            <CFormGroup row>
              <CLabel >
                <Favorite favorito={is_favorite} action={() => setIs_favorite(prev => !prev)} />
              </CLabel>
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
              value={url}
              valid={url.length > 0}
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
        <Error errors={errors} />
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