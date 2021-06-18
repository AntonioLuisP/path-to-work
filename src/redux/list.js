export const TYPES = {
    ADD_LIST: 'ADD_LIST',
    FILL_LISTS: 'FILL_LISTS',
    EDIT_LIST: 'EDIT_LIST',
    SELECTED_LIST: 'SELECTED_LIST',
    REMOVE_SELECTED_LIST: "REMOVE_SELECTED_LIST",
}

const INITIAL_LISTS = []

export function listsReducer(state = INITIAL_LISTS, { type, ...rest }) {
    switch (type) {
        case TYPES.ADD_LIST:
            return [...state, rest.payload];
        case TYPES.FILL_LISTS:
            return rest.payload;
        case TYPES.EDIT_LIST:
            const index = state.findIndex(list => (list.id) === rest.payload.id)
            state[index] = rest.payload
            return [...state];
        default:
            return state
    }
}

const INITIAL_LIST = {}

export function listReducer(state = INITIAL_LIST, { type, ...rest }) {
    switch (type) {
        case TYPES.SELECTED_LIST:
            return { ...state, ...rest.payload };
        case TYPES.REMOVE_SELECTED_LIST:
            return {};
        default:
            return state
    }
}

export const Actions = {
    addOne: (data) => ({
        type: TYPES.ADD_LIST,
        payload: data
    }),
    fillSome: (data) => ({
        type: TYPES.FILL_LISTS,
        payload: data
    }),
    editOne: (data) => ({
        type: TYPES.EDIT_LIST,
        payload: data
    }),
    selectOne: (data) => ({
        type: TYPES.SELECTED_LIST,
        payload: data
    }),
    removeSelected: () => ({
        type: TYPES.REMOVE_SELECTED_LIST,
    })
}