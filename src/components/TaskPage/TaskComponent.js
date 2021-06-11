import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { More } from '../../reusable'
import api from "../../services/api"
import TaskStatusHeader from './TaskStatusHeader'

import {
    CCard,
    CCardBody,
    CCardText,
    CCol,
} from '@coreui/react'

import {
    cilTask,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

export default function TaskComponent(props) {

    const history = useHistory()

    const [task, setTask] = useState(props.task)

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
                    <CCardText className='content-center text-break text-justify'>
                        <div className='col-sm-1 text-center'>
                            <input type='checkbox' checked={task.conclusion} onChange={handleConclusion} />
                        </div>
                        <div className='col-sm-11'>
                            {task.name}
                        </div>
                    </CCardText>
                    <More to={() => { history.push('/tasks/' + task.id) }}>
                        <CIcon width={20} content={cilTask} />
                    </More>
                </CCardBody>
            </CCard>
        </CCol>
    )
}

