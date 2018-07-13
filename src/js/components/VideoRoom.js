import React,{Component} from 'react'
import { Progress, Switch, Radio, Spin, Slider } from 'antd'
import style from './css/VideoRoom.css'
import danmuSettingCloseImg from '../../img/danmu-setting-close.png'

class VideoRoom extends Component{

    componentDidMount(){
        const { getVideo } = this.props
        const videoId = this.props.match.params.videoId
        getVideo({_id:videoId})
    }

    render(){

        const {videoInfo, controlState, videoControl} = this.props
        const video = videoInfo.video
        console.log(controlState)
        const isLike = videoInfo.isLike
        const RadioGroup = Radio.Group
        const textSizeOptions = [
            { label: '大', value: 0 },
            { label: '中', value: 1 },
            { label: '小', value: 2 }
        ]
        const onChange = ()=>{

        }
        const danmuStyleOptions = [
            { label: '顶端弹幕', value: 'top' },
            { label: '正常弹幕', value: 'normal' },
            { label: '底部弹幕', value: 'bottom' }
        ]
        const danmuSetting = (
            <div className={style.danmuSetting}>
                <img className={style.settingCloseBtn} src={danmuSettingCloseImg} onClick={videoControl.toggleSettingMenu} alt=""/>
                <p>弹幕颜色</p>
                <input id="danmuColor" value="#FFF" type="color"/>
                <p>弹幕大小</p>
                <RadioGroup options={textSizeOptions} value={1} onChange={onChange} />
                <p>弹幕样式</p>
                <RadioGroup options={danmuStyleOptions} value={'normal'} onChange={onChange} />
            </div>
        );

        return(
            <div className={style.videoLayout}>
                <div className={style.videoContainer}>
                    <div className={style.danmuContainer}>
                        <div className={style.loadingIcon}><Spin size="large"/></div>
                        <video className={style.video} src={video.path} data-id={video._id} data-author={video.author_username} preload="true"/>
                    </div>
                    <div className={style.videoControls}>
                        <div className={style.progressLayer}>
                            <button className={style.playBtn} title="Play"><span className={style.stop}></span></button>
                            <div className={style.videoProgress} ><Progress percent={30} showInfo={false} strokeWidth={15} width={24}/></div>
                            <div className={style.volumeControl}>
                                <b className={controlState.volPercent>0?style.volumeOn:style.volumeOff}/>
                                <div className={style.volSliderWrap}><Slider className={style.volSlider} defaultValue={30} vertical={false}/></div>
                            </div>
                            <div className={controlState.isDanmuOn?style.danmuOn:style.danmuOff} title="弹幕开关"></div>
                        </div>
                        <div className={style.sendLayer}>
                            <b className={style.danmuSettingIcon} title="设置弹幕" onClick={videoControl.toggleSettingMenu}></b>
                            {controlState.isSettingMenuOn ?danmuSetting:""}
                            <input className={style.danmuInput} type="text"/>
                            <input className={style.sendDanmuBtn} type="button" value="发送弹幕"/>
                            <b className={isLike?style.videoMarked:style.videoUnmarked} title="收藏或取消"></b>
                        </div>
                    </div>
                </div>
                <div className={style.messagesBox}>
                    <p className={style.messagesBoxTittle}>即时信息</p>
                    <div className={style.messagesBoxContent}>
                        <ul className={style.messagesList}></ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default VideoRoom