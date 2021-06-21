import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Actions as ActionLink } from '../../redux/link'
import { Actions as ActionTask } from '../../redux/task'
import { TaskComponent, LinkComponent } from "../../components/"
import LinkCreate from '../links/LinkCreate'
import TaskCreate from '../tasks/TaskCreate'
import { Loading, BreadcrumbHeader } from '../../reusable/'
import api from "../../services/api"

import {
    CCol,
    CRow,
} from '@coreui/react'

export default function Dashboard() {

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)

    const tasks = useSelector(state => state.tasks)
    const links = useSelector(state => state.links)

    useEffect(() => {
        api.get('link?favorite=true')
            .then(response => {
                if (response.status === 200) {
                    dispatch(ActionLink.fillSome(response.data.data))
                }
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
        api.get('task?conclusion=false')
            .then(response => {
                if (response.status === 200) {
                    dispatch(ActionTask.fillSome(response.data.data))
                }
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
        setLoading(false)
        return () => {
            dispatch(ActionLink.fillSome([]))
            dispatch(ActionTask.fillSome([]))
        }
    }, [dispatch])

    if (loading) return (<Loading />)

    return (
        <CRow>
            <CCol xs="12" sm="8" md="8">
                <BreadcrumbHeader title='Links Favoritos' quantidade={links.length} component={<LinkCreate />} />
                {
                    links.map(link => (
                        <LinkComponent key={link.id} link={link} />
                    ))
                }
            </CCol>
            <CCol xs="12" sm="4" md="4">
                <BreadcrumbHeader title='Tarefas do dia' quantidade={tasks.length} component={<TaskCreate />} />
                {
                    tasks.map(task => (
                        <TaskComponent key={task.id} task={task} />
                    ))
                }
            </CCol>
        </CRow>
    )
}