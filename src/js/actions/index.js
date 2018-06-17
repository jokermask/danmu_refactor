
const showLoginBox = () => ({
    type: 'SHOW_LOGIN_BOX'
})

const closeLoginBox = () => ({
    type: 'CLOSE_LOGIN_BOX'
})

const showRegisterBox = () => ({
    type: 'SHOW_REGISTER_BOX'
})

const closeRegisterBox = () => ({
    type: 'CLOSE_REGISTER_BOX'
})

export const boxHandler = {
    showLoginBox,
    closeLoginBox,
    showRegisterBox,
    closeRegisterBox
}



