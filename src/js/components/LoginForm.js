import React from 'react'
import { Field, reduxForm } from 'redux-form'
import style from './LoginForm.css'
import closeBtnPng from '../../img/close-btn.png'
import {POST} from '../utils/ajax'
import { SubmissionError } from 'redux-form'


const loginReq = async function(values) {

    if (!values.username) {
        throw new SubmissionError({
            _error: '账户不能为空'
        })
    }
    if (!values.password) {
        throw new SubmissionError({
            _error: '密码不能为空'
        })
    }

    var res = await POST("/user/login",values)
    console.log(res)
}

let LoginForm = props => {
    const { handleSubmit, boxHandler, error } = props

    return (
        <div className={style.loginMask}>
            <form className={style.loginForm} onSubmit={ handleSubmit(loginReq) }>
                <img className={style.closeBtn} src={closeBtnPng} alt="closeBtn" onClick={boxHandler.closeLoginBox}/>
                <div>
                    <label htmlFor="username">账户</label>
                    <Field name="username" component="input" type="text" />
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
    loginReq
})(LoginForm)

export default LoginForm;
