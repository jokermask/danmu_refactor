import { connect } from 'react-redux'
import DanmuBox from '../components/DanmuBox'
import { getDanmuByVideo } from '../reducers/danmuReducer'

const mapStateToProps = state => ({
    danmulist:state.danmuReducer.danmulist,
    isPlaying:state.videoControlReducer.isPlaying,
    currentTime:state.videoControlReducer.currentTime
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
    mapDispatchToProps
)(DanmuBox)