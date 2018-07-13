/**
 * Created by 天俊sama on 2018/7/10.
 */
import VideoRoom from '../components/VideoRoom'
import { connect } from 'react-redux'
import { getVideo } from '../reducers/videoInfoReducer'
import { toggleSettingMenu } from '../reducers/videoControlReducer'

const mapStateToProps = state => ({
    videoInfo:state.videoInfoReducer.videoInfo,
    controlState:state.videoControlReducer
})

function mapDispatchToProps(dispatch) {
    return {
        getVideo: (data) => {
            dispatch(getVideo(data))
        },
        videoControl:{
            toggleSettingMenu:()=>{dispatch(toggleSettingMenu())}
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoRoom)