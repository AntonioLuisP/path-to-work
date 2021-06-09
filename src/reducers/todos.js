const todosReducer = (state = [], { type, ...rest }) => {
    switch (type) {
        case 'ADD_TODO':
            return [...state, rest.todo];
        case 'FILL_TODOS':
            return rest.todos;
        case 'EDIT_TODO':
            const index = state.findIndex(todo => (todo.id) === rest.todo.id)
            state[index] = rest.todo
            return [...state];
        default:
            return state
    }
}

export default todosReducer;