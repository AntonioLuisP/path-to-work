import React from 'react'

import {
  CBreadcrumb,
  CBreadcrumbItem,
} from '@coreui/react'

export default function BreadcrumbHeader({ title, quantidade }) {

  return (
    <>
      <CBreadcrumb className="c-subheader-nav justify-content-between">
        <CBreadcrumbItem active>{title + ' (' + quantidade + ')'} </CBreadcrumbItem>
      </CBreadcrumb>
    </>
  )
}