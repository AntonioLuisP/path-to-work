export const add = (data) => {
    return {
        type: 'ADD',
        project: data
    }
}

export const fill = (list) => {
    return {
        type: 'FILL',
        projects: list
    }
}