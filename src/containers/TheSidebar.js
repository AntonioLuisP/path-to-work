import React from 'react'
import { useSidebar, Actions as ActionSidebar } from '../context/SidebarContext'
import Items from './Items'

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavItem,
} from '@coreui/react'

import {
  cilCursor,
  cilHome,
  cilList,
  cilContact,
  cilTask
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

const TheSidebar = () => {

  const [sidebar, setSidebar] = useSidebar()

  return (
    <CSidebar
      show={sidebar}
      onShowChange={(val) => setSidebar(ActionSidebar.showSwitch(val))}
    >
      <CSidebarBrand
        to='/'
        className="d-md-down-none text-center text-decoration-none"
      >
        Link Work
      </CSidebarBrand>
      <CSidebarNav>
        <CSidebarNavItem
          name="Dashboard"
          to="/dashboard"
          icon={<CIcon content={cilHome} customClasses="c-sidebar-nav-icon" />}
        />
        <CSidebarNavTitle>Link</CSidebarNavTitle>
        <CSidebarNavItem
          name="Links"
          to="/links"
          icon={<CIcon content={cilCursor} customClasses="c-sidebar-nav-icon" />}
        />
        <CSidebarNavItem
          name="Social"
          to="/social"
          icon={<CIcon content={cilContact} customClasses="c-sidebar-nav-icon" />}
        />
        <CSidebarNavTitle>Tarefa</CSidebarNavTitle>
        <CSidebarNavItem
          name="Tarefas"
          to="/tasks"
          icon={<CIcon content={cilTask} customClasses="c-sidebar-nav-icon" />}
        />
        <CSidebarNavTitle>Projetos</CSidebarNavTitle>
        <CSidebarNavItem
          name="Todos Projetos"
          to="/projects"
          icon={<CIcon content={cilList} customClasses="c-sidebar-nav-icon" />}
        />
        <Items />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  )
}

export default TheSidebar