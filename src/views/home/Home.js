import React from 'react'
import { useAuth } from '../../hooks/useAuth';

import {
    Footer,
    Logout
} from '../../containers'

import {
    CRow,
    CLink,
    CCol,
    CContainer,
    CHeader,
    CHeaderNav,
    CHeaderNavItem,
    CHeaderNavLink,
    CJumbotron,
} from '@coreui/react'

export default function Home() {

    const { authUser } = useAuth()

    return (
        <div className="c-app c-default-layout flex-row a align-items-center">
            <div className="c-wrapper">
                <CHeader>
                    <CHeaderNav className="d-md-down-none mr-auto">
                        <CHeaderNavItem className="px-3" >
                            <CHeaderNavLink to="/dashboard">Link Work</CHeaderNavLink>
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
                <div className="c-body p-4">
                    <CContainer fluid>
                        <CRow className="justify-content-center">
                            <CCol md="7">
                                <CJumbotron className="border text-white bg-gradient-info">
                                    <h1 className="display-3">Bem vindo ao Link Work!</h1>
                                    <p className="lead">Este é um sistema gestão de links feito para você! Aqui você pode gerenciar todos os links importantes de sua vida.</p>
                                    <hr className="my-2" />
                                    <p className="text-justify">
                                        Dentre as possibilidades estão <b>listagem, anotações e criação de tarefas para esses links</b>. Aqui também você poderá criar um perfil compartilhável com todos os seus <b>links sociais</b> para as pessoas conseguirem te encontrar!
                                    </p>
                                    <p className="lead text-center">
                                        <CLink
                                            to='/dashboard'
                                            size='lg'
                                            className='btn btn-primary bg-gradient-primary'
                                            rel="noreferrer noopener"
                                        >
                                            Venha para seu Dashboard
                                        </CLink>
                                    </p>
                                </CJumbotron>
                            </CCol>
                        </CRow>
                    </CContainer>
                </div>
                <Footer />
            </div>
        </div>
    )
}