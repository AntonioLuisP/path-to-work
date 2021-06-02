import React from 'react'
import { CLink } from '@coreui/react'

const LinkMore = ({ to }) => {
  return (
    <CLink
      onClick={to}
      rel="noreferrer noopener"
    >
      <p className="float-right text-muted">Ver</p>
    </CLink>
  )
}

export default React.memo(LinkMore)