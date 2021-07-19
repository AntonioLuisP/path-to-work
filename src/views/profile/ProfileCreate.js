import React, { useState } from 'react'
import { supabase } from 'src/services/supabase';
import { useAuth } from '../../hooks/useAuth';
import { Error, LoadButton, NosignalBadge, Form } from '../../reusable'

import {
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

  const sinal = navigator.onLine
  const [load, setLoad] = useState(true)
  const [errors, setErrors] = useState([])

  const [name, setName] = useState('')

  async function handleCreate() {
    setLoad(false)
    setErrors([])
    if (name.length < 3 || name.trim() === '') {
      setErrors(prev => [...prev, 'O nome deve ter mais que 3 digitos'])
    } else {
      const { data: profile, error } = await supabase
        .from("profiles")
        .insert({
          name,
          user_id: authUser.id
        })
        .single();
      if (error) {
        setErrors(prev => [...prev, error.message])
      } else {
        add(profile)
      }
    }
    setLoad(true)
  }

  return (
    <Form onSubmit={handleCreate} >
      <CFormGroup>
        <CLabel >Dê um nome a seu perfil</CLabel>
        <CInputGroup>
          <CInputGroupPrepend>
            <CInputGroupText>
              <CIcon name="cil-user" />
            </CInputGroupText>
          </CInputGroupPrepend>
          <CInput
            type="text"
            placeholder="Nome Completo"
            required
            value={name}
            valid={name.length > 2 && name.trim() !== ''}
            onChange={e => setName(e.target.value)}
          />
          <CInputGroupAppend>
            {!sinal ? (<NosignalBadge />) : <LoadButton load={load} />}
          </CInputGroupAppend>
        </CInputGroup>
        <p className="help-block">Este nome será utilizado para compartilhar seus links sociais!</p>
      </CFormGroup>
      {errors.length > 0 ? <Error errors={errors} /> : <></>}
    </Form>
  )
}