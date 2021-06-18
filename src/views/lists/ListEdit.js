import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Actions as ActionList } from '../../redux/list'
import { Actions as ActionNotification } from '../../redux/notifications'
import api from "../../services/api"

import {
  CButton,
  CCol,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormGroup,
  CInput,
} from '@coreui/react'

export default function ListEdit(props) {

  const dispatch = useDispatch()

  const [load, setLoad] = useState(true)
  const [list, setList] = useState(props.list)

  async function handleEdit(e) {
    e.preventDefault();
    setLoad(false)
    try {
      await api.put('/list/' + list.id, list, {})
        .then(response => {
          if (response.status === 200) {
            dispatch(ActionList.selectOne(list))
            dispatch(ActionNotification.addOne({
              header: 'list Editado:',
              body: list.name,
              id: list.id,
            }))
          }
        })
    } catch (error) {
      alert("erro")
      console.log(error)
    } finally {
      setLoad(true)
    }
  }

  return (
    <CForm onSubmit={handleEdit} className="form-horizontal">
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
              value={list.name}
              onChange={e => setList({ ...list, 'name': e.target.value })}
            />
          </CCol>
        </CFormGroup>
      </CModalBody>
      <CModalFooter>
        <CButton type="submit" color="success" disabled={!load}>
          {
            load ? 'Salvar' : (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />)
          }
        </CButton>
      </CModalFooter>
    </CForm>
  )
}