const modalReducer = (state = false, { type, ...rest }) => {
    switch (type) {
        case 'MODAL':
            return rest.modal
        default:
            return state
    }
}

export default modalReducer;