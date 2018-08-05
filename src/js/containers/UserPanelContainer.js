import UserPanel from '../components/UserPanel'
import { connect } from 'react-redux'
import { logoffAction } from '../reducers/loginState'

const mapStateToProps = state => ({
    userNickname:state.loginState.userNickname,
    userIconUrl:state.loginState.userIconUrl
})

function mapDispatchToProps(dispatch) {
    return {
        logoffAction:()=>{dispatch(logoffAction())}
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserPanel)