import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import api from "../../services/api"
import { addNotification } from '../../actions/notifications'

import {
  CButton,
  CCol,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardTitle,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
} from '@coreui/react'

export default function LinkEdit({ match }) {

  const dispatch = useDispatch()

  const [load, setLoad] = useState(true)
  const [link, setLink] = useState({
    'id': '',
    'name': '',
    'url': '',
  })

  useEffect(() => {
    api.get('link/' + match.params.id)
      .then(response => {
        if (response.status === 200) {
          setLink(response.data.link)
        }
      })
  }, [match.params.id])

  async function handleEdit(e) {
    e.preventDefault();
    setLoad(false)
    const data = {
      'name': link.name,
      'url': link.url
    }
    try {
      await api.put('/link/' + link.id, data, {})
        .then(response => {
          if (response.status === 200) {
            dispatch(addNotification({
              header: 'Link Editado:',
              body: link.name,
              id: link.id,
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
    <CRow>
      <CCol xs="12" sm="12">
        <CCard>
          <CCardHeader>
            <CCardTitle>Editar Link</CCardTitle>
          </CCardHeader>
          <CForm onSubmit={handleEdit} className="form-horizontal">
            <CCardBody>
              <CFormGroup row>
                <CCol xs="12" md="12">
                  <CInput
                    id="text-input"
                    name="text-input"
                    placeholder="Nome"
                    value={link.name}
                    onChange={e => setLink({ ...link, 'name': e.target.value })} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol xs="12" md="12">
                  <CLabel htmlFor="text-input">Link</CLabel>
                  <CInput
                    id="text-input"
                    name="text-input"
                    placeholder="Url"
                    value={link.url}
                    onChange={e => setLink({ ...link, 'url': e.target.value })}
                  />
                </CCol>
              </CFormGroup>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" color="success" disabled={!load}>
                {
                  load ? 'Salvar' : (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />)
                }
              </CButton>
            </CCardFooter>
          </CForm>
        </CCard>
      </CCol>
    </CRow>
  )
}