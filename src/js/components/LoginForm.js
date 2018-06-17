import React from 'react'
import { Field, reduxForm } from 'redux-form'
import style from './LoginForm.css'
import closeBtnPng from '../../img/close-btn.png'
import {POST} from '../utils/ajax'

const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.errorText = '用户名不能为空'
    }
    if (!values.password) {
        errors.errorText = '密码不能为空'
    }
    return errors
}

const loginReq = async function(values) {
    let res = await POST("/user/login",values)
    console.log(res)
}

let LoginForm = props => {
    const { handleSubmit, boxHandler, error } = props

    return (
        <div className={style.loginMask}>
            <form className={style.loginForm} onSubmit={ handleSubmit(loginReq) }>
                <img className={style.closeBtn} src={closeBtnPng} alt="closeBtn" onClick={boxHandler.closeLoginBox}/>
                <div>
                    <label htmlFor="userName">账户</label>
                    <Field name="userName" component="input" type="text" />
                </div>
                <div>
                    <label htmlFor="password">密码</label>
                    <Field name="password" component="input" type="text" />
                </div>
                <button className={style.loginBtn} type="submit">登录</button>
                <p className={style.registerBtn}>还没有账号？注册一个</p>
                <p className={style.loginError} name="errorText">{error}</p>
            </form>
        </div>
    )
}

LoginForm = reduxForm({
    // a unique name for the form
    form: 'loginForm',
    validate,
    loginReq
})(LoginForm)

export default LoginForm;
