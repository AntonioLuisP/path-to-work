import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from '../../services/supabase'
import { Actions as ActionNotification } from '../../redux/notifications'
import { Error } from '../../reusable'

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
    const [errors, setErrors] = useState([])

    const [password, setPassword] = useState('')

    async function handleEdit(e) {
        e.preventDefault();
        setLoad(false)
        setErrors([])
        if (password.length < 9 || password.trim() === '') {
            setErrors(prev => [...prev, 'A senha deve ter no minimo 10 digitos'])
        } else {
            const { user, error } = await supabase.auth.update({
                password: password,
            })
            if (error) {
                setErrors(prev => [...prev, error.message])
            } else {
                dispatch(ActionNotification.addOne({
                    header: 'Senha Editada:',
                    body: '',
                    id: user.id,
                }))
            }
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
                        <CLabel >Digite uma nova senha</CLabel>
                        <CInput
                            type="password"
                            placeholder="Senha"
                            required
                            value={password}
                            valid={password.length > 9 && password.trim() !== ''}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </CFormGroup>
                    <Error errors={errors} />
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