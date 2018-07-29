/**
 * Created by 天俊sama on 2018/7/10.
 */
import VideoRoom from '../components/VideoRoom'
import { connect } from 'react-redux'
import { getVideo } from '../reducers/videoInfoReducer'
import { uploadDanmu } from '../reducers/danmuReducer'
import {checkLoginAction} from '../reducers/loginState'
import  * as controlFuns  from '../reducers/videoControlReducer'

const mapStateToProps = state => ({
    videoInfo:state.videoInfoReducer.videoInfo,
    controlState:state.videoControlReducer
})

function mapDispatchToProps(dispatch) {
    return {
        checkLogin: (callback) => {
            dispatch(checkLoginAction(callback))
        },
        getVideo: (data) => {
            dispatch(getVideo(data))
        },
        uploadDanmu: (data,callback)=>{
            dispatch(uploadDanmu(data,callback))
        },
        videoControl:{
            togglePlayState:()=>{dispatch(controlFuns.togglePlayState())},
            toggleDanmuSwitch:()=>{dispatch(controlFuns.toggleDanmuSwitch())},
            toggleSettingMenu:()=>{dispatch(controlFuns.toggleSettingMenu())},
            canPlayThrough:()=>{dispatch(controlFuns.canPlayThrough())},
            setDanmuSize:(val)=>{dispatch(controlFuns.setDanmuSize(val))},
            setDanmuStyle:(val)=>{dispatch(controlFuns.setDanmuStyle(val))},
            setDanmuColor:(val)=>{dispatch(controlFuns.setDanmuColor(val))},
            setDanmuInput:(val)=>{dispatch(controlFuns.setDanmuInput(val))},
            setVol:(val)=>{dispatch(controlFuns.setVol(val))},
            setPlayProgress:(val)=>{dispatch(controlFuns.setPlayProgress(val))},
            setCurrentTime:(val)=>{dispatch(controlFuns.setCurrentTime(val))}
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoRoom)