/**
 * Created by 天俊sama on 2018/4/26.
 */
import React, { Component } from 'react'
import style from './UserPanel.css'
import defaultFigure from './../../img/defaultFigure.jpg'

class UserPanel extends Component{

    render(){
        return(
        <div className={style.userPanel}>
            <div className={style.userFigure}>
                <p><img className={style.userIcon} src={this.props.userIconUrl} alt="user-figure"/></p>
                <p>{this.props.userName}</p>
            </div>
            <ul className={style.userMenu}>
                <li>投稿</li>
                <li>空间</li>
                <li>注销</li>
            </ul>
        </div>
    )}
}

UserPanel.defaultProps = {
    userIconUrl: defaultFigure ,
    userName: "asd"
};

export default UserPanel ;