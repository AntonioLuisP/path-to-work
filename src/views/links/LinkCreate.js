import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../services/supabase';
import { Favorite } from '../../reusable/';
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
  CLabel,
} from '@coreui/react'

export default function LinkCreate({ add }) {

  const dispatch = useDispatch()

  const { authUser } = useAuth()

  const sinal = navigator.onLine
  const [load, setLoad] = useState(true)
  const [errors, setErrors] = useState([])

  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [is_favorite, setIs_favorite] = useState(false)
  const [description, setDescription] = useState('')

  async function handleCreate() {
    setLoad(false)
    setErrors([])
    if (name.length < 3 || name.trim() === '') {
      setErrors(prev => [...prev, 'O nome deve ter mais que 3 digitos'])
    } else {
      const { data: link, error } = await supabase
        .from("links")
        .insert({
          name,
          url,
          is_favorite,
          description,
          user_id: authUser.id
        })
        .single();
      if (error) {
        setErrors(prev => [...prev, error.message])
      } else {
        add(link)
        dispatch(ActionNotification.addOne({
          header: 'Link adicionado:',
          body: link.name,
          id: link.id,
        }))
      }
    }
    setLoad(true)
  }

  return (
    <>
      <CModalHeader closeButton>
        <CModalTitle>Novo Link</CModalTitle>
      </CModalHeader >
      <Form onSubmit={handleCreate} >
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
          {errors.length > 0 ? <Error errors={errors} /> : <></>}
        </CModalBody>
        <CModalFooter>
          {!sinal ? (<NosignalBadge />) : <LoadButton load={load} />}
        </CModalFooter>
      </Form>
    </>
  )
}