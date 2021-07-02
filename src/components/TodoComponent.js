import React, { useState } from 'react'
import api from "../services/api"

import {
    CCard,
    CCardHeader,
    CInputCheckbox,
    CFormGroup,
    CLabel
} from '@coreui/react'

export default function TodoComponent(props) {

    const [todo, setTodo] = useState(props.todo)

    async function handleConclusion(e) {
        e.preventDefault();
        const data = {
            'conclusion': !todo.conclusion,
        }
        try {
            await api.put('/todo/' + todo.id, data, {})
                .then(response => {
                    if (response.status === 200) {
                        setTodo(todo => ({ ...todo, 'conclusion': data.conclusion }))
                    }
                })
        } catch (error) {
            alert("erro")
            console.log(error)
        }
    }

    return (
        <CCard>
            <CCardHeader className='text-break text-justify'>
                <CFormGroup variant="checkbox">
                    <CInputCheckbox
                        id="checkbox1"
                        name="checkbox1"
                        value="option1"
                        checked={todo.conclusion}
                        onChange={handleConclusion}
                    />
                    <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">
                        {todo.conclusion ? <s>{todo.name}</s> : todo.name}
                    </CLabel>
                </CFormGroup>
            </CCardHeader>
        </CCard>
    )
}
