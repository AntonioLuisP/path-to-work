import counterReducer from './counter'
import notificationsReducer from './notifications'
import projectsReducer from './projects'
import linksReducer from './links'
import sidebarReducer from './sidebar'

import { combineReducers } from 'redux'

const allReducers = combineReducers({
    counter: counterReducer,
    notifications: notificationsReducer,
    projects: projectsReducer,
    links: linksReducer,
    sidebarShow: sidebarReducer,
})

export default allReducers;