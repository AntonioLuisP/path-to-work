import React, {
    createContext,
    useContext,
    useReducer,
} from 'react'

const ModalContext = createContext()

export function useModal() {
    return useContext(ModalContext)
}

const INITIAL = {
    'show': false,
    'component': (<></>)
}

const TYPES = {
    MODAL: 'MODAL',
}

export const Actions = {
    modalSwitch: (data) => ({
        type: TYPES.MODAL,
        component: data
    })
}

const modalReducer = (state = INITIAL, { type, ...rest }) => {
    switch (type) {
        case TYPES.MODAL:
            const show = !state.show
            const component = show ? rest.component : <></>
            return { 'show': show, 'component': component }
        default:
            return state
    }
}

export function ModalProvider({ children }) {

    const [modal, setModal] = useReducer(modalReducer, INITIAL)

    return (
        <ModalContext.Provider value={[modal, setModal]}>
            {children}
        </ModalContext.Provider >
    )
}

