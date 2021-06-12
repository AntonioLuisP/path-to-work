export const TYPES = {
    ADD_PROJECT: 'ADD_PROJECT',
    FILL_PROJECTS: 'FILL_PROJECTS',
    EDIT_PROJECT: 'EDIT_PROJECT',
}

const INITIAL = []

export default function projectsReducer(state = INITIAL, { type, ...rest }) {
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

export const Actions = {
    addProject: (data) => ({
        type: TYPES.ADD_PROJECT,
        project: data
    }),
    fillProjects: (list) => ({
        type: TYPES.FILL_PROJECTS,
        projects: list
    }),
    editProject: (data) => ({
        type: TYPES.EDIT_PROJECT,
        project: data
    })
}