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
            return [...state, rest.payload];
        case TYPES.FILL_PROJECTS:
            return rest.payload;
        case TYPES.EDIT_PROJECT:
            const index = state.findIndex(project => (project.id) === rest.payload.id)
            state[index] = rest.payload
            return [...state];
        default:
            return state
    }
}

const INITIAL_PROJECT = {}

export function projectReducer(state = INITIAL_PROJECT, { type, ...rest }) {
    switch (type) {
        case TYPES.SELECTED_PROJECT:
            return { ...state, ...rest.payload };
        case TYPES.REMOVE_SELECTED_PROJECT:
            return {};
        default:
            return state
    }
}

export const Actions = {
    addOne: (data) => ({
        type: TYPES.ADD_PROJECT,
        payload: data
    }),
    fillSome: (data) => ({
        type: TYPES.FILL_PROJECTS,
        payload: data
    }),
    editOne: (data) => ({
        type: TYPES.EDIT_PROJECT,
        payload: data
    }),
    selectOne: (data) => ({
        type: TYPES.SELECTED_PROJECT,
        payload: data
    }),
    removeSelected: () => ({
        type: TYPES.REMOVE_SELECTED_PROJECT,
    })
}