import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import api from "../../services/api"
import { editProject } from 'src/actions/projects';
import { addNotification } from '../../actions/notifications'

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
  CTextarea,
  CInput,
  CLabel,
  CRow,
} from '@coreui/react'

const ProjectEdit = ({ match }) => {

  const dispatch = useDispatch()

  const [load, setLoad] = useState(true)
  const [project, setProject] = useState({
    'id': '',
    'name': '',
    'description': '',
  })

  useEffect(() => {
    api.get('project/' + match.params.id)
      .then(response => {
        if (response.status === 200) {
          setProject(response.data.project)
        }
      })
  }, [match.params.id])

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
            dispatch(editProject(project))
            dispatch(addNotification({
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
    <CRow>
      <CCol xs="12" sm="12">
        <CCard>
          <CCardHeader>
            <CCardTitle>Editar Projeto</CCardTitle>
          </CCardHeader>
          <CForm onSubmit={handleEdit} className="form-horizontal">
            <CCardBody>
              <CFormGroup row>
                <CCol xs="12" md="12">
                  <CLabel htmlFor="text-input">Nome</CLabel>
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
                  <CLabel htmlFor="textarea-input">Descrição</CLabel>
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
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" color="success" disabled={!load}>
                {
                  load ? 'Salvar' : (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />)
                }
              </CButton>
            </CCardFooter>
          </CForm>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ProjectEdit



