import React from 'react'

import {
  CBreadcrumb,
  CBreadcrumbItem,
  CButtonGroup
} from '@coreui/react'

export default function BreadcrumbHeader({ title, quantidade = null, children }) {

  return (
    <>
      <CBreadcrumb className="c-subheader-nav border-0 justify-content-between">
        <CBreadcrumbItem active>
          {title} {quantidade ? ' (' + quantidade + ')' : ''}
        </CBreadcrumbItem>
        <CButtonGroup >
          {children}
        </CButtonGroup>
      </CBreadcrumb>
    </>
  )
}