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
} from '@coreui/react'

export default function NoteEdit({ note, edit }) {

  const dispatch = useDispatch()

  const id = note.id
  const sinal = navigator.onLine

  const [load, setLoad] = useState(true)
  const [errors, setErrors] = useState([])

  const [name, setName] = useState(note.name)

  async function handleEdit() {
    setLoad(false)
    setErrors([])
    if (name.length < 3 || name.trim() === '') {
      setErrors(prev => [...prev, 'O nome deve ter mais que 3 digitos'])
    } else {
      try {
        const { data: note, error } = await supabase
          .from("notes")
          .update({
            name,
          })
          .eq('id', id)
          .single()
        if (error) {
          setErrors(prev => [...prev, error.message])
        } else {
          edit(note)
          dispatch(ActionNotification.addOne({
            header: 'Anotação Editada:',
            body: note.name,
            id: note.id,
          }))
        }
      } catch (error) {
        setErrors(prev => [...prev, error.message])
      }
    }
    setLoad(true)
  }

  return (
    <Form onSubmit={handleEdit} >
      <CModalHeader closeButton>
        <CModalTitle>Editar Anotação</CModalTitle>
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
        {errors.length > 0 ? <Error errors={errors} /> : <></>}
      </CModalBody>
      <CModalFooter>
        {!sinal ? (<NosignalBadge />) : <LoadButton load={load} />}
      </CModalFooter>
    </Form>
  )
}