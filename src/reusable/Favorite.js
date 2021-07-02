import React from 'react'

import {
  cilStar,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

const Favorite = ({ link }) => {

  const color = link.is_favorite ? 'text-warning' : 'text-black'
  return (
    <CIcon className={'float-right text-decoration-none ' + color}
      width={18} content={cilStar} />
  )
}

export default React.memo(Favorite)