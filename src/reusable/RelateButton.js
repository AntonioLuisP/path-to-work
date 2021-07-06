import React from 'react'
import BreadcrumbBaseButton from './BreadcrumbBaseButton'

import {
  CTooltip
} from '@coreui/react'

import {
  cilPlaylistAdd,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

const RelateButton = ({ component }) => {
  return (
    <BreadcrumbBaseButton component={component} >
      <CTooltip
        content='Adicionar'
        placement='top'
      >
        <CIcon content={cilPlaylistAdd} width={22} />
      </CTooltip>
    </BreadcrumbBaseButton>
  )
}

export default React.memo(RelateButton)