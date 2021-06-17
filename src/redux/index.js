import { combineReducers } from 'redux'

import notificationsReducer from './notifications'
import projectsReducer from './project'
import tasksReducer from './task'
import linksReducer from './link'
import commentsReducer from './comment'
import todosReducer from './todo'
import sidebarReducer from './sidebar'
import modalReducer from './modal'

const allReducers = combineReducers({
    modal: modalReducer,
    notifications: notificationsReducer,
    projects: projectsReducer,
    tasks: tasksReducer,
    links: linksReducer,
    comments: commentsReducer,
    todos: todosReducer,
    sidebar: sidebarReducer,
})

export default allReducers;

//ducks pattern