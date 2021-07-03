import React from 'react'

import {
  CLink
} from '@coreui/react'

const GoTo = ({ action, children }) => {
  return (
    <CLink
      onClick={action}
      rel="noreferrer noopener"
      className="card-header-action text-primary"
    >
      {children}
    </CLink>
  )
}

export default React.memo(GoTo)