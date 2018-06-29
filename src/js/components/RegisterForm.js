/**
 * Created by 天俊sama on 2018/6/4.
 */
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import style from './RegisterForm.css'
import closeBtnPng from '../../img/close-btn.png'
import {POST} from '../utils/ajax'
import { SubmissionError } from 'redux-form'


const registerReq = async function(values) {
    let usernameReg = /^[A-Za-z0-9|_]{6,16}$/;//6~16位字母数字下划线
    let passwordReg = /^[@A-Za-z0-9!#$%^&*.~]{6,16}$/ ;//6~16位可包含特殊字符
    let emailReg = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/ ;
    if (!values.username||!usernameReg.test(values.username)) {
        throw new SubmissionError({
            _error: '账户为空或格式错误'
        })
    }
    if (!values.password||!passwordReg.test(values.username)) {
        throw new SubmissionError({
            _error: '密码为空或格式错误'
        })
    }

    if(values.password!==values.pwdconfirm){
        throw new SubmissionError({
            _error: '两次密码不一致'
        })
    }

    if(!values.email||!emailReg.test(values.email)){
        throw new SubmissionError({
            _error: '邮箱为空或格式不正确'
        })
    }

    let reg_data = {...values} ;
    delete reg_data.pwdconfirm
    var res = await POST("/user/register",reg_data)
    console.log(res)
}

let RegisterForm = props => {
    const { handleSubmit, boxHandler, error } = props

    return (
        <div className={style.registerMask}>
            <form className={style.registerForm} onSubmit={ handleSubmit(registerReq) }>
                <img className={style.closeBtn} src={closeBtnPng} alt="closeBtn" onClick={boxHandler.closeRegisterBox}/>
                <div>
                    <label htmlFor="username">账户</label>
                    <Field name="username" component="input" type="text" placeholder="6~16位可由字母数字下划线组成"/>
                </div>
                <div>
                    <label htmlFor="password">密码</label>
                    <Field name="password" component="input" type="password" placeholder="6~16位可包含符号"/>
                </div>
                <div>
                    <label htmlFor="pwdconfirm">密码确认</label>
                    <Field name="pwdconfirm" component="input" type="password" placeholder="再次输入你的密码"/>
                </div>
                <div>
                    <label htmlFor="nickname">昵称</label>
                    <Field name="nickname" component="input" type="text" placeholder="你的昵称"/>
                </div>
                <div>
                    <label htmlFor="email">邮箱</label>
                    <Field name="email" component="input" type="text" placeholder="用户邮箱"/>
                </div>
                <button className={style.submitBtn} type="submit">注册</button>
                <p className={style.valError} name="errorText">{error}</p>
            </form>
        </div>
    )
}

RegisterForm = reduxForm({
    // a unique name for the form
    form: 'registerForm',
    registerReq
})(RegisterForm)

export default RegisterForm;
