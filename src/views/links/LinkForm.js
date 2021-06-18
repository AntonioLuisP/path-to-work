import React, { useState } from 'react'

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
  CTextarea,
  CLabel,
  CInputCheckbox
} from '@coreui/react'

export default function LinkForm(props) {

  const [link, setLink] = useState(props.link)

  return (
    <>
      <CModalHeader closeButton>
        <CModalTitle>Novo Link</CModalTitle>
      </CModalHeader >
      <CForm onSubmit={props.handleCreate} className="form-horizontal">
        <CModalBody>
          <CFormGroup row>
            <CCol xs="10" md="10">
              <CInput
                id="text-input"
                name="text-input"
                placeholder="Nome"
                value={link.name}
                onChange={e => setLink({ ...link, 'name': e.target.value })}
              />
            </CCol>
            <CCol xs="2" md="2">
              <CFormGroup variant="custom-checkbox" inline>
                <CInputCheckbox
                  custom
                  id="inline-checkbox1"
                  name="inline-checkbox1"
                  value={link.favorite}
                  onChange={e => setLink({ ...link, 'favorite': !link.favorite })}
                />
                <CLabel variant="custom-checkbox" htmlFor="inline-checkbox1">Favoritar</CLabel>
              </CFormGroup>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol xs="12" md="12">
              <CInput
                id="text-input"
                name="text-input"
                placeholder="Url"
                type='url'
                value={link.url}
                onChange={e => setLink({ ...link, 'url': e.target.value })}
              />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol xs="12" md="12">
              <CTextarea
                name="textarea-input"
                id="textarea-input"
                rows="3"
                maxLength='500'
                placeholder="Descrição..."
                value={link.description}
                onChange={e => setLink({ ...link, 'description': e.target.value })}
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