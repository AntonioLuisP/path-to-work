import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from '../../services/supabase'
import { Actions as ActionNotification } from '../../redux/notifications'
import { Error, LoadButton, NosignalBadge, Form } from '../../reusable'

import {
  CCol,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormGroup,
  CInput,
  CTextarea,
} from '@coreui/react'

export default function LinkEdit(props) {

  const dispatch = useDispatch()

  const id = props.link.id
  const sinal = navigator.onLine

  const [load, setLoad] = useState(true)
  const [errors, setErrors] = useState([])

  const [name, setName] = useState(props.link.name)
  const [url, setUrl] = useState(props.link.url)
  const [description, setDescription] = useState(props.link.description)

  async function handleEdit() {
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
    <Form onSubmit={handleEdit} >
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
              required
              value={name}
              valid={name.length > 2 && name.trim() !== ''}
              onChange={e => setName(e.target.value)}
            />
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
        {!sinal ? (<NosignalBadge />) : <LoadButton load={load} />}
      </CModalFooter>
    </Form>
  )
}