import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from '../../services/supabase'
import { Actions as ActionNotification } from '../../redux/notifications'
import { Error, LoadButton, NosignalBadge, Form } from '../../reusable'

import {
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
  const sinal = navigator.onLine

  const [load, setLoad] = useState(true)
  const [errors, setErrors] = useState([])

  const [name, setName] = useState(props.profile.name)

  async function handleEdit() {
    setErrors([])
    if (name.length < 3 || name.trim() === '') {
      setErrors(prev => [...prev, 'O nome deve ter mais que 3 digitos'])
    } else {
      if (window.confirm('Tem certeza que você deseja mudar seu nome?')) {
        setLoad(false)
        try {
          const { data: profile, error } = await supabase
            .from("profiles")
            .update({
              name,
            })
            .eq('id', id)
            .single()
          if (error) {
            setErrors(prev => [...prev, error.message])
          } else {
            props.edit(profile)
            dispatch(ActionNotification.addOne({
              header: 'Perfil Social Editado:',
              body: profile.name,
              id: profile.id,
            }))
          }
        } catch (error) {
          setErrors(prev => [...prev, error.message])
        }
        setLoad(true)
      }
    }
  }

  return (
    <Form onSubmit={handleEdit} >
      <CFormGroup>
        <CLabel >Editar seu nome de perfil</CLabel>
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
        <p className="help-block">Ao atualizar, seu link compartilhavel será baseado no novo nome!!!</p>
      </CFormGroup>
      {errors.length > 0 ? <Error errors={errors} /> : <></>}
    </Form>
  )
}