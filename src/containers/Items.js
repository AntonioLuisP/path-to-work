import React, { useEffect, useState } from 'react'
import api from "../services/api"

import {
    CSidebarNavItem,
} from '@coreui/react'
import {
    cilEducation,
} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

const Items = () => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('project')
            .then(response => {
                if (response.status === 200) {
                    setProjects(response.data.data)
                }
            })
    }, [])

    return (
        <>
            {
                projects.map(project => (
                    <CSidebarNavItem
                        key={project.id}
                        name={project.name}
                        to={'/projects/' + project.id}
                        icon={<CIcon content={cilEducation} customClasses="c-sidebar-nav-icon" />}
                    />
                ))
            }
        </>
    )
}

export default React.memo(Items)
