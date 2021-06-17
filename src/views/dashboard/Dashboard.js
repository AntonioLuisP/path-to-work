import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TaskBoard from "../../components/TaskPage/TaskBoard"
import LinkBoard from "../../components/LinkPage/LinkBoard"
import api from "../../services/api"
import { Loading } from '../../reusable/'
import { Actions as ActionLink } from '../../redux/links'
import { Actions as ActionTask } from '../../redux/tasks'

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
        api.get('link')
            .then(response => {
                if (response.status === 200) {
                    dispatch(ActionLink.fillSome(response.data.data))
                }
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
        api.get('project')
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
            <CCol xs="12" sm="6" md="6">
                <LinkBoard title='Links Favoritos' links={links} />
            </CCol>
            <CCol xs="12" sm="6" md="6">
                <TaskBoard title='Tarefas do dia' tasks={tasks} />
            </CCol>
        </CRow>
    )
}