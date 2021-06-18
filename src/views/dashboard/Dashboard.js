import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TaskBoard from "../../components/TaskPage/TaskBoard"
import LinkBoard from "../../components/LinkPage/LinkBoard"
import api from "../../services/api"
import { Loading } from '../../reusable/'
import { Actions as ActionLink } from '../../redux/link'
import { Actions as ActionTask } from '../../redux/task'

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
            <CCol xs="12" sm="8" md="8">
                <LinkBoard title='Links Favoritos' links={links} />
            </CCol>
            <CCol xs="12" sm="4" md="4">
                <TaskBoard title='Tarefas do dia' tasks={tasks} />
            </CCol>
        </CRow>
    )
}