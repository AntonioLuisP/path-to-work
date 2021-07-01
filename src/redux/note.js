export const TYPES = {
    ADD_NOTE: 'ADD_NOTE',
    FILL_NOTES: 'FILL_NOTES',
    EDIT_NOTE: 'EDIT_NOTE',
    SELECTED_NOTE: 'SELECTED_NOTE',
    REMOVE_SELECTED_NOTE: "REMOVE_SELECTED_NOTE",
}

const INITIAL_NOTES = []

export function notesReducer(state = INITIAL_NOTES, { type, ...rest }) {
    switch (type) {
        case TYPES.ADD_NOTE:
            return [...state, rest.payload];
        case TYPES.FILL_NOTES:
            return rest.payload;
        case TYPES.EDIT_NOTE:
            const index = state.findIndex(note => (note.id) === rest.payload.id)
            state[index] = rest.payload
            return [...state];
        default:
            return state
    }
}

const INITIAL_NOTE = {}

export function noteReducer(state = INITIAL_NOTE, { type, ...rest }) {
    switch (type) {
        case TYPES.SELECTED_NOTE:
            return { ...state, ...rest.payload };
        case TYPES.REMOVE_SELECTED_NOTE:
            return {};
        default:
            return state
    }
}

export const Actions = {
    addOne: (data) => ({
        type: TYPES.ADD_NOTE,
        payload: data
    }),
    fillSome: (data) => ({
        type: TYPES.FILL_NOTES,
        payload: data
    }),
    editOne: (data) => ({
        type: TYPES.EDIT_NOTE,
        payload: data
    }),
    selectOne: (data) => ({
        type: TYPES.SELECTED_NOTE,
        payload: data
    }),
    removeSelected: () => ({
        type: TYPES.REMOVE_SELECTED_NOTE,
    })
}