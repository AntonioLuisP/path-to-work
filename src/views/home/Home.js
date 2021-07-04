import React from 'react'

import {
    Footer,
} from '../../containers'

import {
    CContainer,
    CHeader,
    CHeaderNav,
    CHeaderNavItem,
    CHeaderNavLink
} from '@coreui/react'

export default function Home() {
    return (
        <div className="c-app c-default-layout">
            <div className="c-wrapper">
                <CHeader>
                    <CHeaderNav className="d-md-down-none mr-auto">
                        <CHeaderNavItem className="px-3" >
                            <CHeaderNavLink to="/home">Link Work</CHeaderNavLink>
                        </CHeaderNavItem>
                    </CHeaderNav>
                    <CHeaderNav className="px-3">
                        <CHeaderNavItem >
                            <CHeaderNavLink to="/login">Login</CHeaderNavLink>
                        </CHeaderNavItem>
                    </CHeaderNav>
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