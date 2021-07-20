import React from 'react'
import { supabase } from '../../services/supabase'

import {
    CButton,
} from '@coreui/react'

import {
    cibGoogle,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

const OAuth = () => {

    async function handleOAuthLogin(provider) {
        try {
            const { error } = await supabase.auth.signIn({ provider: provider });
            if (error) {
                alert("Erro: ", error.message)
                return;
            }
        } catch (error) {
            alert("Erro: ", error.message)
            return;
        }
    }

    return (
        <CButton
            type='button'
            onClick={() => handleOAuthLogin('google')}
            className="btn-youtube btn-brand mr-1 mb-1"
        >
            <CIcon content={cibGoogle} />
            <span className="mfs-2">Google</span>
        </CButton>
    )
}

export default OAuth
