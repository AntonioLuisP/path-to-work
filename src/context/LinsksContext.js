import React, {
    createContext,
    useState,
    useContext,
    useReducer,
    useEffect
} from 'react'

import api from '../services/api'
import { Loading } from '../reusable'

const LinsksContext = createContext()

export function useLinks() {
    return useContext(LinsksContext)
}

const INITIAL = []

const TYPES = {
    ADD_LINK: 'ADD_LINK',
    FILL_LINKS: 'FILL_LINKS',
    EDIT_LINK: 'EDIT_LINK',
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
    })
}

const linksReducer = (state = INITIAL, { type, ...rest }) => {
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

export default function LinksProvider({ children }) {

    const [loading, setLoading] = useState(true)
    const [links, setLinks] = useReducer(linksReducer, INITIAL)

    useEffect(() => {
        api.get('link')
            .then(response => {
                if (response.status === 200) {
                    setLinks(Actions.fillSome(response.data.data))
                }
                setLoading(false)
            })
    }, [])

    if (loading) return (<Loading />)

    return (
        <LinsksContext.Provider value={[links, setLinks]}>
            {children}
        </LinsksContext.Provider >
    )
}

