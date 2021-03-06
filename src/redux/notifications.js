export const TYPES = {
    ADD_NOTIFICATION: 'ADD_NOTIFICATION',
}

const INITIAL = []

export default function notificationsReducer(state = INITIAL, { type, ...rest }) {
    switch (type) {
        case TYPES.ADD_NOTIFICATION:
            return [...state, rest.notification];
        default:
            return state
    }
}

export const Actions = {
    addOne: (data) => ({
        type: TYPES.ADD_NOTIFICATION,
        notification: data
    }),
}