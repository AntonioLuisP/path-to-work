import React, { useState } from 'react'
import api from "../../services/api"

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
        <tr>
            <td width='5%'>
                <input type='checkbox' checked={todo.conclusion} onChange={handleConclusion} />
            </td>
            <td width='90%' className='text-break text-justify'>
                {todo.name}
            </td>
        </tr>
    )
}
