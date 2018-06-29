import {createAction, createReducer} from 'redux-act';
import {POST} from '../utils/ajax'
import * as asnycStatus from './asnycState';

export const start = createAction();
export const success = createAction();
export const fail = createAction();

const asnycReducer = createReducer({
    [start]: (state) => ({ ...state, asnycStatus: asnycStatus.loading }),
    [success]: (state, result) => ({ ...state, asnycStatus: asnycStatus.success, result }),
    [fail]: (state, result) => ({ ...state, asnycStatus: asnycStatus.failure, result })
}, {
    asnycStatus: asnycStatus.unsent
});

// 1) You can use the same way as the Redux samples
// using thunk middleware

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
                return res
            })
            .catch(
                dispatch(fail())
            )
    };
}

export default asnycReducer
