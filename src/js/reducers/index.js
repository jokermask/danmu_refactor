import { combineReducers } from 'redux'
import loginState from './loginState'
import boxVisibility from './boxVisibility'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  loginState,
  boxVisibility,
  form : formReducer
})
