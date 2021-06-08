export const addComment = (data) => {
    return {
        type: 'ADD_COMMENT',
        comment: data
    }
}

export const fillComments = (list) => {
    return {
        type: 'FILL_COMMENTS',
        comments: list
    }
}

export const editComment = (data) => {
    return {
        type: 'EDIT_COMMENT',
        comment: data
    }
}