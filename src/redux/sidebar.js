export const TYPES = {
    ADD_PROJECT: 'ADD_PROJECT',
    FILL_PROJECTS: 'FILL_PROJECTS',
    EDIT_PROJECT: 'EDIT_PROJECT',
}

const INITIAL = 'responsive'

export default function sidebarReducer(state = INITIAL, { type, ...rest }) {
    switch (type) {
        case 'set':
            return rest.sidebarShow
        default:
            return state
    }
}

export const Actions = {

}