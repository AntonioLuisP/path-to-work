export const TYPES = {
    SIDEBAR: 'SIDEBAR',
}

const INITIAL = 'responsive'

export default function sidebarReducer(state = INITIAL, { type, ...rest }) {
    switch (type) {
        case TYPES.SIDEBAR:
            return rest.show
        default:
            return state
    }
}

export const Actions = {
    showSwitch: (data) => ({
        type: TYPES.SIDEBAR,
        show: data
    }),
}