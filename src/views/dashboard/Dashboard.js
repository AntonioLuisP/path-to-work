import React from 'react'

import { Header, Sidebar, Footer } from "../../components/dashboardLayout"
import { useSelector, useDispatch } from 'react-redux'
import ProjectBoard from "../projects/ProjectBoard"
import LinkBoard from "../links/LinkBoard"
import { increment, decrement } from '../../actions'

import {
    CCol,
    CContainer,
    CFade,
    CRow,
} from '@coreui/react'

export default function Dashboard() {

    const counter = useSelector(state => state.counter)
    const isLogged = useSelector(state => state.isLogged)
    const dispatch = useDispatch()
    return (
        <div className="c-app c-default-layout">
            <Sidebar />
            <div className="c-wrapper">
                <Header />
                <div className="c-body">
                    <div className="c-main">
                        <CContainer fluid>
                            {counter}
                            {isLogged ? (<h3>OBA</h3>) : 'n aparece'}
                            <button onClick={() => dispatch(increment(5))}>+</button>
                            <button onClick={() => dispatch(decrement(5))}>-</button>
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