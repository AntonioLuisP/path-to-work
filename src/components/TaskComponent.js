import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { More } from '../reusable'
import api from "../services/api"
import TaskStatusHeader from './TaskStatusHeader'

import {
    CCard,
    CCardHeader,
    CInputCheckbox,
    CFormGroup,
    CLabel
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
            <CCardHeader className='text-break text-justify'>
                <CFormGroup variant="checkbox">
                    <CInputCheckbox
                        id="checkbox1"
                        name="checkbox1"
                        value="option1"
                        checked={task.conclusion}
                        onChange={handleConclusion}
                    />
                    <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">
                        {task.name}
                    </CLabel>
                    <More to={() => { history.push('/tasks/' + task.id) }}>
                        <CIcon width={18} content={cilTask} />
                    </More>
                </CFormGroup>
            </CCardHeader>
        </CCard>
    )
}

