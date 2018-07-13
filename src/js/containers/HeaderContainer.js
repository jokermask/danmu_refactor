/**
 * Created by 天俊sama on 2018/5/19.
 */
import Header from '../components/Header'
import { connect } from 'react-redux'
import {checkLoginAction} from '../reducers/loginState'


const mapStateToProps = state => ({
    isLogin: state.loginState.isLogin
})

function mapDispatchToProps(dispatch) {
    return {
        checkLogin: () => {
            dispatch(checkLoginAction())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)