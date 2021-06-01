import counterReducer from './counter'
import projectsReducer from './projects'
import sidebarReducer from './sidebar'

import { combineReducers } from 'redux'

const allReducers = combineReducers({
    counter: counterReducer,
    projects: projectsReducer,
    sidebarShow: sidebarReducer,
})

export default allReducers;