export const addTask = (data) => {
    return {
        type: 'ADD_TASK',
        task: data
    }
}

export const fillTasks = (list) => {
    return {
        type: 'FILL_TASKS',
        TASKs: list
    }
}

export const editTask = (data) => {
    return {
        type: 'EDIT_TASK',
        task: data
    }
}