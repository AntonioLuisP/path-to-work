export const TYPES = {
    ADD_TODOS: 'ADD_TODOS',
    FILL_TODOSS: 'FILL_TODOSS',
    EDIT_TODOS: 'EDIT_TODOS',
}

const INITIAL = []

export default function todosReducer(state = INITIAL, { type, ...rest }) {
    switch (type) {
        case TYPES.ADD_TODOS:
            return [...state, rest.todo];
        case TYPES.FILL_TODOSS:
            return rest.todos;
        case TYPES.EDIT_TODOS:
            const index = state.findIndex(todo => (todo.id) === rest.todo.id)
            state[index] = rest.todo
            return [...state];
        default:
            return state
    }
}

export const actions = {
    addTodo: (data) => ({
        type: TYPES.ADD_TODOS,
        todo: data
    }),
    fillTodos: (list) => ({
        type: TYPES.FILL_TODOSS,
        todos: list
    }),
    editTodo: (data) => ({
        type: TYPES.EDIT_TODOS,
        todo: data
    })
}