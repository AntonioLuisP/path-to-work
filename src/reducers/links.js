const linksReducer = (state = [], { type, ...rest }) => {
    switch (type) {
        case 'ADD_LINK':
            return [...state, rest.link];
        case 'FILL_LINKS':
            return rest.links;
        default:
            return state
    }
}

export default linksReducer;