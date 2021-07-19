import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from 'src/services/supabase';
import { useAuth } from '../../hooks/useAuth';
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
} from '@coreui/react'

export default function NoteCreate({ linkId, add }) {

  const dispatch = useDispatch()

  const { authUser } = useAuth()

  const sinal = navigator.onLine
  const [load, setLoad] = useState(true)
  const [errors, setErrors] = useState([])

  const [name, setName] = useState('')

  async function handleCreate() {
    setLoad(false)
    setErrors([])
    if (name.length < 3 || name.trim() === '') {
      setErrors(prev => [...prev, 'O nome deve ter mais que 3 digitos'])
    } else {
      const { data: note, error } = await supabase
        .from("notes")
        .insert({
          name,
          link_id: linkId,
          user_id: authUser.id
        })
        .single();
      if (error) {
        setErrors(prev => [...prev, error.message])
      } else {
        add(note)
        dispatch(ActionNotification.addOne({
          header: 'Anotação adicionada:',
          body: note.name,
          id: note.id,
        }))
      }
    }
    setLoad(true)
  }

  return (
    <>
      <CModalHeader closeButton>
        <CModalTitle>Nova Anotação</CModalTitle>
      </CModalHeader >
      <Form onSubmit={handleCreate} >
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
          <Error errors={errors} />
        </CModalBody>
        <CModalFooter>
          {!sinal ? (<NosignalBadge />) : <LoadButton load={load} />}
          {!sinal ? (<NosignalBadge />) : <LoadButton load={load} />}
        </CModalFooter>
      </Form>
    </>
  )
}