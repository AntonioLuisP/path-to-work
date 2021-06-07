import React from 'react'
import { useHistory } from 'react-router-dom'
import { More } from '../reusable'

import {
    CCard,
    CCardHeader,
    CCardBody,
    CCol,
    CSwitch,
} from '@coreui/react'

export default function TaskComponent(props) {

    const history = useHistory()

    const task = props.task

    return (
        <CCol xs="12" sm="6" md="6" key={task.id}>
            <CCard>
                <CCardHeader>
                    {task.name}
                    <div className="card-header-actions">
                        <More to={() => { history.push('/tasks/' + task.id) }} />
                        <CSwitch className={'float-right mb-0'} color={'success'} defaultChecked size={'sm'} tabIndex="0" />
                    </div>
                </CCardHeader>
                <CCardBody>
                    {task.description ? task.description : 'No description'}
                </CCardBody>
            </CCard>
        </CCol>
    )
}


