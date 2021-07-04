import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { supabase } from '../../services/supabase'
import OAuth from './OAuth'

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
  CRow
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

const Login = () => {

  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(e) {
    e.preventDefault()

    if (email.trim() === '' || password.trim() === '') {
      return;
    }

    const { error } = await supabase.auth.signIn({ email, password })

    if (!error) {
      history.push('/dashboard')
    } else {
      console.log('erro: ' + error.message)
      return;
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-muted">Entre com sua conta</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} autoComplete=" password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton type='submit' color="primary" className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <OAuth />
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-gradient-info py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Cadastre-se</h2>
                    <p className="text-justify">
                      Nesse sistema você pode gerenciar todos os links importantes de sua vida. Dentre as possibilidades estão <b>listagem, anotações e criação de tarefas para esses links</b>. Aqui também você poderá criar um perfil compartilhável com todos os seus <b>links sociais</b> para as pessoas conseguirem te encontrar!!!
                    </p>
                    <Link to="/register" className='text-black-50'>
                      Registre-se agora!
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
