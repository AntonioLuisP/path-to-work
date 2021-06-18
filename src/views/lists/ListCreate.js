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

export default function ListCreate(props) {

  const dispatch = useDispatch()

  const [load, setLoad] = useState(true)

  const task = props.task

  const [list, setList] = useState({
    'list': '',
    'id_task': '',
  })

  async function handleCreate(e) {
    e.preventDefault();
    setLoad(false)
    const data = {
      'list': list.list,
      'id_task': task.id,
    }
    try {
      await api.post('list', data, {})
        .then(response => {
          if (response.status === 200) {
            dispatch(ActionList.addOne(response.data))
            dispatch(ActionNotification.addOne({
              header: 'Lista adicionada:',
              body: response.data.list,
              id: response.data.id,
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
    <>
      <CModalHeader closeButton>
        <CModalTitle>Nova Lista</CModalTitle>
      </CModalHeader >
      <CForm onSubmit={handleCreate} className="form-horizontal">
        <CModalBody>
          <CFormGroup row>
            <CCol xs="12" md="12">
              <CInput
                id="text-input"
                name="text-input"
                placeholder="Nome"
                value={list.name}
                onChange={e => setList(list => ({ ...list, 'name': e.target.value }))}
              />
            </CCol>
          </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <CButton type="submit" color="success" disabled={!load}>
            {
              load ? 'Adicionar' : (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />)
            }
          </CButton>
        </CModalFooter>
      </CForm>
    </>
  )
}