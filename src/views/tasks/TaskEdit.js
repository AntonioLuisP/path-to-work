import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Actions as ActionTask } from '../../redux/task'
import { Actions as ActionNotification } from '../../redux/notifications'
import api from "../../services/api"

import {
  CButton,
  CCol,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardTitle,
  CForm,
  CFormGroup,
  CInput,
  CRow,
  CLabel,
  CTextarea
} from '@coreui/react'

export default function TaskEdit(props) {

  const dispatch = useDispatch()

  const [task, setTask] = useState({
    ...props.task,
    'description': props.task.description === null ? '' : props.task.description
  })

  async function handleEdit(e) {
    e.preventDefault();
    try {
      await api.put('/task/' + task.id, task, {})
        .then(response => {
          if (response.status === 200) {
            dispatch(ActionTask.selectOne(task))
            dispatch(ActionNotification.addOne({
              header: 'Tarefa Editada:',
              body: task.name,
              id: task.id,
            }))
          }
        })
    } catch (error) {
      alert("erro")
      console.log(error)
    }
  }

  return (
    <CRow>
      <CCol xs="12" sm="12">
        <CCard>
          <CCardHeader>
            <CCardTitle>Editar Tarefa</CCardTitle>
          </CCardHeader>
          <CForm onSubmit={handleEdit} className="form-horizontal">
            <CCardBody>
              <CFormGroup row>
                <CCol xs="12" md="12">
                  <CInput
                    id="text-input"
                    name="text-input"
                    placeholder="Nome"
                    value={task.name}
                    onChange={e => setTask({ ...task, 'name': e.target.value })} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol xs="4" md="4">
                  <CLabel htmlFor="text-input">Data Limite</CLabel>
                  <CInput
                    id="text-input"
                    name="text-input"
                    type="date"
                    value={task.limite_date}
                    onChange={e => setTask({ ...task, 'limite_date': e.target.value })}
                  />
                </CCol>
                <CCol xs="4" md="4">
                  <CLabel htmlFor="text-input">Hora da tarefa</CLabel>
                  <CInput
                    id="text-input"
                    name="text-input"
                    type="time"
                    value={task.hora}
                    onChange={e => setTask({ ...task, 'hora': e.target.value })}
                  />
                </CCol>
                <CCol xs="4" md="4">
                  <CFormGroup>
                    <CLabel htmlFor="text-input">{task.conclusion ? 'Concluída' : 'Não finalizada'}</CLabel>
                    <CInput
                      id="text-input"
                      name="text-input"
                      type="button"
                      placeholder="Nome"
                      className='btn btn-warning'
                      value={task.conclusion ? 'Refazer' : 'Concluir'}
                      onClick={() => setTask({ ...task, 'conclusion': !task.conclusion })}
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
                    value={task.description}
                    onChange={e => setTask({ ...task, 'description': e.target.value })} />
                </CCol>
              </CFormGroup>
            </CCardBody>
            <CCardFooter>
              <CButton
                type="submit"
                color="success"
              >
                Salvar
              </CButton>
            </CCardFooter>
          </CForm>
        </CCard>
      </CCol>
    </CRow >
  )
}