import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Actions as ActionTask } from '../../redux/task'
import { Actions as ActionNotification } from '../../redux/notifications'
import { Loading } from '../../reusable/'
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
  CSelect,
  CTextarea,
} from '@coreui/react'

export default function TaskCreate() {

  const dispatch = useDispatch()

  const project = useSelector(state => state.project)

  const [loading, setLoading] = useState(true)
  const [load, setLoad] = useState(true)
  const [task, setTask] = useState({
    'name': '',
    'id_project': null,
    'limite_date': '',
    'description': '',
    'hora': '',
  })
  const [projects, setProjects] = useState([])

  useEffect(() => {
    if (typeof project.id !== "undefined") {
      setTask(task => ({ ...task, 'id_project': project.id }))
    } else {
      api.get('project/')
        .then(response => {
          if (response.status === 200) {
            setProjects(response.data.data)
            if (Object.keys(response.data.data).length > 0) {
              setTask(task => ({ ...task, 'id_project': response.data.data[0].id }))
            }
          }
        })
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }
    setLoading(false)
  }, [project])

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

  if (loading) return (<Loading />)

  if (task.id_project === null) {
    return (
      <>
        Crie um projeto antes
      </>
    )
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
            <CCol xs="7" md="7">
              <CLabel htmlFor="text-input">Projeto</CLabel>
              <CSelect
                value={task.id_project}
                onChange={e => setTask({ ...task, 'id_project': e.target.value })}
                custom
                name="select"
                id="select">
                {
                  projects.map(project => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                  ))
                }
              </CSelect>
            </CCol>
            <CCol xs="3" md="3">
              <CLabel htmlFor="text-input">Data Limite</CLabel>
              <CInput
                id="text-input"
                name="text-input"
                type="date"
                value={task.limite_date}
                onChange={e => setTask({ ...task, 'limite_date': e.target.value })}
              />
            </CCol>
            <CCol xs="2" md="2">
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