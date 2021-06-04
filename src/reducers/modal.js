const initialModal = {
    'show': false,
    'component': (<></>)
}

const modalReducer = (state = initialModal, { type, ...rest }) => {
    switch (type) {
        case 'MODAL':
            const show = !state.show
            const component = show ? rest.component : <></> 
            return {'show': show, 'component': component }
        default:
            return state
    }
}

export default modalReducer;