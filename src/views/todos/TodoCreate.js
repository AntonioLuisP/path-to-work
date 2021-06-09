import React, { useState } from 'react'
import api from "../../services/api"
import { useDispatch } from 'react-redux'
import { addTodo } from '../../actions/todos'
import { addNotification } from '../../actions/notifications'

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

export default function TodoCreate(props) {

  const dispatch = useDispatch()

  const [load, setLoad] = useState(true)

  const task = props.task

  const [todo, setTodo] = useState({
    'todo': '',
    'id_task': '',
  })

  async function handleCreate(e) {
    e.preventDefault();
    setLoad(false)
    const data = {
      'name': todo.name,
      'id_task': task.id,
    }
    try {
      await api.post('todo', data, {})
        .then(response => {
          if (response.status === 200) {
            dispatch(addTodo(response.data))
            dispatch(addNotification({
              header: 'Afazer adicionado:',
              body: response.data.todo,
              id: response.data.id,
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
    <>
      <CModalHeader closeButton>
        <CModalTitle>Novo Afazer</CModalTitle>
      </CModalHeader >
      <CForm onSubmit={handleCreate} className="form-horizontal">
        <CModalBody>
          <CFormGroup row>
            <CCol xs="12" md="12">
              <CInput
                id="text-input"
                name="text-input"
                placeholder="nome"
                value={todo.name}
                onChange={e => setTodo(todo => ({ ...todo, 'name': e.target.value }))}
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