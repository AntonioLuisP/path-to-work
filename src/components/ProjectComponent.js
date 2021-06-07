import React from 'react'
import { useHistory } from 'react-router-dom'
import { SeeMore } from '../reusable'

import {
    CCol,
    CWidgetIcon
} from '@coreui/react'

import {
    cilBriefcase,
  } from '@coreui/icons'
  
import CIcon from '@coreui/icons-react'

export default function ProjectComponent(props) {

    const history = useHistory()

    const project = props.project

    return (
        <CCol xs="12" sm="6" md="6" key={project.id}>
            <CWidgetIcon header={project.name} text="Ver" color="info" iconPadding={false}>
                <CIcon width={24} content={cilBriefcase} />
                <SeeMore to={() => history.push('/projects/' + project.id)} />
            </CWidgetIcon>
        </CCol>
    )
}


