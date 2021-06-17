export const TYPES = {
    ADD_LINK: 'ADD_LINK',
    FILL_LINKS: 'FILL_LINKS',
    EDIT_LINK: 'EDIT_LINK',
    SELECTED_LINK: 'SELECTED_LINK',
    REMOVE_SELECTED: "REMOVE_SELECTED",
}

const INITIAL_LINKS = []

export function linksReducer(state = INITIAL_LINKS, { type, ...rest }) {
    switch (type) {
        case TYPES.ADD_LINK:
            return [...state, rest.link];
        case TYPES.FILL_LINKS:
            return rest.links;
        case TYPES.EDIT_LINK:
            const index = state.findIndex(link => (link.id) === rest.link.id)
            state[index] = rest.link
            return [...state];
        default:
            return state
    }
}

const INITIAL_LINK = {}

export function linkReducer(state = INITIAL_LINK, { type, ...rest }) {
    switch (type) {
        case TYPES.SELECTED_LINK:
            return { ...state, ...rest.project };
        case TYPES.REMOVE_SELECTED:
            return {};
        default:
            return state
    }
}

export const Actions = {
    addOne: (data) => ({
        type: TYPES.ADD_LINK,
        link: data
    }),
    fillSome: (list) => ({
        type: TYPES.FILL_LINKS,
        links: list
    }),
    editOne: (data) => ({
        type: TYPES.EDIT_LINK,
        link: data
    }),
    selectOne: (data) => ({
        type: TYPES.SELECTED_LINK,
        link: data
    }),
    removeSelected: () => ({
        type: TYPES.REMOVE_SELECTED,
    })
}