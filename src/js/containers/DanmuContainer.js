import { connect } from 'react-redux'
import DanmuBox from '../components/DanmuBox'
import { getDanmuByVideo } from '../reducers/danmuReducer'

const mapStateToProps = state => ({
    danmulist:state.danmuReducer.danmulist,
    isPlaying:state.videoControlReducer.isPlaying,
    isDanmuOn: state.videoControlReducer.isDanmuOn,
    currentTime:state.videoControlReducer.currentTime,
    canPlayThrough:state.videoControlReducer.canPlayThrough
})

function mapDispatchToProps(dispatch) {
    return {
        getDanmu: (data) =>{
            dispatch(getDanmuByVideo(data))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { withRef: true }
)(DanmuBox)