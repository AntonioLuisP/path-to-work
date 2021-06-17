export const TYPES = {
    ADD_PROJECT: 'ADD_PROJECT',
    FILL_PROJECTS: 'FILL_PROJECTS',
    EDIT_PROJECT: 'EDIT_PROJECT',
    SELECTED_PROJECT: 'SELECTED_PROJECT',
    REMOVE_SELECTED_PROJECT: "REMOVE_SELECTED_PROJECT",
}

const INITIAL_PROJECTS = []

export function projectsReducer(state = INITIAL_PROJECTS, { type, ...rest }) {
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

const INITIAL_PROJECT = {}

export function projectReducer(state = INITIAL_PROJECT, { type, ...rest }) {
    switch (type) {
        case TYPES.SELECTED_PROJECT:
            return { ...state, ...rest.project };
        case TYPES.REMOVE_SELECTED:
            return {};
        default:
            return state
    }
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
    }),
    selectOne: (data) => ({
        type: TYPES.SELECTED_LINK,
        link: data
    }),
    removeSelected: () => ({
        type: TYPES.REMOVE_SELECTED_LINK,
    })
}