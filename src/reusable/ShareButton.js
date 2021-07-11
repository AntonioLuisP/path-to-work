import React from 'react'

import {
  CLink
} from '@coreui/react'

import {
  cilShareAlt,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

const ShareButton = ({ name }) => {

  return (
    <CLink
      rel="noreferrer noopener"
      className="card-header-action"
      onClick={() => navigator.clipboard.writeText(name)
      }
    >
      <CIcon width={22} content={cilShareAlt} />
    </CLink>

  )
}

export default React.memo(ShareButton)