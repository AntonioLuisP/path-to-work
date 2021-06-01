import React from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CTooltip
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import {
  cilPlus,
} from '@coreui/icons'

const TaskCreate = React.lazy(() => import('../../views/tasks/TaskCreate'));

export default function TheHeaderPlus() {
  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CTooltip
          content='Novo Projeto'
          placement='bottom'
        >
          <CIcon content={cilPlus} />
        </CTooltip>
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0">
        <CDropdownItem
          header
          tag="div"
          className="text-center"
          color="light"
        >
          <strong>Crie uma Tarefa</strong>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          Tarefa
          <TaskCreate/>
        </CDropdownItem>

      </CDropdownMenu>
    </CDropdown>
  )
}


