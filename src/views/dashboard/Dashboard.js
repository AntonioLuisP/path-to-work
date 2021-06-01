import React from 'react'

import { Header, Sidebar, Footer } from "../../components/dashboardLayout"

import ProjectBoard from "../projects/ProjectBoard"
import LinkBoard from "../links/LinkBoard"

import {
    CCol,
    CContainer,
    CFade,
    CRow,
} from '@coreui/react'

export default function Dashboard() {

    return (
        <div className="c-app c-default-layout">
            <Sidebar />
            <div className="c-wrapper">
                <Header />
                <div className="c-body">
                    <div className="c-main">
                        <CContainer fluid>
                            <CFade>
                                <CRow>
                                    <CCol xs="8" sm="8" md="8">
                                        <ProjectBoard />
                                    </CCol>
                                    <CCol xs="4" sm="4" md="4">
                                        <LinkBoard />
                                    </CCol>
                                </CRow>
                            </CFade>
                        </CContainer>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}