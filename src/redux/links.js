export const TYPES = {
    ADD_LINK: 'ADD_LINK',
    FILL_LINKS: 'FILL_LINKS',
    EDIT_LINK: 'EDIT_LINK',
}

const INITIAL = []

export default function linksReducer(state = INITIAL, { type, ...rest }) {
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

export const Actions = {
    addLink: (data) => ({
        type: TYPES.ADD_LINK,
        link: data
    }),
    fillLinks: (list) => ({
        type: TYPES.FILL_LINKS,
        links: list
    }),
    editLink: (data) => ({
        type: TYPES.EDIT_LINK,
        link: data
    })
}