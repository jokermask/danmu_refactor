import { createAction, createReducer } from 'redux-act';

export const showLoginBox = createAction();
export const closeLoginBox = createAction();
export const showRegisterBox = createAction();
export const closeRegisterBox = createAction();

const defaultState = {
    loginBoxVisibility: false,
    registerBoxVisibility: false
}

const boxVisibilityReducer = createReducer({
    [showLoginBox]: (state)=> Object.assign({},state,{
        loginBoxVisibility: true
    }),
    [closeLoginBox]: (state)=> Object.assign({},state,{
        loginBoxVisibility: false
    }),
    [showRegisterBox]: (state)=> Object.assign({},state,{
        registerBoxVisibility: true
    }),
    [closeRegisterBox]: (state)=> Object.assign({},state,{
        registerBoxVisibility: false
    })
},defaultState) ;


export default boxVisibilityReducer