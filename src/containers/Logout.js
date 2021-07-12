import React from 'react'
import { supabase } from '../services/supabase'
import { useHistory } from 'react-router'

import {
    CHeaderNav,
    CHeaderNavItem,
    CHeaderNavLink,
    CTooltip,
} from '@coreui/react'

import {
    cilAccountLogout
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

const Logout = () => {

    const history = useHistory()

    async function handleLogout() {
        supabase.auth.signOut().catch(console.error)
        history.push('/login')
    };

    return (
        <CHeaderNav className="px-3">
            <CHeaderNavItem className="px-3">
                <CTooltip
                    content='Logout'
                    placement='bottom'
                >
                    <CHeaderNavLink onClick={() => handleLogout()}>
                        <CIcon content={cilAccountLogout} className="mfe-2" />
                    </CHeaderNavLink>
                </CTooltip>
            </CHeaderNavItem>
        </CHeaderNav>
    )
}

export default Logout
