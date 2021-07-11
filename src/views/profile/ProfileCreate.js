import React, { useState } from 'react'
import { supabase } from 'src/services/supabase';
import { useAuth } from '../../hooks/useAuth';

import {
  CButton,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInputGroupAppend
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

export default function ProfileCreate({ add }) {

  const { authUser } = useAuth()

  const [load, setLoad] = useState(true)
  const [name, setName] = useState('')

  async function handleCreate(e) {
    e.preventDefault();
    setLoad(false)
    const { data: profile, error } = await supabase
      .from("profiles")
      .insert({
        name,
        user_id: authUser.id
      })
      .single();
    if (error) {
      alert("error", error)
      return;
    } else {
      add(profile)
    }
    setLoad(true)
  }

  return (
    <CForm onSubmit={handleCreate} className="form-horizontal">
      <CFormGroup>
        <CLabel >Dê um nome a seu perfil</CLabel>
        <CInputGroup>
          <CInputGroupPrepend>
            <CInputGroupText>
              <CIcon name="cil-user" />
            </CInputGroupText>
          </CInputGroupPrepend>
          <CInput type="text" placeholder="Nome Completo" value={name} onChange={e => setName(e.target.value)} autoComplete=" name" />
          <CInputGroupAppend>
            <CButton type="submit" color="success" disabled={!load}>
              {
                load ? 'Salvar' : (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />)
              }
            </CButton>
          </CInputGroupAppend>
        </CInputGroup>
        <p className="help-block">Este nome será utilizado para compartilhar seus links sociais!</p>
      </CFormGroup>
    </CForm>
  )
}