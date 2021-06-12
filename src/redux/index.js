import { combineReducers } from 'redux'

import notificationsReducer from './notifications'
import projectsReducer from './projects'
import tasksReducer from './tasks'
import linksReducer from './links'
import commentsReducer from './comments'
import todosReducer from './todos'
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