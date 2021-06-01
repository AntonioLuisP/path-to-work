import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import {
    CHeader,
    CToggler,
    CHeaderBrand,
    CHeaderNav,
    CHeaderNavItem,
    CHeaderNavLink,
    CSubheader,
    CBreadcrumb,
    CBreadcrumbItem,
} from '@coreui/react'

import {
    cilNotes,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

import {
    HeaderDropdown,
    HeaderPlus
} from './index'

export default function Header() {

    const dispatch = useDispatch()
    const sidebarShow = useSelector(state => state.sidebarShow)

    const toggleSidebar = () => {
        const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
        dispatch({ type: 'set', sidebarShow: val })
    }

    const toggleSidebarMobile = () => {
        const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
        dispatch({ type: 'set', sidebarShow: val })
    }
    
    return (
        <CHeader withSubheader>
            <CToggler
                inHeader
                className="ml-md-3 d-lg-none"
                onClick={toggleSidebarMobile}
            />
            <CToggler
                inHeader
                className="ml-3 d-md-down-none"
                onClick={toggleSidebar}
            />
            <CHeaderBrand className="mx-auto d-lg-none" to="/">
                <CIcon
                    className="c-sidebar-brand-full"
                    name="logo-negative"
                    content={cilNotes}
                    height={35}
                />
            </CHeaderBrand>

            <CHeaderNav className="d-md-down-none mr-auto">
                <CHeaderNavItem className="px-3" >
                    <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
                </CHeaderNavItem>
            </CHeaderNav>

            <CHeaderNav className="px-3">
                <HeaderPlus />
                <HeaderDropdown />
            </CHeaderNav>

            <CSubheader className="px-3 justify-content-between">
                <CBreadcrumb
                    className="border-0 c-subheader-nav m-0 px-0 px-md-3"
                >
                    <CBreadcrumbItem
                        active={false}
                    >
                        <Link to="/dashboard">Home</Link>
                    </CBreadcrumbItem>
                    <CBreadcrumbItem
                        active={true}
                    >
                        Dashboard
                    </CBreadcrumbItem>
                </CBreadcrumb>
            </CSubheader>
        </CHeader>
    )
}