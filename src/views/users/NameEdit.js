import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from '../../services/supabase'
import { Actions as ActionNotification } from '../../redux/notifications'

import {
    CButton,
    CForm,
    CFormGroup,
    CLabel,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CInputGroupAppend
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

export default function NameEdit() {

    const dispatch = useDispatch()
    const [load, setLoad] = useState(true)
    const [name, setName] = useState('')

    async function handleEdit(e) {
        e.preventDefault();
        setLoad(false)
        if (name.trim() === '')
            return; 
        const { user, error } = await supabase.auth.update({
            data: {
                full_name: name
            },
        })
        if (error) {
            alert("error", error)
            return;
        } else {
            dispatch(ActionNotification.addOne({
                header: 'Nome Editado:',
                body: '',
                id: user.id,
            }))
        }
        setLoad(true)
    }

    return (
        <CForm onSubmit={handleEdit} className="form-horizontal">
            <CFormGroup>
                <CLabel >Edite seu Nome</CLabel>
                <CInputGroup>
                    <CInputGroupPrepend>
                        <CInputGroupText>
                            <CIcon name="cil-user" />
                        </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Nome Completo" value={name} onChange={e => setName(e.target.value)} autoComplete=" name" />
                    <CInputGroupAppend>
                        <CButton type="submit" color="success" disabled={!load}>
                            {
                                load ? 'Salvar' : (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />)
                            }
                        </CButton>
                    </CInputGroupAppend>
                </CInputGroup>
            </CFormGroup>
        </CForm>
    )
}