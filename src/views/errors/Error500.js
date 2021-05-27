import React from 'react'
import { Link } from 'react-router-dom'

import {
  CCol,
  CContainer,
  CRow
} from '@coreui/react'

const Error500 = () => {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <span className="clearfix">
              <h1 className="float-left display-3 mr-4">500</h1>
              <h4 className="pt-3">Temos um problema!</h4>
              <p className="text-muted float-left">Esta página está temporariamente indisponível.</p>
            </span>
            <div className="text-center">
              <Link to="/">
                Voltar para o ínicio!
              </Link>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Error500
