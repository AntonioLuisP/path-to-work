import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import NameEdit from './NameEdit'
import PasswordEdit from './PasswordEdit'

import {
  CCol,
  CRow,
  CCard,
  CCardHeader,
  CCardBody
} from '@coreui/react'

export default function User() {

  const { authUser } = useAuth()

  return (
    <div>
      <CRow>
        <CCol xs="12" sm="3" md="3">
          <CCard className="content-center">
            <CCardHeader className='border-0 text-break text-justify'>
              <h3><strong>Usuário:</strong></h3>
            </CCardHeader>
            <CCardHeader className='border-0'>
              <h3>
                {
                  authUser.user_metadata.full_name === undefined ?
                    'Diga seu nome' :
                    authUser.user_metadata.full_name
                }
              </h3>
            </CCardHeader>
          </CCard>
        </CCol>
        <CCol xs="12" sm="9" md="9">
          <CCard>
            <CCardBody>
              <NameEdit />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <PasswordEdit />
    </div>
  )
}