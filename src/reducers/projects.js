const projectsReducer = (state = [], { type, ...rest }) => {
    switch (type) {
        case 'ADD_PROJECT':
            return [...state, rest.project];
        case 'FILL_PROJECTS':
            return rest.projects;
        default:
            return state
    }
}

export default projectsReducer;