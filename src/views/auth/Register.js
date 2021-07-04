import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../services/supabase'
import OAuth from './OAuth'

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
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

const Register = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleRegister(e) {
    e.preventDefault()

    if (email.trim() === '' || password.trim() === '') {
      return;
    }

    const { user, error } = await supabase.auth.signUp({ email, password })

    if (error) {
      alert('erro: ' + error.message)
      return;
    } else if (user && !error) {
      alert('An email has been sent to you for verification!')
      return;
    }
  }


  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleRegister}>
                  <h1>Registre-se</h1>
                  <p className="text-muted">Crie sua conta</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} autoComplete="new-password" />
                  </CInputGroup>
                  <CButton type="submit" color="success" block>Crie sua conta</CButton>
                </CForm>
              </CCardBody>
              <CCardFooter className='text-center'>
                <OAuth />
              </CCardFooter>
              <CCardFooter className='text-center'>
                <Link to="/login">
                  Já tenho cadastro!
                </Link>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
