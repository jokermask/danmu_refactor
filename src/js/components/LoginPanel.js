/**
 * Created by 天俊sama on 2018/4/26.
 */
import React, { Component } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import style from './LoginPanel.css';

class LoginPanel extends Component{


    render() {
        const { boxHandler,
                loginBoxVisibility,
                registerBoxVisibility} = this.props

        return (
            <div className={style.loginPanel}>
                <Button type="primary" onClick={boxHandler.showLoginBox}>登录</Button>
                {loginBoxVisibility ? <LoginForm boxHandler={boxHandler}/> : ""}
                <Button type="primary" onClick={boxHandler.showRegisterBox}>注册</Button>
                {registerBoxVisibility ? <RegisterForm boxHandler={boxHandler}/> : ""}
            </div>
        )
    }

}

LoginPanel.propTypes = {
    boxHandler: PropTypes.object.isRequired,
    loginBoxVisibility: PropTypes.bool.isRequired,
    registerBoxVisibility: PropTypes.bool.isRequired
}

export default LoginPanel;