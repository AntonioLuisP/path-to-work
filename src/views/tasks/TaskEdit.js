import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
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
  CTextarea
} from '@coreui/react'

export default function TaskEdit(props) {

  const dispatch = useDispatch()
  const history = useHistory()

  const [task, setTask] = useState(props.task)

  async function handleEdit(e) {
    e.preventDefault();
    const data = {
      'name': task.name,
      'description': task.description
    }
    try {
      await api.put('/task/' + task.id, data, {})
        .then(response => {
          if (response.status === 200) {
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
              <CButton
                color="secondary"
                onClick={() => history.goBack()}
              >
                Cancelar
              </CButton>
            </CCardFooter>
          </CForm>
        </CCard>
      </CCol>
    </CRow>
  )
}