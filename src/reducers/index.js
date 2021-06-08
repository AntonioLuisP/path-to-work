import counterReducer from './counter'
import notificationsReducer from './notifications'
import projectsReducer from './projects'
import tasksReducer from './tasks'
import linksReducer from './links'
import commentsReducer from './comments'
import sidebarReducer from './sidebar'
import modalReducer from './modal'

import { combineReducers } from 'redux'

const allReducers = combineReducers({
    counter: counterReducer,
    modal: modalReducer,
    notifications: notificationsReducer,
    projects: projectsReducer,
    tasks: tasksReducer,
    links: linksReducer,
    comments: commentsReducer,
    sidebarShow: sidebarReducer,
})

export default allReducers;