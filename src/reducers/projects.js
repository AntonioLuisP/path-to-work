const projectsReducer = (state = [], { type, ...rest }) => {
    switch (type) {
        case 'ADD':
            return [...state, rest.project];
        case 'FILL':
            return rest.projects;
        default:
            return state
    }
}

export default projectsReducer;