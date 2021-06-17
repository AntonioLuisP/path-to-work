import React from 'react'
import LinkComponent  from './LinkComponent'
import LinkCreate from '../../views/links/LinkCreate'
import BreadcrumbHeader from '../../reusable/BreadcrumbHeader'

import {
  CCol,
  CRow,
} from '@coreui/react'

export default function LinkBoard(props) {

  const links = props.links
  
  return (
    <CRow>
      <CCol xs="12" sm="12" md="12">
        <BreadcrumbHeader title='Seus Links' component={<LinkCreate />}/>
        {
          links.map(link => (
            <LinkComponent key={link.id} link={link} />
          ))
        }
      </CCol>
    </CRow>
  )
}