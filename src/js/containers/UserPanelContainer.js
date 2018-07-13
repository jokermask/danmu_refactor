import UserPanel from '../components/UserPanel'
import { connect } from 'react-redux'


const mapStateToProps = state => ({
    userNickname:state.loginState.userNickname,
    userIconUrl:state.loginState.userIconUrl
})

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserPanel)