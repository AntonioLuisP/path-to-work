import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { More } from '../../reusable'
import api from "../../services/api"

import {
    CCard,
    CCardHeader,
    CCardBody,
    CCol,
    CSwitch,
} from '@coreui/react'

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
                        setTask(task=> ({...task, 'conclusion': data.conclusion}))
                    }
                })
        } catch (error) {
            alert("erro")
            console.log(error)
        }
    }

    return (
        <CCol xs="12" sm="4" md="4" key={task.id}>
            <CCard>
                <CCardHeader>
                    {task.name}
                    <div className="card-header-actions">
                        <CSwitch
                         className={'float-right mb-0'} 
                         color={'success'}
                         size={'sm'} 
                         tabIndex="0" 
                         checked={task.conclusion}
                         onChange={handleConclusion}
                         />
                        <More to={() => { history.push('/tasks/' + task.id) }} />
                    </div>
                </CCardHeader>
                <CCardBody>
                    {task.description ? task.description : 'No description'}
                </CCardBody>
            </CCard>
        </CCol>
    )
}


