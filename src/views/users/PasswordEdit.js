import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from '../../services/supabase'
import { Actions as ActionNotification } from '../../redux/notifications'

import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CForm,
    CFormGroup,
    CLabel,
    CInput,
} from '@coreui/react'

export default function PasswordEdit() {

    const dispatch = useDispatch()
    const [load, setLoad] = useState(true)
    const [password, setPassword] = useState('')

    async function handleEdit(e) {
        e.preventDefault();
        setLoad(false)
        const { user, error } = await supabase.auth.update({
            password: password,
        })
        if (error) {
            alert("error", error)
            return;
        } else {
            dispatch(ActionNotification.addOne({
                header: 'Senha Editada:',
                body: '',
                id: user.id,
            }))
        }
        setLoad(true)
    }

    return (
        <CForm onSubmit={handleEdit} className="form-horizontal">
            <CCard>
                <CCardHeader>
                    Editar Senha
                </CCardHeader>
                <CCardBody>
                    <CFormGroup>
                        <CLabel >Digite a nova senha</CLabel>
                        <CInput type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} autoComplete=" password" />
                    </CFormGroup>
                </CCardBody>
                <CCardFooter>
                    <CButton type="submit" color="success" disabled={!load}>
                        {
                            load ? 'Salvar' : (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />)
                        }
                    </CButton>
                </CCardFooter>
            </CCard>
        </CForm>
    )
}