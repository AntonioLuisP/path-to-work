export const addProject = (data) => {
    return {
        type: 'ADD_PROJECT',
        project: data
    }
}

export const fillProjects = (list) => {
    return {
        type: 'FILL_PROJECTS',
        projects: list
    }
}

export const editProject = (data) => {
    return {
        type: 'EDIT_PROJECT',
        project: data
    }
}