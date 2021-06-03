import React, { useState } from 'react'
import api from "../../services/api"
import { useDispatch } from 'react-redux'
import { addLink } from '../../actions/links'
import { addNotification } from '../../actions/notifications'

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

export default function LinkCreate() {

  const dispatch = useDispatch()
  
  const [load, setLoad] = useState(true)
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')

  async function handleCreate(e) {
    e.preventDefault();
    setLoad(false)
    const data = {
      name,
      url,
    }
    try {
      await api.post('link', data, {})
        .then(response => {
          if (response.status === 200) {
            dispatch(addLink(response.data))
            dispatch(addNotification({
              header: 'Link adicionado:',
              body: response.data.name,
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
        <CModalTitle>Novo Link</CModalTitle>
      </CModalHeader >
      <CForm onSubmit={handleCreate} className="form-horizontal">
        <CModalBody>
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
          <CFormGroup row>
            <CCol xs="12" md="12">
              <CInput
                id="text-input"
                name="text-input"
                placeholder="Url"
                value={url}
                onChange={e => setUrl(e.target.value)}
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