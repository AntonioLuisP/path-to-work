import React, { useState } from 'react'
import api from "../../services/api"

import {
    CCard,
    CCardHeader,
    CInputCheckbox,
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
            <CCardHeader className='text-center'>
                <CInputCheckbox
                    checked={todo.conclusion}
                    onChange={handleConclusion}
                />
                {todo.name}
            </CCardHeader>
        </CCard>
    )
}


