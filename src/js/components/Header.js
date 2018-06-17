import React, { Component } from 'react'
import LoginPanelContainer from '../containers/LoginPanelContainer'
import UserPanel from './UserPanel'
import PropTypes from 'prop-types'
import './../base.css'
import style from './Header.css'


class Header extends Component {


    render() {

    const { isLogin } = this.props

    return (
        <div className={style.headerWrap}>
            <div className={style.headerContainer}>
                <div className={style.logoArea}>
                    <h1>Mask的弹幕网站</h1>
                    <p><b></b>记录生活，不忘初心</p>
                </div>
                {isLogin ? <UserPanel/> : <LoginPanelContainer/> }
            </div>
        </div>
    );
  }

}

Header.propTypes = {
    isLogin: PropTypes.bool.isRequired
};

export default Header
