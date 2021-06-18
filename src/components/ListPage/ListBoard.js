import React from 'react'
import ListComponent from './ListComponent'
import ListCreate from '../../views/lists/ListCreate'
import BreadcrumbHeader from '../../reusable/BreadcrumbHeader'

import {
  CCard,
  CCardBody,
} from '@coreui/react'

export default function ListBoard(props) {

  const lists = props.lists

  return (
    <>
      <BreadcrumbHeader title={props.title} component={<ListCreate />} />
      <CCard>
        <CCardBody height='80rm'>
          {
            lists.map(comment => (
              <ListComponent key={comment.id} comment={comment} />
            ))
          }
        </CCardBody>
      </CCard>
    </>
  )
}