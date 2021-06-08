import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProjectBoard } from "../../components/ProjectPage"
import { LinkBoard } from "../../components/LinkPage"
import api from "../../services/api"
import { Loading } from '../../reusable/'
import { fillLinks } from '../../actions/links'

import {
    CCol,
    CRow,
} from '@coreui/react'

export default function Dashboard() {

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)

    const projects = useSelector(state => state.projects)
    const links = useSelector(state => state.links)

    useEffect(() => {
        api.get('link')
            .then(response => {
                if (response.status === 200) {
                    dispatch(fillLinks(response.data.data))
                }
                setLoading(false)
            })
    }, [dispatch])

    if (loading) return (<Loading />)

    return (
        <CRow>
            <CCol xs="8" sm="8" md="8">
                <ProjectBoard projects={projects} />
            </CCol>
            <CCol xs="4" sm="4" md="4">
                <LinkBoard links={links} />
            </CCol>
        </CRow>
    )
}