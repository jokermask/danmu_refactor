/**
 * Created by 天俊sama on 2018/4/26.
 */
import React, { Component } from 'react'
import style from './css/UserPanel.css'
import { message } from 'antd'

class UserPanel extends Component{

    render(){
        const { userNickname, userIconUrl, logoffAction } = this.props

        const incomplete = ()=>{
            message.error('该功能暂时不开放')
        }

        return(
        <div className={style.userPanel}>
            <div className={style.userFigure}>
                <p><img className={style.userIcon} src={userIconUrl} alt="user-figure"/></p>
                <p>{userNickname}</p>
            </div>
            <ul className={style.userMenu}>
                <li onClick={incomplete}>投稿</li>
                <li onClick={incomplete}>空间</li>
                <li onClick={logoffAction}>注销</li>
            </ul>
        </div>
    )}
}


export default UserPanel ;