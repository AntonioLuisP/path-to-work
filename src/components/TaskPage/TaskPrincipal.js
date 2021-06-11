import React from 'react'
import { useHistory } from 'react-router-dom'
import { DropdownMore } from '../../reusable'
import api from "../../services/api"

import {
    CCard,
    CCardHeader,
    CCardBody,
} from '@coreui/react'

export default function TaskPrincipal(props) {

    const history = useHistory()

    const task = props.task

    async function handleDelete(id) {
        try {
            await api.delete(`/task/${id}`, {})
            alert('apaguei')
            history.push('/projects/' + task.id_project)
        } catch (error) {
            alert("Erro ao deletar o caso, tente novamente")
            console.log(error)
        }
    }

    return (
        <CCard className='text-break text-justify'>
            <CCardHeader color="secondary">
                {task.name}
                <div className="card-header-actions">
                    <DropdownMore
                        editAction={() => history.push('/tasks/' + task.id + '/edit')}
                        deleteAction={() => handleDelete(task.id)}
                    />
                </div>
            </CCardHeader>
            <CCardBody>
                {task.description ? task.description : 'No description'}
            </CCardBody>
        </CCard>
    )
}


