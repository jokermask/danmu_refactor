import React,{Component} from 'react'
import { Progress, Radio, Spin, Slider } from 'antd'
import DanmuContainer from '../containers/DanmuContainer'
import style from './css/VideoRoom.css'
import danmuSettingCloseImg from '../../img/danmu-setting-close.png'

class VideoRoom extends Component{

    componentDidMount(){
        const { getVideo, videoControl } = this.props
        const videoId = this.props.match.params.videoId
        getVideo({_id:videoId})

        //init video
        this.videoEle = document.getElementById("video")
        this.videoEle.addEventListener('canplay',()=>{
            videoControl.canPlayThrough()
        })
        this.videoEle.addEventListener('ended',()=>{
            videoControl.togglePlayState()
            window.clearInterval(this.progressFlag)
            window.clearInterval(this.timeFlag)
        })
        var progressBar = this.refs.progressBar
        progressBar.addEventListener('click',(e)=>{
            var percent = e.offsetX/650
            this.videoEle.currentTime = percent * this.videoEle.duration
            videoControl.setPlayProgress(percent*100)
        })
        //if(controlState.isPlaying) {
        //
        //}
        //if(controlState.isDanmuOn){
        //    //danmuFlag = setInterval(loadDanmu, 1000);
        //}
    }

    render(){

        const {videoInfo, controlState, videoControl} = this.props
        const videoId = this.props.match.params.videoId
        const video = videoInfo.video
        const isLike = videoInfo.isLike
        const RadioGroup = Radio.Group
        const textSizeOptions = [
            { label: '大', value: 0 },
            { label: '中', value: 1 },
            { label: '小', value: 2 }
        ]
        const onDanmuSizeChange = (e)=>{
            const val = e.target.value
            videoControl.setDanmuSize(val)
        }
        const onDanmuStyleChange = (e)=>{
            const val = e.target.value
            videoControl.setDanmuStyle(val)
        }
        const onDanmuColorChange = (e)=>{
            const val = e.target.value
            videoControl.setDanmuColor(val)
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
                <input value={controlState.danmuColor} type="color" onChange={onDanmuColorChange}/>
                <p>弹幕大小</p>
                <RadioGroup options={textSizeOptions} value={controlState.danmuSize} onChange={onDanmuSizeChange} />
                <p>弹幕样式</p>
                <RadioGroup options={danmuStyleOptions} value={controlState.danmuStyle} onChange={onDanmuStyleChange} />
            </div>
        )

        //control video functions
        const togglePlayState = ()=>{
            let videoEle = this.videoEle
            if ( !controlState.isPlaying || videoEle.ended ) {
                if (videoEle.ended) {
                    videoEle.currentTime = 0
                }
                videoEle.play()
                this.progressFlag = setInterval(()=> {
                    var percent = (this.videoEle.currentTime / this.videoEle.duration)*100
                    videoControl.setPlayProgress(percent)
                }, 60)
                this.timeFlag = setInterval(()=> {
                    var currentTime = this.videoEle.currentTime
                    videoControl.setCurrentTime(currentTime)
                }, 1000)
            }else{
                videoEle.pause()
                window.clearInterval(this.progressFlag)
                window.clearInterval(this.timeFlag)
            }
            videoControl.togglePlayState()
        }

        const onVolChange = (val)=>{
            let videoEle = this.videoEle
            videoEle.volume = val/100
            videoControl.setVol(val)
        }

        const toggleVol = ()=>{
            let videoEle = this.videoEle
            if(controlState.volPercent>0){
                this.lastVol = controlState.volPercent/100
                videoEle.volume = 0
                videoControl.setVol(0)
            }else{
                videoEle.volume = this.lastVol?this.lastVol:0.75
                videoControl.setVol(videoEle.volume*100)
            }
        }


        return(
            <div className={style.videoLayout}>
                <div className={style.videoContainer}>
                    <DanmuContainer className={style.danmuContainer} videoId={videoId}>
                        {controlState.canPlayThrough?"":<div className={style.loadingIcon}><Spin size="large"/></div>}
                        <video className={style.video} id="video" src={video.path} data-id={video._id} data-author={video.author_username} preload="true"/>
                    </DanmuContainer>
                    <div className={style.videoControls}>
                        <div className={style.progressLayer}>
                            <button className={style.playBtn} title="Play" onClick={togglePlayState}><span className={controlState.isPlaying?style.playing:style.stop}></span></button>
                            <div className={style.videoProgress}  ref="progressBar"><Progress percent={controlState.playPercent} showInfo={false} strokeWidth={15} width={24}/></div>
                            <div className={style.volumeControl}>
                                <b className={controlState.volPercent>0?style.volumeOn:style.volumeOff} onClick={toggleVol}/>
                                <div className={style.volSliderWrap}><Slider className={style.volSlider} value={controlState.volPercent} vertical={false} onChange={onVolChange}/></div>
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