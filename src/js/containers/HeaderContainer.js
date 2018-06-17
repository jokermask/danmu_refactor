/**
 * Created by 天俊sama on 2018/5/19.
 */
import Header from '../components/Header'
import { connect } from 'react-redux'


const mapStateToProps = state => ({
    isLogin: state.loginState.isLogin
})


export default connect(
    mapStateToProps
)(Header)