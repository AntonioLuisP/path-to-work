import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from '../../services/supabase'
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

export default function ListEdit(props) {

  const dispatch = useDispatch()

  const id = props.list.id
  const sinal = navigator.onLine

  const [load, setLoad] = useState(true)
  const [name, setName] = useState(props.list.name)
  const [errors, setErrors] = useState([])

  async function handleEdit() {
    setLoad(false)
    setErrors([])
    if (name.length < 3 || name.trim() === '') {
      setErrors(prev => [...prev, 'O nome deve ter mais que 3 digitos'])
    } else {
      const { data: list, error } = await supabase
        .from("lists")
        .update({
          name,
        })
        .eq('id', id)
        .single()
      if (error) {
        setErrors(prev => [...prev, error.message])
      } else {
        props.edit(list)
        dispatch(ActionNotification.addOne({
          header: 'Lista Editada:',
          body: list.name,
          id: list.id,
        }))
      }
    }
    setLoad(true)
  }

  return (
    <Form onSubmit={handleEdit} >
      <CModalHeader>
        <CModalTitle>Editar Lista</CModalTitle>
      </CModalHeader>
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
  )
}