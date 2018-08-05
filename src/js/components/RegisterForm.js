/**
 * Created by 天俊sama on 2018/6/4.
 */
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import style from './css/RegisterForm.css'
import closeBtnPng from '../../img/close-btn.png'
import { message } from 'antd'
import { SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import { registerAction } from '../reducers/loginState'


let RegisterForm = props => {
    const { handleSubmit, boxHandler, error, registerSubmit } = props

    const registerReq =  function(values) {
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
        registerSubmit(reg_data,(res)=>{
            if(res.code===0){
                message.success('注册成功')
                boxHandler.closeRegisterBox()
            }else{
                message.error('注册失败')
            }
        })
    }

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

const mapDispatchToProps = (dispatch) => {
    return {
        registerSubmit: (data,callback) => {
            dispatch(registerAction(data,callback))
        }
    }
}

RegisterForm = connect(null,mapDispatchToProps)(reduxForm({
    // a unique name for the form
    form: 'registerForm'
})(RegisterForm))


export default RegisterForm;
