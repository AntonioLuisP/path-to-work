const taskReducer = (state = [], { type, ...rest }) => {
    switch (type) {
        case 'ADD_TASK':
            return [...state, rest.task];
        case 'FILL_TASKS':
            return rest.tasks;
        case 'EDIT_TASK':
            const index = state.findIndex(task => (task.id) === rest.task.id)
            state[index] = rest.task
            return [...state];
        default:
            return state
    }
}

export default taskReducer;