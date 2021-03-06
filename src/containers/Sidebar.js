import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Actions as ActionSidebar } from '../redux/sidebar'

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
  cilTask,
  cilUser
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

const Sidebar = () => {

  const dispatch = useDispatch()
  const sidebar = useSelector(state => state.sidebar)

  return (
    <CSidebar
      show={sidebar}
      onShowChange={(val) => dispatch(ActionSidebar.showSwitch(val))}
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
          name="Perfil Social"
          to="/profile"
          icon={<CIcon content={cilContact} customClasses="c-sidebar-nav-icon" />}
        />
        <CSidebarNavItem
          name="Listas"
          to="/lists"
          icon={<CIcon content={cilList} customClasses="c-sidebar-nav-icon" />}
        />
        <CSidebarNavTitle>Tarefa</CSidebarNavTitle>
        <CSidebarNavItem
          name="Tarefas"
          to="/tasks"
          icon={<CIcon content={cilTask} customClasses="c-sidebar-nav-icon" />}
        />
        <CSidebarNavTitle>Perfil</CSidebarNavTitle>
        <CSidebarNavItem
          name="Usuário"
          to="/user"
          icon={<CIcon content={cilUser} customClasses="c-sidebar-nav-icon" />}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  )
}

export default Sidebar