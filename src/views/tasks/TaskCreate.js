import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Actions as ActionTask } from '../../redux/task'
import { Actions as ActionNotification } from '../../redux/notifications'
import api from "../../services/api"

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

export default function TaskCreate() {

  const dispatch = useDispatch()

  const [load, setLoad] = useState(true)
  const [task, setTask] = useState({
    'name': '',
    'id_project': null,
    'limite_date': '',
    'description': '',
    'hora': '',
  })

  async function handleCreate(e) {
    e.preventDefault();
    setLoad(false)
    try {
      await api.post('task', task, {})
        .then(response => {
          if (response.status === 200) {
            dispatch(ActionTask.addOne(response.data))
            dispatch(ActionNotification.addOne({
              header: 'Tarefa adicionada:',
              body: response.data.name,
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
                value={task.name}
                onChange={e => setTask({ ...task, 'name': e.target.value })}
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
                value={task.limite_date}
                onChange={e => setTask({ ...task, 'limite_date': e.target.value })}
              />
            </CCol>
            <CCol xs="6" md="6">
              <CLabel htmlFor="text-input">Hora da tarefa</CLabel>
              <CInput
                id="text-input"
                name="text-input"
                type="time"
                value={task.hora}
                onChange={e => setTask({ ...task, 'hora': e.target.value })}
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
                value={task.description}
                onChange={e => setTask({ ...task, 'description': e.target.value })}
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