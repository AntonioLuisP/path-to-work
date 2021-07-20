import { combineReducers } from 'redux'

import notificationsReducer from './notifications'
import sidebarReducer from './sidebar'

const allReducers = combineReducers({
    notifications: notificationsReducer,
    sidebar: sidebarReducer,
})

export default allReducers;

//ducks pattern