import React, {
    createContext,
    useState,
    useContext,
    useReducer,
    useEffect
} from 'react'

import api from '../services/api'
import { Loading } from '../reusable'

const ProjectsContext = createContext()

export function useProjects() {
    return useContext(ProjectsContext)
}

const INITIAL = []

const TYPES = {
    ADD_PROJECT: 'ADD_PROJECT',
    FILL_PROJECTS: 'FILL_PROJECTS',
    EDIT_PROJECT: 'EDIT_PROJECT',
}

export const Actions = {
    addOne: (data) => ({
        type: TYPES.ADD_PROJECT,
        project: data
    }),
    fillSome: (list) => ({
        type: TYPES.FILL_PROJECTS,
        projects: list
    }),
    editOne: (data) => ({
        type: TYPES.EDIT_PROJECT,
        project: data
    })
}

const projectsReducer = (state = INITIAL, { type, ...rest }) => {
    switch (type) {
        case TYPES.ADD_PROJECT:
            return [...state, rest.project];
        case TYPES.FILL_PROJECTS:
            return rest.projects;
        case TYPES.EDIT_PROJECT:
            const index = state.findIndex(project => (project.id) === rest.project.id)
            state[index] = rest.project
            return [...state];
        default:
            return state
    }
}

export default function ProjectsProvider({ children }) {

    const [loading, setLoading] = useState(true)
    const [projects, setProjects] = useReducer(projectsReducer, INITIAL)

    useEffect(() => {
        api.get('project')
            .then(response => {
                if (response.status === 200) {
                    setProjects(Actions.fillSome(response.data.data))
                }
                setLoading(false)
            })
    }, [])

    if (loading) return (<Loading />)

    return (
        <ProjectsContext.Provider value={[projects, setProjects]}>
            {children}
        </ProjectsContext.Provider >
    )
}

