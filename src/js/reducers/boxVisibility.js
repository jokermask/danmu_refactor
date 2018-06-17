
const defaultState = {
    loginBoxVisibility: false,
    registerBoxVisibility: false
}


const boxVisibility = (state=defaultState,action)=>{
    switch (action.type){

        case 'SHOW_LOGIN_BOX':
            return Object.assign({},state,{
                loginBoxVisibility: true
            })

        case 'CLOSE_LOGIN_BOX':
            return Object.assign({},state,{
                loginBoxVisibility: false
            })

        case 'SHOW_REGISTER_BOX':
            return Object.assign({},state,{
                registerBoxVisibility: true
            })

        case 'CLOSE_REGISTER_BOX':
            return Object.assign({},state,{
                registerBoxVisibility: false
            })
        default:
            return state
    }

}

export default boxVisibility