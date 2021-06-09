export const addTodo = (data) => {
    return {
        type: 'ADD_TODO',
        todo: data
    }
}

export const fillTodos = (list) => {
    return {
        type: 'FILL_TODOS',
        todos: list
    }
}

export const editTodo = (data) => {
    return {
        type: 'EDIT_TODO',
        todo: data
    }
}