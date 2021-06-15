import React, {
    createContext,
    useContext,
    useReducer,
} from 'react'

const NotificationsContext = createContext()

export function useNotifications() {
    return useContext(NotificationsContext)
}

const INITIAL = []

const TYPES = {
    ADD_NOTIFICATION: 'ADD_NOTIFICATION',
}

export const Actions = {
    addOne: (data) => ({
        type: TYPES.ADD_NOTIFICATION,
        notification: data
    }),
}

const notificationsReducer = (state = INITIAL, { type, ...rest }) => {
    switch (type) {
        case 'ADD_NOTIFICATION':
            return [...state, rest.notification];
        default:
            return state
    }
}

export default function NotificationsProvider({ children }) {

    const [notifications, setNotifications] = useReducer(notificationsReducer, INITIAL)

    return (
        <NotificationsContext.Provider value={[notifications, setNotifications]}>
            {children}
        </NotificationsContext.Provider >
    )
}

