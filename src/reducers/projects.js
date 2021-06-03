const projectsReducer = (state = [], { type, ...rest }) => {
    switch (type) {
        case 'ADD_PROJECT':
            return [...state, rest.project];
        case 'FILL_PROJECTS':
            return rest.projects;
        case 'EDIT_PROJECT':
            const index = state.findIndex(project => (project.id) === rest.project.id)
            state[index] = rest.project
            return [...state];
        default:
            return state
    }
}

export default projectsReducer;