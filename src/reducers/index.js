import counterReducer from './counter'
import projectsReducer from './projects'
import linksReducer from './links'
import sidebarReducer from './sidebar'

import { combineReducers } from 'redux'

const allReducers = combineReducers({
    counter: counterReducer,
    projects: projectsReducer,
    links: linksReducer,
    sidebarShow: sidebarReducer,
})

export default allReducers;