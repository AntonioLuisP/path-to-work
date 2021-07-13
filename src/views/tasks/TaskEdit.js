import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from '../../services/supabase'
import { Actions as ActionNotification } from '../../redux/notifications'
import { Error } from '../../reusable'
import { backDate, backTime, makeDate } from '../../services/FormatDate'

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
  const [errors, setErrors] = useState([])

  const [name, setName] = useState(props.task.name)
  const [description, setDescription] = useState(props.task.description)
  const [day, setDay] = useState(props.task.day_of === null ? '' : backDate(props.task.day_of))
  const [time, setTime] = useState(props.task.day_of === null ? '' : backTime(props.task.day_of))
  const [conclusion, setConclusion] = useState(props.task.conclusion)

  async function handleEdit(e) {
    e.preventDefault();
    setLoad(false)
    setErrors([])
    if (name.length < 3 || name.trim() === '') {
      setErrors(prev => [...prev, 'O nome deve ter mais que 3 digitos'])
    } else {
      const { data: task, error } = await supabase
        .from("tasks")
        .update({
          name,
          description,
          day_of: makeDate(day, time),
          conclusion
        })
        .eq('id', id)
        .single()
      if (error) {
        setErrors(prev => [...prev, error.message])
      } else {
        props.edit(task)
        dispatch(ActionNotification.addOne({
          header: 'Tarefa Editada:',
          body: task.name,
          id: task.id,
        }))
      }
    }
    setLoad(true)
  }

  return (
    <>
      <CForm onSubmit={handleEdit} className="form-horizontal">
        <CModalHeader closeButton>
          <CCardTitle>Editar Tarefa</CCardTitle>
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
                onChange={e => setName(e.target.value)} />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol xs="4" md="4">
              <CLabel htmlFor="text-input">Data Limite</CLabel>
              <CInput
                id="text-input"
                name="text-input"
                required={time.length > 0}
                type="date"
                value={day}
                onChange={e => setDay(e.target.value)}
              />
            </CCol>
            <CCol xs="4" md="4">
              <CLabel htmlFor="text-input">Hora da tarefa</CLabel>
              <CInput
                id="text-input"
                name="text-input"
                required={day.length > 0}
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
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
                invalid={description.length > 500}
                onChange={e => setDescription(e.target.value)} />
            </CCol>
          </CFormGroup>
          <Error errors={errors} />
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