import React from 'react'

import {
  CLink
} from '@coreui/react'

import {
  cilStar,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

const Favorite = ({ link, action }) => {

  const color = link.is_favorite ? 'text-warning' : 'text-black'
  return (
    <CLink
      onClick={action}
      rel="noreferrer noopener"
      className="card-header-action"
    >
      <CIcon className={'text-decoration-none ' + color}
        width={18} content={cilStar} />
    </CLink>

  )
}

export default React.memo(Favorite)