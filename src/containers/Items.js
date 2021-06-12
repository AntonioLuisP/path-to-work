import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Actions as ActionProject } from '../redux/projects'
import api from "../services/api"

import {
    CSidebarNavItem,
} from '@coreui/react'

import {
    cilBriefcase,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

const Items = () => {

    const dispatch = useDispatch()

    const projects = useSelector(state => state.projects)

    useEffect(() => {
        api.get('project')
            .then(response => {
                if (response.status === 200) {
                    dispatch(ActionProject.fillSome(response.data.data))
                }
            })
    }, [dispatch])

    return (
        <>
            {
                projects.map(project => (
                    <CSidebarNavItem
                        key={project.id}
                        name={project.name.length > 25 ? project.name.substring(0, 24) + ' ...' : project.name}
                        to={'/projects/' + project.id}
                        icon={<CIcon content={cilBriefcase} customClasses="c-sidebar-nav-icon" />}
                    />
                ))
            }
        </>
    )
}

export default React.memo(Items)
