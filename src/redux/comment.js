export const TYPES = {
    ADD_COMMENT: 'ADD_COMMENT',
    FILL_COMMENTS: 'FILL_COMMENTS',
    EDIT_COMMENT: 'EDIT_COMMENT',
    SELECTED_COMMENT: 'SELECTED_COMMENT',
    REMOVE_SELECTED_COMMENT: "REMOVE_SELECTED_COMMENT",
}

const INITIAL_COMMENTS = []

export function commentsReducer(state = INITIAL_COMMENTS, { type, ...rest }) {
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

const INITIAL_COMMENT = {}

export function commentReducer(state = INITIAL_COMMENT, { type, ...rest }) {
    switch (type) {
        case TYPES.SELECTED_COMMENT:
            return { ...state, ...rest.link };
        case TYPES.REMOVE_SELECTED_COMMENT:
            return {};
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
    }),
    selectOne: (data) => ({
        type: TYPES.SELECTED_COMMENT,
        link: data
    }),
    removeSelected: () => ({
        type: TYPES.REMOVE_SELECTED_COMMENT,
    })
}