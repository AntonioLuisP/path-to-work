import counterReducer from './counter'
import sidebarReducer from './sidebar'

import { combineReducers } from 'redux'

const allReducers = combineReducers({
    counter: counterReducer,
    sidebarShow: sidebarReducer,
})

export default allReducers;