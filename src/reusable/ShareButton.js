import React from 'react'

import {
  CLink,
  CTooltip,
  CPopover
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

const ShareButton = ({ name }) => {

  const link = window.location.origin + '/#/social/' + name

  return (
    <CPopover
      header="Link copiado"
      placement={'top'}
      interactive={true}
      trigger="click"
    >
      <CLink
        rel="noreferrer noopener"
        className="card-header-action text-primary"
        onClick={() => navigator.clipboard.writeText(link)
        }
      >
        <CTooltip
          content='Copiar seu link'
          placement='top'
        >
          <CIcon name='cil-share'width={18} />
        </CTooltip>
      </CLink>
    </CPopover>

  )
}

export default React.memo(ShareButton)