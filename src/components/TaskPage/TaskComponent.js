import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { More } from '../../reusable'
import api from "../../services/api"

import {
    CCard,
    CCardHeader,
    CCardBody,
    CCol,
    CInputCheckbox,
    CCardFooter,
    CRow
} from '@coreui/react'

export default function TaskComponent(props) {

    const history = useHistory()

    const [task, setTask] = useState(props.task)
    const [header, setHeader] = useState(
        {
            'show': false,
            'atual': 0,
            'layouts': [
                {
                    'message': 'Sem data',
                    'color': 'dark'
                },
                {
                    'message': 'Em dia',
                    'color': 'info'
                },
                {
                    'message': 'Atrasado',
                    'color': 'danger'
                },
                {
                    'message': 'Vence Hoje',
                    'color': 'warning'
                },
                {
                    'message': 'Concluída',
                    'color': 'success'
                },
            ]
        }
    )
    // quando a data tiver bonita ajustar o header

    useEffect(() => {
        if(task.conclusion) {
            setHeader(header => ({ ...header, 'show': true, 'atual': 4 }))
        } else{
            setHeader(header => ({ ...header, 'show': false, 'atual': 4 }))
        }
    }, [task])

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
                {
                    header.show ?
                        (
                            <CCardHeader className='content-center' color={header.layouts[header.atual].color}>
                                <p className="text-white my-2">{header.layouts[header.atual].message}</p>
                            </CCardHeader>
                        )
                        : ''
                }
                <CCardBody className='text-center'>
                    <CInputCheckbox
                        checked={task.conclusion}
                        onChange={handleConclusion}
                    />
                    {task.name}
                    <More to={() => { history.push('/tasks/' + task.id) }} />
                </CCardBody>
                <CCardFooter className='text-center'>
                    <CRow>
                        <CCol>
                            <div className="text-value-md">7</div>
                            <div className="text-uppercase text-muted small">Links</div>
                        </CCol>
                        <CCol>
                            <div className="text-value-md">8</div>
                            <div className="text-uppercase text-muted small">Afazeres</div>
                        </CCol>
                        <CCol>
                            <div className="text-value-md">9</div>
                            <div className="text-uppercase text-muted small">Comentários</div>
                        </CCol>
                    </CRow>
                </CCardFooter>
            </CCard>
        </CCol>
    )
}

