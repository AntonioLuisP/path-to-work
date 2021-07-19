import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from '../../services/supabase'
import { Actions as ActionNotification } from '../../redux/notifications'
import { Error, Form } from '../../reusable'

import {
    CButton,
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
    const [errors, setErrors] = useState([])

    const [name, setName] = useState('')

    async function handleEdit() {
        setLoad(false)
        setErrors([])
        if (name.length < 3 || name.trim() === '') {
            setErrors(prev => [...prev, 'O nome deve ter mais que 3 digitos'])
        } else {
            try {
                const { user, error } = await supabase.auth.update({
                    data: {
                        full_name: name
                    },
                })
                if (error) {
                    setErrors(prev => [...prev, error.message])
                } else {
                    dispatch(ActionNotification.addOne({
                        header: 'Nome Editado:',
                        body: name,
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
            <CFormGroup>
                <CLabel >Edite seu Nome</CLabel>
                <CInputGroup>
                    <CInputGroupPrepend>
                        <CInputGroupText>
                            <CIcon name="cil-user" />
                        </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                        type="text"
                        placeholder="Nome Completo"
                        value={name}
                        valid={name.length > 2 && name.trim() !== ''}
                        onChange={e => setName(e.target.value)}
                    />
                    <CInputGroupAppend>
                        <CButton type="submit" color="success" disabled={!load}>
                            {
                                load ? 'Salvar' : (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />)
                            }
                        </CButton>
                    </CInputGroupAppend>
                </CInputGroup>
            </CFormGroup>
            {errors.length > 0 ? <Error errors={errors} /> : <></>}
        </Form>
    )
}