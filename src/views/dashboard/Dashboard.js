import React, { useEffect, useState, useCallback } from 'react'
import { Loading, BreadcrumbHeader, Avisos } from '../../reusable/'
import { supabase } from '../../services/supabase'

import {
    CCardFooter,
    CCol,
    CLink,
    CRow,
    CWidgetIcon,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

export default function Dashboard() {

    const [loading, setLoading] = useState(true)
    const [links, setLinks] = useState([])
    const [tasks, setTasks] = useState([])
    const [lists, setLists] = useState([])

    const fetchLinks = useCallback(async () => {
        const { data: linksSearch, error } = await supabase
            .from("links")
            .select("*")
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
        if (error) {
            console.log("error", error);
        }
        else {
            setTasks(tasksSearch)
        }
    }, [])

    const fetchLists = useCallback(async () => {
        const { data: listsSearch, error } = await supabase
            .from("lists")
            .select("*")
        if (error) {
            console.log("error", error);
        }
        else {
            setLists(listsSearch)
        }
    }, [])

    useEffect(() => {
        fetchLinks()
        fetchTasks()
        fetchLists()
        setLoading(false)
    }, [fetchLinks, fetchTasks, fetchLists])

    if (loading) return (<Loading />)

    return (
        <>
            <CRow>
                <CCol xs="12" sm="12" md="12">
                    <BreadcrumbHeader title='Informações' />
                </CCol>
                <CCol xs="12" sm="4" md="4">
                    <CWidgetIcon
                        text="Links"
                        header={'' + links.length}
                        color="info"
                        iconPadding={false}
                        footerSlot={
                            <CCardFooter className="card-footer px-3 py-2">
                                <CLink
                                    className="font-weight-bold font-xs btn-block text-muted"
                                    rel="noopener norefferer"
                                    to='/links'
                                >
                                    Ver
                                    <CIcon name="cil-arrow-right" className="float-right" width="16" />
                                </CLink>
                            </CCardFooter>
                        }
                    >
                        <CIcon width={24} name="cil-cursor" className="mx-5" />
                    </CWidgetIcon>
                </CCol>
                <CCol xs="12" sm="4" md="4">
                    <CWidgetIcon
                        text="Tarefas"
                        header={'' + tasks.length}
                        color="info"
                        iconPadding={false}
                        footerSlot={
                            <CCardFooter className="card-footer px-3 py-2">
                                <CLink
                                    className="font-weight-bold font-xs btn-block text-muted"
                                    rel="noopener norefferer"
                                    to='/tasks'
                                >
                                    Ver
                                    <CIcon name="cil-arrow-right" className="float-right" width="16" />
                                </CLink>
                            </CCardFooter>
                        }
                    >
                        <CIcon width={24} name="cil-task" className="mx-5" />
                    </CWidgetIcon>
                </CCol>
                <CCol xs="12" sm="4" md="4">
                    <CWidgetIcon
                        text="Listas"
                        header={'' + lists.length}
                        color="info"
                        iconPadding={false}
                        footerSlot={
                            <CCardFooter className="card-footer px-3 py-2">
                                <CLink
                                    className="font-weight-bold font-xs btn-block text-muted"
                                    rel="noopener norefferer"
                                    to='/lists'
                                >
                                    Ver
                                    <CIcon name="cil-arrow-right" className="float-right" width="16" />
                                </CLink>
                            </CCardFooter>
                        }
                    >
                        <CIcon width={24} name="cil-list" className="mx-5" />
                    </CWidgetIcon>
                </CCol>
            </CRow>
            <CRow>
                <CCol xs="12" sm="12" md="12">
                    <BreadcrumbHeader title='Avisos' />
                    <Avisos text='aposta 2 no cavalo' tipo='info' />
                    <Avisos text='aposta 2 no cavalo' tipo='danger' />
                    <Avisos text='aposta 2 no cavalo' tipo='warning' />
                    <Avisos text='aposta 2 no cavalo' tipo='success' />
                </CCol>
            </CRow>
        </>
    )
}