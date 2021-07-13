import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAuth } from '../../hooks/useAuth';
import { supabase } from 'src/services/supabase';
import { Actions as ActionNotification } from '../../redux/notifications'

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

} from '@coreui/react'

export default function TodoCreate({ taskId, add }) {

  const dispatch = useDispatch()

  const { authUser } = useAuth()

  const [load, setLoad] = useState(true)
  const [name, setName] = useState('')

  async function handleCreate(e) {
    e.preventDefault();
    setLoad(false)
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
                onChange={e => setName(e.target.value)}
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