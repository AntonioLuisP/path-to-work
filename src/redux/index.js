import { combineReducers } from 'redux'

import notificationsReducer from './notifications'
import { projectReducer, projectsReducer } from './project'
import { listReducer, listsReducer } from './list'
import { taskReducer, tasksReducer } from './task'
import { linkReducer, linksReducer } from './link'
import { commentReducer, commentsReducer } from './comment'
import { todoReducer, todosReducer } from './todo'
import sidebarReducer from './sidebar'

const allReducers = combineReducers({

    notifications: notificationsReducer,
    sidebar: sidebarReducer,

    list: listReducer,
    lists: listsReducer,

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