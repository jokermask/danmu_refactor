/**
 * Created by 天俊sama on 2018/4/26.
 */
import React, { Component } from 'react'
import style from './UserPanel.css'

class UserPanel extends Component{

    render(){
        const { userNickname, userIconUrl } = this.props

        return(
        <div className={style.userPanel}>
            <div className={style.userFigure}>
                <p><img className={style.userIcon} src={userIconUrl} alt="user-figure"/></p>
                <p>{userNickname}</p>
            </div>
            <ul className={style.userMenu}>
                <li>投稿</li>
                <li>空间</li>
                <li>注销</li>
            </ul>
        </div>
    )}
}


export default UserPanel ;