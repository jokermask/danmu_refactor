import { createAction, createReducer } from 'redux-act'

//fetch video
export const addSingleMessage = createAction()

const defaultState = {
    messageList:[]
}

const messageBoxReducer = createReducer({
    [addSingleMessage]:(state,msg)=>{
        let newMessageList = state.messageList.concat(msg)
        return {messageList:newMessageList}
    },
},defaultState)


export default messageBoxReducer