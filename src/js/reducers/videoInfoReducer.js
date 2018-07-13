import { createAction, createReducer } from 'redux-act';
import {GET} from '../utils/ajax'
import * as asnycStatus from './asnycState';

//fetch video
export const addVideosSuccess = createAction() ;
export const addSingleVideo = createAction() ;
export const getSingleVideo = createAction() ;
export const start = createAction();
export const success = createAction();
export const fail = createAction();



const defaultState = {
    videolist:[],
    videoInfo:{
        video:{
            author_nickname: "",
            author_username: "",
            brief: "",
            cover: "",
            date: "" ,
            path: "",
            pro_count: 0,
            type: "",
            video_tittle: "",
            watch_count: 0 ,
            __v: 0,
            _id: ""
        },
        isLike:false
    },
    asnycStatus: asnycStatus.unsent
}

const videoInfoReducer = createReducer({
    [start]: (state) => ({ ...state, asnycStatus: asnycStatus.loading }),
    [fail]: (state) => ({ ...state, asnycStatus: asnycStatus.failure }),
    [addVideosSuccess]:(state,videolist) => {
          return {...state,
              videolist:videolist,
              asnycStatus: asnycStatus.success
          }
    },
    [addSingleVideo]:(state,video) => {
        const videolist = state.videolis.push(video) ;
        return {...state, videolist:videolist}
    },
    [getSingleVideo]:(state,videoInfo)=>{return {...state,videoInfo:videoInfo}}

},defaultState)

export const fetchVideos = () => {
    // We don't really need the dispatch
    // but here it is if you don't bind your actions
    return dispatch => {
        // state: { running: false, result: false }
        dispatch(start())
        // state: { running: true, result: false }
        return GET('/video')
            .then((res)=>{
                console.log(res)
                dispatch(addVideosSuccess(res))
                return res
            })
            .catch(
                dispatch(fail())
            )
    };
}

export const getVideo = (data) => {
    // We don't really need the dispatch
    // but here it is if you don't bind your actions
    return dispatch => {
        // state: { running: false, result: false }
        dispatch(start())
        // state: { running: true, result: false }
        return GET('/videoRoom',data)
            .then((res)=>{
                console.log(res)
                dispatch(getSingleVideo(res))
                return res
            })
            .catch(
                dispatch(fail())
            )
    };
}

export default videoInfoReducer