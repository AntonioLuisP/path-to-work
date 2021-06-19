import React from 'react'
import ListComponent from './ListComponent'
import BreadcrumbHeader from '../../reusable/BreadcrumbHeader'

import {
  CCol,
  CRow,
} from '@coreui/react'

export default function ListBoard(props) {

  const lists = props.lists

  return (
    <CRow>
      <CCol xs="12" sm="12" md="12">
        <BreadcrumbHeader title={props.title} quantidade={lists.length} component={props.component} />
        {
          lists.map(list => (
            <ListComponent key={list.id} list={list} />
          ))
        }
      </CCol>
    </CRow>
  )
}