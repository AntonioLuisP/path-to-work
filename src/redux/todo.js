export const TYPES = {
    ADD_TODOS: 'ADD_TODOS',
    FILL_TODOSS: 'FILL_TODOSS',
    EDIT_TODOS: 'EDIT_TODOS',
    SELECTED_TODO: 'SELECTED_TODO',
    REMOVE_SELECTED_TODO: "REMOVE_SELECTED_TODO",
}

const INITIAL_TODOS = []

export function todosReducer(state = INITIAL_TODOS, { type, ...rest }) {
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

const INITIAL_TODO = {}

export function todoReducer(state = INITIAL_TODO, { type, ...rest }) {
    switch (type) {
        case TYPES.SELECTED_TODO:
            return { ...state, ...rest.link };
        case TYPES.REMOVE_SELECTED_TODO:
            return {};
        default:
            return state
    }
}

export const Actions = {
    addOne: (data) => ({
        type: TYPES.ADD_TODOS,
        todo: data
    }),
    fillSome: (list) => ({
        type: TYPES.FILL_TODOSS,
        todos: list
    }),
    editOne: (data) => ({
        type: TYPES.EDIT_TODOS,
        todo: data
    }),
    selectOne: (data) => ({
        type: TYPES.SELECTED_TODO,
        link: data
    }),
    removeSelected: () => ({
        type: TYPES.REMOVE_SELECTED_TODO,
    })
}