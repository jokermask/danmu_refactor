import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { message } from 'antd'
import style from './css/LoginForm.css'
import closeBtnPng from '../../img/close-btn.png'
import { SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import {loginAction} from '../reducers/loginState'



let LoginForm = props => {
    const { handleSubmit, boxHandler, error ,loginSubmit, isLogin } = props

    const loginReq = function(values) {

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

        loginSubmit(values,(res)=>{
            if(res.code===0){
                message.success('登录成功')
                boxHandler.closeLoginBox()
            }else{
                message.error('登录失败')
                console.log(isLogin)
            }
        })

    }


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
                    <Field name="password" component="input" type="password" />
                </div>
                <button className={style.loginBtn} type="submit">登录</button>
                <p className={style.registerBtn} onClick={()=>{boxHandler.closeLoginBox();boxHandler.showRegisterBox()}}>还没有账号？注册一个</p>
                <p className={style.loginError} name="errorText">{error}</p>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    isLogin: state.loginState.isLogin
})

const mapDispatchToProps = (dispatch) => {
    return {
        loginSubmit: (data,callback) => {
            dispatch(loginAction(data,callback))
        }
    }
}

LoginForm = connect(mapStateToProps,mapDispatchToProps)(reduxForm({
    // a unique name for the form
    form: 'loginForm'
})(LoginForm))

export default LoginForm;
