import React from 'react'
import { useAuth } from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom'


import {
    TheContent,
    TheSidebar,
    TheFooter,
    TheHeader
} from '../../containers'

import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CRow,
    CHeader,
    CToggler,
    CHeaderBrand,
    CHeaderNav,
    CHeaderNavItem,
    CHeaderNavLink,
    CSubheader,
    CBreadcrumbRouter,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
export default function Home() {

    const history = useHistory()

    const { user, signIWithGoogle } = useAuth()


    async function handleCreateRoom() {
        if (!user) {
            await signIWithGoogle()
        }
        history.push('/dashboard/')
    }
    return (
        <div className="c-app c-default-layout">
            <div className="c-wrapper">
                <CHeader>

                </CHeader>
                <div className="c-body">
                    <CContainer>
                        HOME
                    </CContainer>
                </div>
                <TheFooter />
            </div>

        </div>
    )
}