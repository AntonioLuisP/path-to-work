import React from 'react'
import { CLink } from '@coreui/react'

const More = ({ to }) => {
  return (
    <CLink
      onClick={to}
      rel="noreferrer noopener"
      className='float-right text-muted text-decoration-none'
    >
      Ver
    </CLink>
  )
}

export default React.memo(More)