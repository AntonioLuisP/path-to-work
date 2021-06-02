export const addLink = (data) => {
    return {
        type: 'ADD_LINK',
        link: data
    }
}

export const fillLinks = (list) => {
    return {
        type: 'FILL_LINKS',
        links: list
    }
}