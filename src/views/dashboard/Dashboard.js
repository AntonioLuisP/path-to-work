import React, { useEffect, useState, useCallback } from 'react'
import { TaskComponent, LinkComponent } from "../../components/"
import LinkCreate from '../links/LinkCreate'
import TaskCreate from '../tasks/TaskCreate'
import { Loading, BreadcrumbHeader, NoItems } from '../../reusable/'
import { supabase } from '../../services/supabase'

import {
    CCol,
    CRow,
} from '@coreui/react'

export default function Dashboard() {

    const [loading, setLoading] = useState(true)
    const [links, setLinks] = useState([])
    const [tasks, setTasks] = useState([])

    const fetchLinks = useCallback(async () => {
        const { data: linksSearch, error } = await supabase
            .from("links")
            .select("*")
            .eq('is_favorite', 'true')
            .order("created_at", { ascending: false });
        if (error) {
            console.log("error", error);
        }
        else {
            setLinks(linksSearch)
        }
    }, [])

    const fetchTasks = useCallback(async () => {
        const { data: tasksSearch, error } = await supabase
            .from("tasks")
            .select("*")
            .order("created_at", { ascending: false });
        if (error) {
            console.log("error", error);
        }
        else {
            setTasks(tasksSearch)
        }
    }, [])

    useEffect(() => {
        fetchLinks()
        fetchTasks()
        setLoading(false)
    }, [fetchLinks, fetchTasks])

    if (loading) return (<Loading />)

    return (
        <CRow>
            <CCol xs="12" sm="8" md="8">
                <BreadcrumbHeader title='Links Favoritos' quantidade={links.length}
                    component={<LinkCreate add={link => link.is_favorite ? setLinks([...links, link]) : ''} />}
                />
                {links <= 0 ? <NoItems /> :
                    links.map(link => (<LinkComponent key={link.id} link={link} />))
                }
            </CCol>
            <CCol xs="12" sm="4" md="4">
                <BreadcrumbHeader title='Tarefas do dia' quantidade={tasks.length} component={<TaskCreate add={task => setTasks([...tasks, task])} />} />
                {tasks <= 0 ? <NoItems /> :
                    tasks.map(task => (<TaskComponent key={task.id} task={task} />))
                }
            </CCol>
        </CRow>
    )
}