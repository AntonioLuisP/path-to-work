import React from 'react'
import ProjectComponent from './ProjectComponent'
import ProjectCreate from '../../views/projects/ProjectCreate'
import BreadcrumbHeader from '../../reusable/BreadcrumbHeader'

import {
  CCol,
  CRow,
} from '@coreui/react'

export default function ProjectBoard(props) {

  const projects = props.projects

  return (
    <CRow>
      <CCol xs="12" sm="12" md="12">
        <BreadcrumbHeader title='Seus Projetos' component={<ProjectCreate />} />
        <CRow>
          {
            projects.map(project => (
              <ProjectComponent key={project.id} project={project} />
            ))
          }
        </CRow>
      </CCol>
    </CRow >
  )
}