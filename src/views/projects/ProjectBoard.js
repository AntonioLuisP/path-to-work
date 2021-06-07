import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProjectCreate from './ProjectCreate'
import { modalAction } from '../../actions/modalAction'
import { ProjectComponent } from '../../components'

import {
  CBreadcrumb,
  CBreadcrumbItem,
  CButton,
  CCol,
  CRow,
} from '@coreui/react'

import {
  cilPlus,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

export default function ProjectBoard() {

  const dispatch = useDispatch()

  const projects = useSelector(state => state.projects)

  const toogleModal = () => {
    dispatch(modalAction(<ProjectCreate />))
  }

  return (
    <CRow>
      <CCol xs="12" sm="12" md="12">
        <CBreadcrumb className="border-0 c-subheader-nav">
          <CBreadcrumbItem active>Seus Projetos</CBreadcrumbItem>
          <CButton
            onClick={toogleModal}
          >
            <CIcon content={cilPlus} />
          </CButton>
        </CBreadcrumb>
        <CRow>
          {
            projects.map(project => (
              <ProjectComponent key={project.id} project={project} />
            ))
          }
        </CRow>
      </CCol>
    </CRow>
  )
}