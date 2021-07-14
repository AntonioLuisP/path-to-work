import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAuth } from '../../hooks/useAuth';
import { supabase } from 'src/services/supabase';
import { Actions as ActionNotification } from '../../redux/notifications'
import { Error, LoadButton } from '../../reusable'

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

export default function TodoCreate({ taskId, add }) {

  const dispatch = useDispatch()

  const { authUser } = useAuth()

  const [load, setLoad] = useState(true)
  const [errors, setErrors] = useState([])

  const [name, setName] = useState('')

  async function handleCreate(e) {
    e.preventDefault();
    setLoad(false)
    setErrors([])
    if (name.length < 3 || name.trim() === '') {
      setErrors(prev => [...prev, 'O nome deve ter mais que 3 digitos'])
    } else {
      const { data: todo, error } = await supabase
        .from("todos")
        .insert({
          name,
          task_id: taskId,
          user_id: authUser.id
        })
        .single();
      if (error) {
        alert("error", error)
      } else {
        add(todo)
        dispatch(ActionNotification.addOne({
          header: 'Afazer adicionado: ',
          body: todo.name,
          id: todo.id,
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
      <CForm onSubmit={handleCreate} className="form-horizontal">
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
          <LoadButton load={load} />
        </CModalFooter>
      </CForm>
    </>
  )
}