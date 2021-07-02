import React from 'react'

import {
  CBreadcrumb,
  CBreadcrumbItem,
} from '@coreui/react'

import CreateDataButton from './CreateDataButton'

export default function BreadcrumbHeader({ title, quantidade, component }) {

  return (
    <>
      <CBreadcrumb className="c-subheader-nav border-0 justify-content-between">
        <CBreadcrumbItem active>{title + ' (' + quantidade + ')'} </CBreadcrumbItem>
        <CreateDataButton component={component} className='float-right' />
      </CBreadcrumb>
    </>
  )
}