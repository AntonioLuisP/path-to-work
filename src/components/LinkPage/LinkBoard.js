import React from 'react'
import LinkComponent  from './LinkComponent'
import LinkHeader  from './LinkHeader'

import {
  CCol,
  CRow,
} from '@coreui/react'

export default function LinkBoard(props) {

  const links = props.links
  
  return (
    <CRow>
      <CCol xs="12" sm="12" md="12">
        <LinkHeader />
        {
          links.map(link => (
            <LinkComponent key={link.id} link={link} />
          ))
        }
      </CCol>
    </CRow>
  )
}