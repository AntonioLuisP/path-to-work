const initialState = {
    sidebarShow: 'responsive'
}

const sidebarReducer = (state = { sidebarShow: 'responsive' }, { type, ...rest }) => {
    switch (type) {
        case 'set':
            return { ...state, ...rest }
        default:
            return state
    }
}

export default sidebarReducer;