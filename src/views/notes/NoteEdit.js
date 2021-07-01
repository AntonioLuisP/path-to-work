import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Actions as ActionNote } from '../../redux/note'
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

export default function NoteEdit(props) {

  const dispatch = useDispatch()

  const id = props.note.id
  const [load, setLoad] = useState(true)
  const [name, setName] = useState(props.note.name)

  async function handleEdit(e) {
    e.preventDefault();
    setLoad(false)
    const { data: note, error } = await supabase
      .from("notes")
      .update({
        name,
      })
      .eq('id', id)
      .single()
    if (error) {
      alert("error", error)
      return;
    } else {
      dispatch(ActionNote.selectOne(note))
      dispatch(ActionNotification.addOne({
        header: 'Anotação Editada:',
        body: note.name,
        id: note.id,
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
          <CCol xs="12" md="12">
            <CInput
              id="text-input"
              name="text-input"
              placeholder="Nome"
              value={name}
              onChange={e => setName(e.target.value)}
            />
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