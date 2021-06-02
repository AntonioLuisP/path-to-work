import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { SeeMore, ToasterNotification } from '../../reusable'
import { add } from '../../actions/projects'
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
  const projects = useSelector(state => state.projects)
  const dispatch = useDispatch()

  const [load, setLoad] = useState(true)
  const [name, setName] = useState('')
  const [notifications, setNotifications] = useState({})

  async function handleCreate(e) {
    e.preventDefault();
    setLoad(false)
    const data = {
      name,
    }
    try {
      await api.post('project', data, {})
        .then(response => {
          if (response.status === 200) {
            dispatch(add(response.data))
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
    } finally {
      setLoad(true)
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
                  placeholder="Projeto"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <CInputGroupAppend>
                  <CButton type="submit" color="success" disabled={!load}>
                    {
                      load ? 'Adicionar' : (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>)
                    }
                  </CButton>
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