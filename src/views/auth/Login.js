import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../services/supabase'
import OAuth from './OAuth'

import {
  CButton,
  CCard,
  CCardBody,
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

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(e) {
    e.preventDefault()

    if (email.trim() === '' || password.trim() === '') {
      return;
    }

    const { error } = await supabase.auth.signIn({ email, password })

    if (error) {
      console.log('erro: ' + error.message)
      return;
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
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
                  <CRow>
                    <CCol xs="12" className="text-right">
                      <Link to="/register">
                        Não possui conta? Registre-se agora!
                      </Link>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
