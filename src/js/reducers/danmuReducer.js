import { createAction, createReducer } from 'redux-act'
import {GET, POST} from '../utils/ajax'
import * as asnycStatus from './asnycState'

//fetch video
export const updateDanmu = createAction()
export const updateTime = createAction()
export const start = createAction()
export const success = createAction()
export const fail = createAction()

const defaultState = {
    danmulist:[],
    asnycStatus: asnycStatus.unsent
}


const danmuReducer = createReducer({
    [updateDanmu]:(state,danmu)=>{return {...state,danmulist:danmu}},
    [updateTime]:(state,time)=>{return {...state,currentTime:time}},
    [start]: (state) => ({ ...state, asnycStatus: asnycStatus.loading }),
    [success]: (state)=> ({ ...state, asnycStatus: asnycStatus.success }),
    [fail]: (state) => ({ ...state, asnycStatus: asnycStatus.failure }),
},defaultState)

export const getDanmuByVideo = (videoId)=>{
    return dispatch=>{
        dispatch(start())
        return GET('videoRoom/danmuList',videoId)
            .then(res=>{
                console.log(res)
                dispatch(updateDanmu(res))
            }).catch(
                dispatch(fail())
            )
    }
}

export const uploadDanmu = (danmu,callback)=>{
    return dispatch=>{
        dispatch(start())
        return POST('videoRoom/addDanmu',danmu)
            .then(res=>{
                res.isNew = true
                dispatch(success())
                callback(res)
            }).catch(
                dispatch(fail())
            )
    }
}

export default danmuReducer