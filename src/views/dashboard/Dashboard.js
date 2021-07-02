import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Actions as ActionLink } from '../../redux/link'
import { Actions as ActionTask } from '../../redux/task'
import { TaskComponent, LinkComponent } from "../../components/"
import LinkCreate from '../links/LinkCreate'
import TaskCreate from '../tasks/TaskCreate'
import { Loading, BreadcrumbHeader, NoItems, CreateDataButton } from '../../reusable/'
import { supabase } from '../../services/supabase'

import {
    CCol,
    CRow,
} from '@coreui/react'

export default function Dashboard() {

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)

    const tasks = useSelector(state => state.tasks)
    const links = useSelector(state => state.links)

    const fetchLinks = useCallback(async () => {
        const { data: links, error } = await supabase
            .from("links")
            .select("*")
            .eq('is_favorite', 'true')
            .order("created_at", { ascending: false });
        if (error) {
            console.log("error", error);
        }
        else {
            dispatch(ActionLink.fillSome(links))
        }
    }, [dispatch])

    const fetchTasks = useCallback(async () => {
        const { data: tasks, error } = await supabase
            .from("tasks")
            .select("*")
            .order("created_at", { ascending: false });
        if (error) {
            console.log("error", error);
        }
        else {
            dispatch(ActionTask.fillSome(tasks))
        }
    }, [dispatch])

    useEffect(() => {
        fetchLinks()
        fetchTasks()
        setLoading(false)
        return () => {
            dispatch(ActionLink.fillSome([]))
            dispatch(ActionTask.fillSome([]))
        }
    }, [dispatch, fetchLinks, fetchTasks])

    if (loading) return (<Loading />)

    return (
        <CRow>
            <CCol xs="12" sm="8" md="8">
                <BreadcrumbHeader title='Links Favoritos' quantidade={links.length} />
                <CreateDataButton component={<LinkCreate />} />
                {links <= 0 ? <NoItems /> :
                    links.map(link => (<LinkComponent key={link.id} link={link} />))
                }
            </CCol>
            <CCol xs="12" sm="4" md="4">
                <BreadcrumbHeader title='Tarefas do dia' quantidade={tasks.length} />
                <CreateDataButton component={<TaskCreate />} />
                {tasks <= 0 ? <NoItems /> :
                    tasks.map(task => (<TaskComponent key={task.id} task={task} />))
                }
            </CCol>
        </CRow>
    )
}