const projectsReducer = (state = [], { type, ...rest }) => {
    switch (type) {
        case 'ADD_PROJECT':
            return [...state, rest.project];
        case 'FILL_PROJECTS':
            return rest.projects;
        case 'EDIT_PROJECT':
            state[rest.incice] = rest.project
            return state;
        default:
            return state
    }
}

export default projectsReducer;