export const TYPES = {
    MODAL: 'MODAL',
}

const INITIAL = {
    'show': false,
    'component': (<></>)
}

export default function modalReducer(state = INITIAL, { type, ...rest }) {
    switch (type) {
        case TYPES.MODAL:
            return { 'show': rest.show, 'component': rest.component }
        default:
            return state
    }
}

export const Actions = {
    modalSwitch: (show, data) => ({
        type: TYPES.MODAL,
        show: show,
        component: data
    })
}