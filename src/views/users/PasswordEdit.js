import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from '../../services/supabase'
import { Actions as ActionNotification } from '../../redux/notifications'
import { Error, LoadButton, NosignalBadge, Form } from '../../reusable'

import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CFormGroup,
    CLabel,
    CInput,
} from '@coreui/react'

export default function PasswordEdit() {

    const dispatch = useDispatch()

    const sinal = navigator.onLine
    const [load, setLoad] = useState(true)
    const [errors, setErrors] = useState([])

    const [password, setPassword] = useState('')

    async function handleEdit() {
        setLoad(false)
        setErrors([])
        if (password.length < 9 || password.trim() === '') {
            setErrors(prev => [...prev, 'A senha deve ter no minimo 10 digitos'])
        } else {
            try {
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
            } catch (error) {
                setErrors(prev => [...prev, error.message])
            }
        }
        setLoad(true)
    }

    return (
        <Form onSubmit={handleEdit} >
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
                    {errors.length > 0 ? <Error errors={errors} /> : <></>}
                </CCardBody>
                <CCardFooter>
                    {!sinal ? (<NosignalBadge />) : <LoadButton load={load} />}
                </CCardFooter>
            </CCard>
        </Form>
    )
}