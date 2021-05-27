import React from 'react'
import { CLink } from '@coreui/react'

const SeeMore = ({ to }) => {
  return (
    <CLink
      onClick={to}
      rel="noreferrer noopener"
      className="card-header-action"
    >
      <small className="text-muted"> Ver </small>
    </CLink>

  )
}

export default React.memo(SeeMore)