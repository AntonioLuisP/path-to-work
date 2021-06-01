const counterReducer = (state = 0, { type, ...rest }) => {
    switch (type) {
        case 'INCREMENT':
            return state + rest.payload;
        case 'DECREMENT':
            return state - rest.payload;
        default:
            return state
    }
}

export default counterReducer;