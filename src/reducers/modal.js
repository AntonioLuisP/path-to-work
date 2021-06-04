const initialModal = {
    'show': false,
    'component': (<></>)
}

const modalReducer = (state = initialModal, { type, ...rest }) => {
    switch (type) {
        case 'MODAL':
            const component = rest.show ? rest.component : <></> 
            return {'show': rest.show, 'component': component }
        default:
            return state
    }
}

export default modalReducer;