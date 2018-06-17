const defaultState = {
    isLogin:false
}

const loginState = (state=defaultState,action)=>{
    switch (action.type) {
        case 'LOGIN':
            return {
                isLogin:true
            }
        case 'LOGOFF':
            return {
                isLogin:false
            }
        default:
            return state
    }
}

export default loginState