export const TYPES = {
    ADD_TASK: 'ADD_TASK',
    FILL_TASKS: 'FILL_TASKS',
    EDIT_TASK: 'EDIT_TASK',
    SELECTED_TASK: 'SELECTED_TASK',
    REMOVE_SELECTED_TASK: "REMOVE_SELECTED_TASK",
}

const INITIAL_TASKS = []

export function tasksReducer(state = INITIAL_TASKS, { type, ...rest }) {
    switch (type) {
        case TYPES.ADD_TASK:
            return [...state, rest.payload];
        case TYPES.FILL_TASKS:
            return rest.payload;
        case TYPES.EDIT_TASK:
            const index = state.findIndex(task => (task.id) === rest.payload.id)
            state[index] = rest.payload
            return [...state];
        default:
            return state
    }
}

const INITIAL_TASK = {}

export function taskReducer(state = INITIAL_TASK, { type, ...rest }) {
    switch (type) {
        case TYPES.SELECTED_TASK:
            return { ...state, ...rest.payload };
        case TYPES.REMOVE_SELECTED_TASK:
            return {};
        default:
            return state
    }
}

export const Actions = {
    addOne: (data) => ({
        type: TYPES.ADD_TASK,
        payload: data
    }),
    fillSome: (list) => ({
        type: TYPES.FILL_TASKS,
        payload: list
    }),
    editOne: (data) => ({
        type: TYPES.EDIT_TASK,
        payload: data
    }),
    selectOne: (data) => ({
        type: TYPES.SELECTED_TASK,
        payload: data
    }),
    removeSelected: () => ({
        type: TYPES.REMOVE_SELECTED_TASK,
    })
}