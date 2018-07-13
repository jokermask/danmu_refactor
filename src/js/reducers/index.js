import { combineReducers } from 'redux'
import loginState from './loginState'
import boxVisibility from './boxVisibility'
import videoInfoReducer from './videoInfoReducer'
import videoControlReducer from './videoControlReducer'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  loginState,
  boxVisibility,
  videoInfoReducer,
  videoControlReducer,
  form : formReducer
})
