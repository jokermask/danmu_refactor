/**
 * Created by 天俊sama on 2018/5/19.
 */
import MessageBox from '../components/MessageBox'
import { connect } from 'react-redux'
import {addSingleMessage} from '../reducers/messageBoxReducer'


const mapStateToProps = state => ({
    messageList: state.messageBoxReducer.messageList,
})

function mapDispatchToProps(dispatch) {
    return {
        addSingleMessage: (data) => {
            dispatch(addSingleMessage(data))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { withRef: true }
)(MessageBox)