import counterReducer from './counter'
import notificationsReducer from './notifications'
import projectsReducer from './projects'
import linksReducer from './links'
import sidebarReducer from './sidebar'
import modalReducer from './modal'

import { combineReducers } from 'redux'

const allReducers = combineReducers({
    counter: counterReducer,
    modal: modalReducer,
    notifications: notificationsReducer,
    projects: projectsReducer,
    links: linksReducer,
    sidebarShow: sidebarReducer,
})

export default allReducers;