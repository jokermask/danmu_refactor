import { combineReducers } from 'redux'
import loginState from './loginState'
import boxVisibility from './boxVisibility'
import videoInfoReducer from './videoInfoReducer'
import videoControlReducer from './videoControlReducer'
import danmuReducer from './danmuReducer'
import messageBoxReducer from './messageBoxReducer'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    loginState,
    boxVisibility,
    videoInfoReducer,
    videoControlReducer,
    danmuReducer,
    messageBoxReducer,
    form : formReducer
})
