const sidebarReducer = (state = 'responsive', { type, ...rest }) => {
    switch (type) {
        case 'set':
            return rest.sidebarShow
        default:
            return state
    }
}

export default sidebarReducer;