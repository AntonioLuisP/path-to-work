const  notificationsReducer = (state = [], { type, ...rest }) => {
    switch (type) {
        case 'ADD_NOTIFICATION':
            return [...state, rest.notification];
        default:
            return state
    }
}

export default  notificationsReducer;