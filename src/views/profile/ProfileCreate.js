import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from 'src/services/supabase';
import { useAuth } from '../../hooks/useAuth';
import { Actions as ActionNotification } from '../../redux/notifications'

import {
  CButton,
  CCol,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardTitle,
  CForm,
  CFormGroup,
  CInput,
  CCard,
} from '@coreui/react'

export default function ProfileCreate({ add }) {

  const dispatch = useDispatch()

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
      dispatch(ActionNotification.addOne({
        header: 'Perfil Social Criado:',
        body: profile.name,
        id: profile.id,
      }))
    }
    setLoad(true)
  }

  return (
    <CCard>
      <CCardHeader>
        <CCardTitle>Crie seu Perfil</CCardTitle>
      </CCardHeader >
      <CForm onSubmit={handleCreate} className="form-horizontal">
        <CCardBody>
          <CFormGroup row>
            <CCol xs="12" md="12">
              <CInput
                id="text-input"
                name="text-input"
                placeholder="Nome"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </CCol>
          </CFormGroup>
        </CCardBody>
        <CCardFooter>
          <CButton type="submit" color="success" disabled={!load}>
            {
              load ? 'Adicionar' : (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />)
            }
          </CButton>
        </CCardFooter>
      </CForm>
    </CCard>
  )
}