import React, {
    createContext,
    useState,
    useContext,
    useReducer,
    useEffect
} from 'react'

import api from '../services/api'
import { Loading } from '../reusable'

const CommentsContext = createContext()

export function useComments() {
    return useContext(CommentsContext)
}

const INITIAL = []

const TYPES = {
    ADD_COMMENT: 'ADD_COMMENT',
    FILL_COMMENTS: 'FILL_COMMENTS',
    EDIT_COMMENT: 'EDIT_COMMENT',
}

export const Actions = {
    addOne: (data) => ({
        type: TYPES.ADD_COMMENT,
        comment: data
    }),
    fillSome: (list) => ({
        type: TYPES.FILL_COMMENTS,
        comments: list
    }),
    editOne: (data) => ({
        type: TYPES.EDIT_COMMENT,
        comment: data
    })
}

const commentsReducer = (state = INITIAL, { type, ...rest }) => {
    switch (type) {
        case TYPES.ADD_COMMENT:
            return [...state, rest.comment];
        case TYPES.FILL_COMMENTS:
            return rest.comments;
        case TYPES.EDIT_COMMENT:
            const index = state.findIndex(comment => (comment.id) === rest.comment.id)
            state[index] = rest.comment
            return [...state];
        default:
            return state
    }
}

export function CommentsProvider({ children }) {

    const [loading, setLoading] = useState(true)
    const [comments, setComments] = useReducer(commentsReducer, INITIAL)

    useEffect(() => {
        api.get('comment')
            .then(response => {
                if (response.status === 200) {
                    setComments(Actions.fillSome(response.data.data))
                }
                setLoading(false)
            })
    }, [])

    if (loading) return (<Loading />)

    return (
        <CommentsContext.Provider value={[comments, setComments]}>
            {children}
        </CommentsContext.Provider >
    )
}

