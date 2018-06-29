import { createAction, createReducer } from 'redux-act';
import {POST} from '../utils/ajax'
import * as asnycStatus from './asnycState';

const defaultState = {
    isLogin:false,
    nickname:"",
    userIconUrl:'../../img/defaultFigure.jpg',
    asnycStatus: asnycStatus.unsent
}

export const toLoginState = createAction()
export const toLogoffState = createAction()
export const start = createAction();
export const success = createAction();
export const fail = createAction();

const loginState = createReducer({
    [toLoginState]:(state) => ({...state, isLogin: true}),
    [toLogoffState]:(state) => ({...state, isLogin: false}),
    [start]: (state) => ({ ...state, asnycStatus: asnycStatus.loading }),
    [success]: (state, result) => {
        if (result.code === 1) {
            return {...state, isLogin: false}
        } else {
            return {
                ...state,
                asnycStatus: asnycStatus.success,
                isLogin: true,
                nickname: result.userNickname,
                userIconUrl: result.userIconUrl
            }
        }
    },
    [fail]: (state, result) => ({ ...state, asnycStatus: asnycStatus.failure })
},defaultState)

export const loginAction = (data,callback) => {
    // We don't really need the dispatch
    // but here it is if you don't bind your actions
    return dispatch => {
        // state: { running: false, result: false }
        dispatch(start())
        // state: { running: true, result: false }
        return POST('/user/login',data)
            .then((res)=>{
                console.log(res)
                //if(res.code===1){
                //    message('登录失败')
                //}else{
                //    message('登录成功')
                //    dispatch(success(res))
                //}
                dispatch(success(res))
                callback(res)
                return res
            })
            .catch(
                dispatch(fail())
            )
    };
}

export default loginState