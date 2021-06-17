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
            return [...state, rest.payload];
        case TYPES.FILL_COMMENTS:
            return rest.payload;
        case TYPES.EDIT_COMMENT:
            const index = state.findIndex(comment => (comment.id) === rest.payload.id)
            state[index] = rest.payload
            return [...state];
        default:
            return state
    }
}

const INITIAL_COMMENT = {}

export function commentReducer(state = INITIAL_COMMENT, { type, ...rest }) {
    switch (type) {
        case TYPES.SELECTED_COMMENT:
            return { ...state, ...rest.payload };
        case TYPES.REMOVE_SELECTED_COMMENT:
            return {};
        default:
            return state
    }
}

export const Actions = {
    addOne: (data) => ({
        type: TYPES.ADD_COMMENT,
        payload: data
    }),
    fillSome: (data) => ({
        type: TYPES.FILL_COMMENTS,
        payload: data
    }),
    editOne: (data) => ({
        type: TYPES.EDIT_COMMENT,
        payload: data
    }),
    selectOne: (data) => ({
        type: TYPES.SELECTED_COMMENT,
        payload: data
    }),
    removeSelected: () => ({
        type: TYPES.REMOVE_SELECTED_COMMENT,
    })
}