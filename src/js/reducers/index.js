import { combineReducers } from 'redux'
import loginState from './loginState'
import boxVisibility from './boxVisibility'
import asnycReducer from './asnyc'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  loginState,
  boxVisibility,
  asnycReducer,
  form : formReducer
})
