import React from 'react'
import BreadcrumbBaseButton from './BreadcrumbBaseButton'

import {
  CTooltip
} from '@coreui/react'

import {
  cilPlus,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

const AddButton = ({ component }) => {
  return (
    <BreadcrumbBaseButton component={component} >
      <CTooltip
        content='Criar'
        placement='top'
      >
        <CIcon content={cilPlus} width={22} />
      </CTooltip>
    </BreadcrumbBaseButton>
  )
}

export default React.memo(AddButton)