import React from 'react'

import {
  CTooltip,
} from '@coreui/react'

import {
  cilExternalLink,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

const GoOutside = ({ go }) => {
  return (
    <a
      className="card-header-action text-primary"
      rel="noreferrer noopener"
      target='_blank'
      href={go}
    >
      <CTooltip
        content='Ir'
        placement='top'
      >
        <CIcon content={cilExternalLink} />
      </CTooltip>
    </a>
  )
}

export default React.memo(GoOutside)