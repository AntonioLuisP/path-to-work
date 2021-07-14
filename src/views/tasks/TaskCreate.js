import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAuth } from '../../hooks/useAuth';
import { supabase } from 'src/services/supabase';
import { Actions as ActionNotification } from '../../redux/notifications'
import { Error, LoadButton } from '../../reusable'
import { makeDate } from '../../services/FormatDate'

import {
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
  const [day, setDay] = useState('')
  console.log(day)
  const [time, setTime] = useState('')
  console.log(time)

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
          day_of: makeDate(day, time),
          user_id: authUser.id
        })
        .single();
        console.log(makeDate(day, time))
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
                required={time.length > 0}
                type="date"
                value={day}
                onChange={e => setDay(e.target.value)}
              />
            </CCol>
            <CCol xs="6" md="6">
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
          <LoadButton load={load} />
        </CModalFooter>
      </CForm>
    </>
  )
}