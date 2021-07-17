import React from 'react'

import {
  CTooltip,
  CLink
} from '@coreui/react'

import {
  cilStar,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

const Favorite = ({ favorito, action }) => {

  const color = favorito ? 'text-warning' : 'text-black'
  return (
    <CLink
      onClick={action}
      rel="noreferrer noopener"
      className="card-header-action"
    >
      <CTooltip
        content={favorito ? 'Desfavoritar' : 'Favoritar'}
        placement='top'
      >
        <CIcon width={18} content={cilStar} className={'text-decoration-none ' + color} />
      </CTooltip>
    </CLink>

  )
}

export default React.memo(Favorite)