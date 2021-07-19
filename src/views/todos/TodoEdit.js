import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from '../../services/supabase'
import { Actions as ActionNotification } from '../../redux/notifications'
import { Error, LoadButton, NosignalBadge } from '../../reusable'

import {
  CCol,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormGroup,
  CInput,
} from '@coreui/react'

export default function TodoEdit({ todo, edit }) {

  const dispatch = useDispatch()

  const id = todo.id
  const sinal = navigator.onLine

  const [load, setLoad] = useState(true)
  const [errors, setErrors] = useState([])

  const [name, setName] = useState(todo.name)

  async function handleEdit(e) {
    e.preventDefault();
    setLoad(false)
    setErrors([])
    if (name.length < 3 || name.trim() === '') {
      setErrors(prev => [...prev, 'O nome deve ter mais que 3 digitos'])
    } else {
      const { data: todo, error } = await supabase
        .from("todos")
        .update({
          name
        })
        .eq('id', id)
        .single()
      if (error) {
        setErrors(prev => [...prev, error.message])
      } else {
        edit(todo)
        dispatch(ActionNotification.addOne({
          header: 'Afazer Editado:',
          body: todo.name,
          id: todo.id,
        }))
      }
    }
    setLoad(true)
  }

  return (
    <CForm onSubmit={handleEdit} className="form-horizontal">
      <CModalHeader>
        <CModalTitle>Editar Anotação</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormGroup row>
          <CCol xs="12" md="12" sm='12'>
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
      </CModalFooter>
    </CForm>
  )
}