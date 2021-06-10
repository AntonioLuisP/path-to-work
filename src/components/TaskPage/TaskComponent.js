import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { More } from '../../reusable'
import api from "../../services/api"
import TaskStatusHeader from './TaskStatusHeader'
import TaskStatusFooter from './TaskStatusFooter'

import {
    CCard,
    CCardBody,
    CCol,
} from '@coreui/react'

export default function TaskComponent(props) {

    const history = useHistory()

    const [task, setTask] = useState(props.task)
    const links = []
    const todos = []
    const comments = []

    async function handleConclusion(e) {
        e.preventDefault();
        const data = {
            'conclusion': !task.conclusion,
        }
        try {
            await api.put('/task/' + task.id, data, {})
                .then(response => {
                    if (response.status === 200) {
                        setTask(task => ({ ...task, 'conclusion': data.conclusion }))
                    }
                })
        } catch (error) {
            alert("erro")
            console.log(error)
        }
    }

    return (
        <CCol xs="12" sm="4" md="4">
            <CCard>
                <TaskStatusHeader task={task} />
                <CCardBody>
                    <table className='table table-sm table-borderless'>
                        <tbody>
                            <tr>
                                <td width='5%'>
                                    <input type='checkbox' checked={task.conclusion} onChange={handleConclusion} />
                                </td>
                                <td width='90%' className='text-break text-justify'>
                                    {task.name}
                                </td>
                                <td width='5%'>
                                    {<More to={() => { history.push('/tasks/' + task.id) }} />}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </CCardBody>
                <TaskStatusFooter links={links} todos={todos} comments={comments} />
            </CCard>
        </CCol>
    )
}

