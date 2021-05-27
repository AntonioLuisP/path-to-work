import React from 'react'
import { Link } from 'react-router-dom'

import {
  CCol,
  CContainer,
  CRow
} from '@coreui/react'

const Error404 = () => {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <div className="clearfix">
              <h1 className="float-left display-3 mr-4">404</h1>
              <h4 className="pt-3">Oops! Está perdido.</h4>
              <p className="text-muted float-left">Esta página não foi encontrada.</p>
            </div>
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

export default Error404
