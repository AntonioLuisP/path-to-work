import React from 'react'
import ProjectBoard from "../projects/ProjectBoard"
import LinkBoard from "../links/LinkBoard"

import {
    CCol,
    CRow,
} from '@coreui/react'

export default function Dashboard() {

    return (
        <CRow>
            <CCol xs="8" sm="8" md="8">
                <ProjectBoard />
            </CCol>
            <CCol xs="4" sm="4" md="4">
                <LinkBoard />
            </CCol>
        </CRow>
    )
}