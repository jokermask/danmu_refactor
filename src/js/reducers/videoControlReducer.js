import { createAction, createReducer } from 'redux-act';

//control video
export const togglePlayState = createAction() ;
export const toggleSettingMenu = createAction() ;
export const toggleDanmuSwitch = createAction() ;
export const canPlayThrough = createAction() ;
export const setDanmuColor = createAction() ;
export const setDanmuSize = createAction() ;
export const setDanmuStyle = createAction() ;
export const setDanmuInput = createAction() ;
export const setVol = createAction() ;
export const setPlayProgress = createAction() ;
export const setCurrentTime = createAction() ;
export const resetState = createAction() ;

const defaultState = {
    canPlayThrough: false,
    currentTime: 0,
    isPlaying: false,
    playPercent: 0,
    isDanmuOn: true,
    volPercent:75,
    isSettingMenuOn: false,
    danmuColor: '#FFF',
    danmuSize: 1,
    danmuStyle:'normal',
    danmuInput:''
}

const videoControlReducer = createReducer({
    [togglePlayState]:(state)=>{return {...state,isPlaying:!state.isPlaying}},
    [toggleSettingMenu]:(state)=>{return {...state,isSettingMenuOn:!state.isSettingMenuOn}},
    [toggleDanmuSwitch]:(state)=>{return {...state,isDanmuOn:!state.isDanmuOn}},
    [canPlayThrough]:(state)=>{return {...state,canPlayThrough:true}},
    [setDanmuColor]:(state,val)=>{return {...state,danmuColor:val}},
    [setDanmuSize]:(state,val)=>{return {...state,danmuSize:val}},
    [setDanmuStyle]:(state,val)=>{return {...state,danmuStyle:val}},
    [setVol]:(state,val)=>{return {...state,volPercent:val}},
    [setDanmuInput]:(state,val)=>{return {...state,danmuInput:val}},
    [setPlayProgress]:(state,val)=>{return {...state,playPercent:val}},
    [setCurrentTime]:(state,val)=>{return {...state,currentTime:Math.ceil(val)}},
    [resetState]:(state)=>{return defaultState}
},defaultState)

export default videoControlReducer