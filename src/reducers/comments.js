const commentsReducer = (state = [], { type, ...rest }) => {
    switch (type) {
        case 'ADD_COMMENT':
            return [...state, rest.comment];
        case 'FILL_COMMENTS':
            return rest.comments;
        case 'EDIT_COMMENT':
            const index = state.findIndex(comment => (comment.id) === rest.comment.id)
            state[index] = rest.comment
            return [...state];
        default:
            return state
    }
}

export default commentsReducer;