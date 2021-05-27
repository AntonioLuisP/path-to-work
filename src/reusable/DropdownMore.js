import React from 'react'

import {
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from '@coreui/react'

import {
  cilPen,
  cilTrash,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

const DropdownMore = ({ editAction, deleteAction, }) => {
  return (
    <CDropdown >
      <CDropdownToggle className="card-header-action">
        <CIcon name="cil-settings" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={editAction}>
          <p><CIcon content={cilPen} />{' '}Editar</p>
        </CDropdownItem>
        <CDropdownItem onClick={deleteAction}>
          <p><CIcon content={cilTrash} />{' '}Deletar</p>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default React.memo(DropdownMore)