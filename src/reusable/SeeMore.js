import React from 'react'
import { CLink } from '@coreui/react'

const SeeMore = ({ to }) => {
  return (
    <CLink
      onClick={to}
      rel="noreferrer noopener"
      className="card-header-action stretched-link"
    >
      <small className="text-muted"></small>
    </CLink>

  )
}

export default React.memo(SeeMore)