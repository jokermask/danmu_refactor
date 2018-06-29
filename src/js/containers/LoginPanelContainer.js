/**
 * Created by 天俊sama on 2018/5/21.
 */
import LoginPanel from '../components/LoginPanel'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as boxVisibilityActions from '../reducers/boxVisibility'

const mapStateToProps = state => ({
    loginBoxVisibility: state.boxVisibility.loginBoxVisibility,
    registerBoxVisibility: state.boxVisibility.registerBoxVisibility
})

function mapDispatchToProps(dispatch) {
    return {
        boxHandler: bindActionCreators(boxVisibilityActions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPanel)