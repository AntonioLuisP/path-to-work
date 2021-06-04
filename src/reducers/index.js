import counterReducer from './counter'
import notificationsReducer from './notifications'
import projectsReducer from './projects'
import tasksReducer from './tasks'
import linksReducer from './links'
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
    sidebarShow: sidebarReducer,
})

export default allReducers;