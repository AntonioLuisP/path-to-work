import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { More } from '../../reusable'
import api from "../../services/api"
import TaskStatusHeader from './TaskStatusHeader'

import {
    CCard,
    CCardBody,
    CCardText,
    CCardFooter,
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
        <CCard>
            <TaskStatusHeader task={task} />
            <CCardBody className='content-center'>
                <div className='col-sm-1 text-center'>
                    <input type='checkbox' checked={task.conclusion} onChange={handleConclusion} />
                </div>
                <div className='col-sm-11'>
                    <CCardText className='text-break text-justify'>
                        {task.name}
                    </CCardText>
                </div>
            </CCardBody>
            <CCardFooter>
                <More to={() => { history.push('/tasks/' + task.id) }}>
                    <CIcon width={18} content={cilTask} />
                </More>
            </CCardFooter>
        </CCard>
    )
}

