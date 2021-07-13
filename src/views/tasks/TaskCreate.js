import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAuth } from '../../hooks/useAuth';
import { supabase } from 'src/services/supabase';
import { Actions as ActionNotification } from '../../redux/notifications'
import { Error } from '../../reusable'

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
  CLabel,
  CTextarea,
} from '@coreui/react'

export default function TaskCreate({ add }) {

  const dispatch = useDispatch()

  const { authUser } = useAuth()

  const [load, setLoad] = useState(true)
  const [errors, setErrors] = useState([])

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [limite_date, setLimite_date] = useState('')
  const [horario, setHorario] = useState('')

  async function handleCreate(e) {
    e.preventDefault();
    setLoad(false)
    setErrors([])
    if (name.length < 3 || name.trim() === '') {
      setErrors(prev => [...prev, 'O nome deve ter mais que 3 digitos'])
    } else {
      const { data: task, error } = await supabase
        .from("tasks")
        .insert({
          name,
          description,
          limite_date: limite_date === '' ? null : limite_date,
          horario: horario === '' ? null : horario,
          user_id: authUser.id
        })
        .single();
      if (error) {
        setErrors(prev => [...prev, error.message])
      } else {
        add(task)
        dispatch(ActionNotification.addOne({
          header: 'Tarefa adicionada:',
          body: task.name,
          id: task.id,
        }))
      }
    }
    setLoad(true)
  }

  return (
    <>
      <CModalHeader>
        <CModalTitle>Nova Tarefa</CModalTitle>
      </CModalHeader>
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
          <CFormGroup row>
            <CCol xs="6" md="6">
              <CLabel htmlFor="text-input">Data Limite</CLabel>
              <CInput
                id="text-input"
                name="text-input"
                type="date"
                value={limite_date}
                onChange={e => setLimite_date(e.target.value)}
              />
            </CCol>
            <CCol xs="6" md="6">
              <CLabel htmlFor="text-input">Hora da tarefa</CLabel>
              <CInput
                id="text-input"
                name="text-input"
                type="time"
                value={horario}
                onChange={e => setHorario(e.target.value)}
              />
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
                onChange={e => setDescription(e.target.value)}
              />
            </CCol>
          </CFormGroup>
          <Error errors={errors} />
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