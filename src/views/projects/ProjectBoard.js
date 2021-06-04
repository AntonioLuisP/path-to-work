import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SeeMore } from '../../reusable'
import ProjectCreate from './ProjectCreate'
import { modalAction } from '../../actions/modalAction'

import {
  CBreadcrumb,
  CBreadcrumbItem,
  CButton,
  CCol,
  CRow,
  CWidgetIcon
} from '@coreui/react'

import {
  cilBriefcase,
  cilPlus,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

export default function ProjectBoard() {

  const history = useHistory()
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
              <CCol xs="12" sm="6" md="6" key={project.id}>
                <CWidgetIcon header={project.name} text="Ver" color="info" iconPadding={false}>
                  <CIcon width={24} content={cilBriefcase} />
                  <SeeMore to={() => history.push('/projects/' + project.id)} />
                </CWidgetIcon>
              </CCol>
            ))
          }
        </CRow>
      </CCol>
    </CRow>
  )
}