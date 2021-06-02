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