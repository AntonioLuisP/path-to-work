import React, {
    createContext,
    useContext,
    useReducer,
} from 'react'

const ModalContext = createContext()

export function useModal() {
    return useContext(ModalContext)
}

const INITIAL = []

const TYPES = {
    SIDEBAR: 'SIDEBAR',

}

export const Actions = {
    showSwitch: (data) => ({
        type: TYPES.SIDEBAR,
        show: data
    }),
}

const sidebarReducer = (state = INITIAL, { type, ...rest }) => {
    switch (type) {
        case TYPES.SIDEBAR:
            return rest.show
        default:
            return state
    }
}

export default function SidebarProvider({ children }) {

    const [sidebar, setSidebar] = useReducer(sidebarReducer, INITIAL)

    return (
        <ModalContext.Provider value={[sidebar, setSidebar]}>
            {children}
        </ModalContext.Provider >
    )
}

