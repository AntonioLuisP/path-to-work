import React from 'react'
import { useAuth } from '../../hooks/useAuth';

import {
    Footer,
    Logout
} from '../../containers'

import {
    CContainer,
    CHeader,
    CHeaderNav,
    CHeaderNavItem,
    CHeaderNavLink
} from '@coreui/react'

export default function Home() {

    const { authUser } = useAuth()

    return (
        <div className="c-app c-default-layout">
            <div className="c-wrapper">
                <CHeader>
                    <CHeaderNav className="d-md-down-none mr-auto">
                        <CHeaderNavItem className="px-3" >
                            <CHeaderNavLink to="/home">Link Work</CHeaderNavLink>
                        </CHeaderNavItem>
                    </CHeaderNav>
                    {authUser ?
                        <Logout /> :
                        <CHeaderNav className="px-3">
                            <CHeaderNavItem >
                                <CHeaderNavLink to="/login">Login</CHeaderNavLink>
                            </CHeaderNavItem>
                        </CHeaderNav>
                    }
                </CHeader>
                <div className="c-body">
                    <CContainer>
                        HOME
                    </CContainer>
                </div>
                <Footer />
            </div>
        </div>
    )
}