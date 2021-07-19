import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from 'src/services/supabase';
import { useAuth } from '../../hooks/useAuth';
import { Actions as ActionNotification } from '../../redux/notifications'
import { Error, LoadButton, NosignalBadge, Form } from '../../reusable'

import {
  CCol,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormGroup,
  CInput,
} from '@coreui/react'

export default function ListCreate({ add }) {

  const dispatch = useDispatch()

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
      const { data: list, error } = await supabase
        .from("lists")
        .insert({
          name,
          user_id: authUser.id
        })
        .single();
      if (error) {
        setErrors(prev => [...prev, error.message])
      } else {
        add(list)
        dispatch(ActionNotification.addOne({
          header: 'Lista adicionada:',
          body: list.name,
          id: list.id,
        }))
      }
    }
    setLoad(true)
  }

  return (
    <>
      <CModalHeader closeButton>
        <CModalTitle>Nova Lista</CModalTitle>
      </CModalHeader >
      <Form onSubmit={handleCreate} >
        <CModalBody>
          <CFormGroup row>
            <CCol xs="12" md="12">
              <CInput
                id="text-input"
                name="text-input"
                placeholder="Nome"
                required
                value={name}
                valid={name.length > 2 && name.trim() !== ''}
                onChange={e => setName(e.target.value)}
              />
            </CCol>
          </CFormGroup>
          {errors.length > 0 ? <Error errors={errors} /> : <></>}
        </CModalBody>
        <CModalFooter>
          {!sinal ? (<NosignalBadge />) : <LoadButton load={load} />}
        </CModalFooter>
      </Form>
    </>
  )
}