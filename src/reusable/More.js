import React from 'react'
import { CLink } from '@coreui/react'

const More = (props) => {
  return (
    <CLink
      onClick={props.to}
      rel="noreferrer noopener"
      className='float-right text-decoration-none'
    >
      {props.children}
    </CLink>
  )
}

export default React.memo(More)