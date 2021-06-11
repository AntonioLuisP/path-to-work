import React from 'react'
import { useHistory } from 'react-router-dom'
import { More } from '../../reusable'

import {
    CCol,
    CCardBody,
    CCard,
    CCardText,
} from '@coreui/react'

import {
    cilBriefcase,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

export default function ProjectComponent(props) {

    const history = useHistory()

    const project = props.project

    return (
        <CCol xs="12" sm="6" md="6">
            <CCard>
                <CCardBody>
                    <CCardText className='text-break text-justify'>
                        {project.name}
                    </CCardText>
                    <More to={() => history.push('/projects/' + project.id)}>
                        <CIcon width={20} content={cilBriefcase} />
                    </More>
                </CCardBody>
            </CCard>
        </CCol>
    )
}


