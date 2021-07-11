import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from '../../services/supabase'
import { Actions as ActionNotification } from '../../redux/notifications'

import {
  CButton,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInputGroupAppend,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

export default function ProfileEdit(props) {

  const dispatch = useDispatch()

  const id = props.profile.id
  const [load, setLoad] = useState(true)
  const [name, setName] = useState(props.profile.name)

  async function handleEdit(e) {
    e.preventDefault();
    setLoad(false)
    const { data: profile, error } = await supabase
      .from("profiles")
      .update({
        name,
      })
      .eq('id', id)
      .single()
    if (error) {
      alert("error", error)
      return;
    } else {
      props.edit(profile)
      dispatch(ActionNotification.addOne({
        header: 'Perfil Social Editado:',
        body: profile.name,
        id: profile.id,
      }))
    }
    setLoad(true)
  }

  return (
    <CForm onSubmit={handleEdit} className="form-horizontal">
      <CModalHeader closeButton>
        <CModalTitle>Editar seu Perfil</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormGroup>
          <CLabel >Editar seu nome de perfil</CLabel>
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
          <p className="help-block">Ao atualizar, seu link compartilhavel será baseado no novo nome!!!</p>
        </CFormGroup>
      </CModalBody>
    </CForm>
  )
}