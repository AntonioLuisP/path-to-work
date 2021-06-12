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
            const show = !state.show
            const component = show ? rest.component : <></>
            return { 'show': show, 'component': component }
        default:
            return state
    }
}

export const Actions = {
    modalAction: (data) => ({
        type: TYPES.MODAL,
        component: data
    })
}