export const TYPES = {
    ADD_TASK: 'ADD_TASK',
    FILL_TASKS: 'FILL_TASKS',
    EDIT_TASK: 'EDIT_TASK',
}

const INITIAL = []

export default function tasksReducer(state = INITIAL, { type, ...rest }) {
    switch (type) {
        case TYPES.ADD_TASK:
            return [...state, rest.task];
        case TYPES.FILL_TASKS:
            return rest.tasks;
        case TYPES.EDIT_TASK:
            const index = state.findIndex(task => (task.id) === rest.task.id)
            state[index] = rest.task
            return [...state];
        default:
            return state
    }
}

export const Actions = {
    addOne: (data) => ({
        type: TYPES.ADD_TASK,
        task: data
    }),
    fillSome: (list) => ({
        type: TYPES.FILL_TASKS,
        tasks: list
    }),
    editOne: (data) => ({
        type: TYPES.EDIT_TASK,
        task: data
    })
}