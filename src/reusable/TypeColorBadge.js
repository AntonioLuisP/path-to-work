import React from 'react'

import {
  CBadge,
} from '@coreui/react'

const TypeColorBadge = ({ type }) => {

  const color = type === 'Certeza' ? "success" : "warning"

  return (
    <CBadge color={color}>{type}</CBadge>
  )
}

export default TypeColorBadge