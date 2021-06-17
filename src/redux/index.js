import { combineReducers } from 'redux'

import notificationsReducer from './notifications'
import { projectReducer, projectsReducer } from './project'
import { taskReducer, tasksReducer } from './task'
import { linkReducer, linksReducer } from './link'
import { commentReducer, commentsReducer } from './comment'
import { todoReducer, todosReducer } from './todo'
import sidebarReducer from './sidebar'
import modalReducer from './modal'

const allReducers = combineReducers({
    modal: modalReducer,
    notifications: notificationsReducer,
    sidebar: sidebarReducer,

    project: projectReducer,
    projects: projectsReducer,

    link: linkReducer,
    links: linksReducer,

    task: taskReducer,
    tasks: tasksReducer,

    comment: commentReducer,
    comments: commentsReducer,

    todo: todoReducer,
    todos: todosReducer,
})

export default allReducers;

//ducks pattern