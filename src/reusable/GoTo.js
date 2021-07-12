import React from 'react'

import {
  CTooltip,
  CLink
} from '@coreui/react'

const GoTo = ({ go, children }) => {
  return (
    <CLink
      rel="noreferrer noopener"
      className="card-header-action text-primary"
      to={go}
    >
      <CTooltip
        content='Ver'
        placement='top'
      >
        {children}
      </CTooltip>
    </CLink>
  )
}

export default React.memo(GoTo)