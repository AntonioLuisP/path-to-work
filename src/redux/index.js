import { combineReducers } from 'redux'

import notificationsReducer from './notifications'
import { projectReducer, projectsReducer } from './project'
import { tasksReducer } from './task'
import { linkReducer, linksReducer } from './link'
import { commentsReducer } from './comment'
import { todosReducer } from './todo'
import sidebarReducer from './sidebar'
import modalReducer from './modal'

const allReducers = combineReducers({
    modal: modalReducer,
    notifications: notificationsReducer,
    sidebar: sidebarReducer,

    project: projectReducer,
    projects: projectsReducer,

    tasks: tasksReducer,

    link: linkReducer,
    links: linksReducer,

    comments: commentsReducer,

    todos: todosReducer,
})

export default allReducers;

//ducks pattern