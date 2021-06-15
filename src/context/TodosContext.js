import React, {
    createContext,
    useState,
    useContext,
    useReducer,
    useEffect
} from 'react'

import api from '../services/api'
import { Loading } from '../reusable'

const TodosContext = createContext()

export function useTasks() {
    return useContext(TodosContext)
}

const INITIAL = []

const TYPES = {
    ADD_TODOS: 'ADD_TODOS',
    FILL_TODOSS: 'FILL_TODOSS',
    EDIT_TODOS: 'EDIT_TODOS',
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
    })
}

const todosReducer = (state = INITIAL, { type, ...rest }) => {
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

export default function TodosProvider({ children }) {

    const [loading, setLoading] = useState(true)
    const [todos, setTodos] = useReducer(todosReducer, INITIAL)

    useEffect(() => {
        api.get('todo')
            .then(response => {
                if (response.status === 200) {
                    setTodos(Actions.fillSome(response.data.data))
                }
                setLoading(false)
            })
    }, [])

    if (loading) return (<Loading />)

    return (
        <TodosContext.Provider value={[todos, setTodos]}>
            {children}
        </TodosContext.Provider >
    )
}

