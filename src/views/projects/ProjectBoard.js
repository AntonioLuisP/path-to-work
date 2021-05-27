import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { SeeMore, ToasterNotification } from '../../reusable'
import api from "../../services/api"

import {
  CBreadcrumb,
  CBreadcrumbItem,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CRow,
} from '@coreui/react'

const ProjectBoard = () => {

  const history = useHistory()

  const [name, setName] = useState('')
  const [notifications, setNotifications] = useState({})
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('project')
      .then(response => {
        if (response.status === 200) {
          setProjects(response.data.data)
        }
      })
  }, [])

  async function handleCreate(e) {
    e.preventDefault();
    const data = {
      name,
    }
    try {
      await api.post('project', data, {})
        .then(response => {
          if (response.status === 200) {
            setProjects([...projects, response.data])
            setNotifications({
              header: 'Projeto adicionado:',
              body: response.data.name,
              id: response.data.id,
            })
          }
        })
    } catch (error) {
      alert("erro")
      console.log(error)
    }
  }

  return (
    <CRow>
      <ToasterNotification notificaton={notifications} />
      <CCol xs="12" sm="12" md="12">
        <CForm onSubmit={handleCreate} className="form-horizontal">
          <CFormGroup row>
            <CCol xl="12" md="12" sm="12">
              <CInputGroup>
                <CInput
                  id="text-input"
                  name="text-input"
                  placeholder="Novo Projeto"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <CInputGroupAppend>
                  <CButton type="submit" color="success">Adicionar</CButton>
                </CInputGroupAppend>
              </CInputGroup>
            </CCol>
          </CFormGroup>
        </CForm>
      </CCol>
      <CCol xs="12" sm="12" md="12">
        <CBreadcrumb className="border-0 c-subheader-nav">
          <CBreadcrumbItem active>Seus Projetos</CBreadcrumbItem>
        </CBreadcrumb>
        <CRow>
          {
            projects.map(project => (
              <CCol xs="12" sm="6" md="6" key={project.id}>
                <CCard>
                  <CCardHeader color="secondary">
                    {project.name}
                    <div className="card-header-actions">
                      <SeeMore to={() => history.push('/projects/' + project.id)} />
                    </div>
                  </CCardHeader>
                  <CCardBody>
                    {project.description}
                  </CCardBody>
                </CCard>
              </CCol>
            ))
          }
        </CRow>
      </CCol>
    </CRow>
  )
}

export default ProjectBoard