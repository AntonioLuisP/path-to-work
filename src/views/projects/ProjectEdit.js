import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import api from "../../services/api"
import { Actions as ActionProject } from 'src/redux/projects';
import { useNotifications, Actions as ActionNotification } from '../../context/NotificationsContext'


import {
  CButton,
  CCol,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormGroup,
  CTextarea,
  CInput,
} from '@coreui/react'

const ProjectEdit = (props) => {

  const [, setNotifications] = useNotifications()

  const dispatch = useDispatch()

  const [load, setLoad] = useState(true)
  const [project, setProject] = useState(props.project)

  async function handleEdit(e) {
    e.preventDefault();
    setLoad(false)
    const data = {
      'name': project.name,
      'description': project.description
    }
    try {
      await api.put('/project/' + project.id, data, {})
        .then(response => {
          if (response.status === 200) {
            dispatch(ActionProject.editOne(project))
            setNotifications(ActionNotification.addOne({
              header: 'Projeto Editado:',
              body: project.name,
              id: project.id,
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
    <CForm onSubmit={handleEdit} className="form-horizontal">
      <CModalHeader>
        <CModalTitle>Editar Projeto</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormGroup row>
          <CCol xs="12" md="12">
            <CInput
              id="text-input"
              name="text-input"
              placeholder="Nome"
              value={project.name}
              onChange={e => setProject({ ...project, 'name': e.target.value })}
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
              value={project.description}
              onChange={e => setProject({ ...project, 'description': e.target.value })}
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

export default ProjectEdit



