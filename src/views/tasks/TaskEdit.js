import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from '../../services/supabase'
import { Actions as ActionNotification } from '../../redux/notifications'

import {
  CButton,
  CCol,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CCardTitle,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CTextarea
} from '@coreui/react'

export default function TaskEdit(props) {

  const dispatch = useDispatch()

  const id = props.task.id
  const [load, setLoad] = useState(true)
  const [name, setName] = useState(props.task.name)
  const [description, setDescription] = useState(props.task.description)
  const [limite_date, setLimite_date] = useState(props.task.limite_date === null ? '' : props.task.limite_date)
  const [horario, setHorario] = useState(props.task.horario === null ? '' : props.task.horario)
  const [conclusion, setConclusion] = useState(props.task.conclusion)

  async function handleEdit(e) {
    e.preventDefault();
    setLoad(false)
    const { data: task, error } = await supabase
      .from("tasks")
      .update({
        name,
        description,
        limite_date: limite_date === '' ? null : limite_date,
        horario: horario === '' ? null : horario,
        conclusion
      })
      .eq('id', id)
      .single()
    if (error) {
      alert("error", error)
    } else {
      props.edit(task)
      dispatch(ActionNotification.addOne({
        header: 'Tarefa Editada:',
        body: task.name,
        id: task.id,
      }))
    }
    setLoad(true)
  }

  return (
    <>
      <CForm onSubmit={handleEdit} className="form-horizontal">
        <CModalHeader>
          <CCardTitle>Editar Tarefa</CCardTitle>
        </CModalHeader>
        <CModalBody>
          <CFormGroup row>
            <CCol xs="12" md="12">
              <CInput
                id="text-input"
                name="text-input"
                placeholder="Nome"
                value={name}
                onChange={e => setName(e.target.value)} />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol xs="4" md="4">
              <CLabel htmlFor="text-input">Data Limite</CLabel>
              <CInput
                id="text-input"
                name="text-input"
                type="date"
                value={limite_date}
                onChange={e => setLimite_date(e.target.value)}
              />
            </CCol>
            <CCol xs="4" md="4">
              <CLabel htmlFor="text-input">Hora da tarefa</CLabel>
              <CInput
                id="text-input"
                name="text-input"
                type="time"
                value={horario}
                onChange={e => setHorario(e.target.value)}
              />
            </CCol>
            <CCol xs="4" md="4">
              <CFormGroup>
                <CLabel htmlFor="text-input"> Status: {conclusion ? '' : 'Não '} Concluída</CLabel>
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
          <CFormGroup row>
            <CCol xs="12" md="12">
              <CTextarea
                name="textarea-input"
                id="textarea-input"
                rows="3"
                maxLength='500'
                placeholder="Descrição..."
                value={description}
                onChange={e => setDescription(e.target.value)} />
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
    </>
  )
}