/**
 * Created by 天俊sama on 2018/5/21.
 */
import LoginPanel from '../components/LoginPanel'
import { connect } from 'react-redux'
import { boxHandler } from '../actions/index'

const mapStateToProps = state => ({
    loginBoxVisibility: state.boxVisibility.loginBoxVisibility,
    registerBoxVisibility: state.boxVisibility.registerBoxVisibility
})

function mapDispatchToProps(dispatch) {
    return {
        boxHandler: {
            showLoginBox:()=>dispatch(boxHandler.showLoginBox()),
            closeLoginBox:()=>dispatch(boxHandler.closeLoginBox()),
            showRegisterBox:()=>dispatch(boxHandler.showRegisterBox()),
            closeRegisterBox:()=>dispatch(boxHandler.closeRegisterBox())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPanel)