const projectsReducer = (state = [], { type, ...rest }) => {
    switch (type) {
        case 'ADD':
            return [...state, rest.project];
        default:
            return state
    }
}

export default projectsReducer;