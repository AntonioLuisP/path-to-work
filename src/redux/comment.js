export const TYPES = {
    ADD_COMMENT: 'ADD_COMMENT',
    FILL_COMMENTS: 'FILL_COMMENTS',
    EDIT_COMMENT: 'EDIT_COMMENT',
}

const INITIAL = []

export default function commentsReducer(state = INITIAL, { type, ...rest }) {
    switch (type) {
        case TYPES.ADD_COMMENT:
            return [...state, rest.comment];
        case TYPES.FILL_COMMENTS:
            return rest.comments;
        case TYPES.EDIT_COMMENT:
            const index = state.findIndex(comment => (comment.id) === rest.comment.id)
            state[index] = rest.comment
            return [...state];
        default:
            return state
    }
}

export const Actions = {
    addOne: (data) => ({
        type: TYPES.ADD_COMMENT,
        comment: data
    }),
    fillSome: (list) => ({
        type: TYPES.FILL_COMMENTS,
        comments: list
    }),
    editOne: (data) => ({
        type: TYPES.EDIT_COMMENT,
        comment: data
    })
}