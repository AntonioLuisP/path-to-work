import React, {
    createContext,
    useState,
    useContext,
    useReducer,
    useEffect
} from 'react'

import api from '../services/api'
import { Loading } from '../reusable'

const TasksContext = createContext()

export function useTasks() {
    return useContext(TasksContext)
}

const INITIAL = []

const TYPES = {
    ADD_TASK: 'ADD_TASK',
    FILL_TASKS: 'FILL_TASKS',
    EDIT_TASK: 'EDIT_TASK',
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

const tasksReducer = (state = INITIAL, { type, ...rest }) => {
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

export default function TasksProvider({ children }) {

    const [loading, setLoading] = useState(true)
    const [tasks, setTasks] = useReducer(tasksReducer, INITIAL)

    useEffect(() => {
        api.get('task')
            .then(response => {
                if (response.status === 200) {
                    setTasks(Actions.fillSome(response.data.data))
                }
                setLoading(false)
            })
    }, [])

    if (loading) return (<Loading />)

    return (
        <TasksContext.Provider value={[tasks, setTasks]}>
            {children}
        </TasksContext.Provider >
    )
}

