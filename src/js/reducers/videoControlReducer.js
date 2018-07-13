import { createAction, createReducer } from 'redux-act';

//control video
export const toggleSettingMenu = createAction() ;
export const toggleDanmuSwitch = createAction() ;
export const onDanmuColorChange = createAction() ;
export const onDanmuSizeChange = createAction() ;
export const onDanmuStyleChange = createAction() ;
export const onDanmuInputChange = createAction() ;
export const onVolChange = createAction() ;
export const onPlayProgressChange = createAction() ;

const defaultState = {
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
    [toggleSettingMenu]:(state)=>{return {...state,isSettingMenuOn:!state.isSettingMenuOn}},
    [toggleDanmuSwitch]:(state)=>{return {...state,isDanmuOn:!state.isDanmuOn}}
},defaultState)

export default videoControlReducer