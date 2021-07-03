import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
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
} from '@coreui/react'

export default function TodoEdit({todo, edit}) {

  const dispatch = useDispatch()

  const id = todo.id
  const [load, setLoad] = useState(true)
  const [name, setName] = useState(todo.name)
  const [conclusion, setConclusion] = useState(todo.conclusion)

  async function handleEdit(e) {
    e.preventDefault();
    setLoad(false)
    const { data: todo, error } = await supabase
      .from("todos")
      .update({
        name,
        conclusion
      })
      .eq('id', id)
      .single()
    if (error) {
      alert("error", error)
      return;
    } else {
      edit(todo)
      dispatch(ActionNotification.addOne({
        header: 'Afazer Editado:',
        body: todo.name,
        id: todo.id,
      }))
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
          <CCol xs="9" md="9">
            <CInput
              id="text-input"
              name="text-input"
              placeholder="Nome"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </CCol>
          <CCol xs="3" md="3">
            <CFormGroup>
              <CInput
                id="text-input"
                name="text-input"
                type="button"
                placeholder="Nome"
                className='btn btn-warning'
                value={conclusion ? 'Refazer' : 'Concluir'}
                onClick={() => setConclusion(prev => !prev)}
              />
            </CFormGroup>
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