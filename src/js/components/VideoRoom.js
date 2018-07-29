import React,{Component} from 'react'
import { Progress, Radio, Spin, Slider, message } from 'antd'
import DanmuContainer from '../containers/DanmuContainer'
import MessageBoxContainer from '../containers/MessageBoxContainer'
import style from './css/VideoRoom.css'
import danmuSettingCloseImg from '../../img/danmu-setting-close.png'
import io from 'socket.io-client'

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
        //init this.socket
        this.initSocket()
    }

    initSocket(){
        const danmuBox = this.danmuContainer.getWrappedInstance()
        const messageBox = this.messageBoxContainer.getWrappedInstance()
        const roomId = this.props.match.params.videoId
        const { controlState } = this.props


        this.socket = io.connect("http://localhost:3000",['websocket'])
        let socket = this.socket
        //加入自己所在视频的聊天房间
        socket.emit('joinRoom',roomId)

        socket.on('connect', function () {

            socket.on('message',function(danmu){
                //如果播放时间之差小于2秒才添加弹幕
                if(Math.abs(danmu.play_time-controlState.currentTime)<5){
                    danmuBox.addDanmu(danmu)
                    messageBox.addNewMessage(danmu)
                }
            })

            socket.on('disconnect',function(){
                console.log("disconnect")
            })
        })
    }

    render(){

        const {videoInfo, controlState, videoControl, checkLogin, uploadDanmu} = this.props
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

        const onInputChange = (e)=>{
            videoControl.setDanmuInput(e.target.value)
        }

        const sendDanmu = () => {
            const danmuBox = this.danmuContainer.getWrappedInstance()
            const messageBox = this.messageBoxContainer.getWrappedInstance()
            let socket = this.sockete
            var newDanmu = {
                color: controlState.danmuColor,
                content: controlState.danmuInput,
                font_type: controlState.danmuSize,
                danmu_type:controlState.danmuStyle,
                play_time: controlState.currentTime,
                video_id: videoId,
                isNew:true
            }
            checkLogin((res)=>{
                if(res.isLogin){
                    uploadDanmu(newDanmu,(danmu)=>{
                        danmuBox.addDanmu(danmu)
                        socket.emit('message',danmu);
                        messageBox.addNewMessage(danmu)
                    })
                }else{
                    message.error('登录之后才能发送弹幕')
                }
            })

        }


        return(
            <div className={style.videoLayout}>
                <div className={style.videoContainer}>
                    <DanmuContainer className={style.danmuContainer} videoId={videoId} ref={(node) => this.danmuContainer = node}>
                        {controlState.canPlayThrough?"":<div className={style.loadingIcon}><Spin size="large"/></div>}
                        <video className={style.video} id="video" src={video.path} data-id={video._id} data-author={video.author_username} preload="true"/>
                    </DanmuContainer>
                    <div className={style.videoControls}>
                        <div className={style.progressLayer}>
                            <button className={style.playBtn} title="Play" onClick={togglePlayState}><span className={controlState.isPlaying?style.playing:style.stop}/></button>
                            <div className={style.videoProgress}  ref="progressBar"><Progress percent={controlState.playPercent} showInfo={false} strokeWidth={15} width={24}/></div>
                            <div className={style.volumeControl}>
                                <b className={controlState.volPercent>0?style.volumeOn:style.volumeOff} onClick={toggleVol}/>
                                <div className={style.volSliderWrap}><Slider className={style.volSlider} value={controlState.volPercent} vertical={false} onChange={onVolChange}/></div>
                            </div>
                            <div className={controlState.isDanmuOn?style.danmuOn:style.danmuOff} title="弹幕开关"></div>
                        </div>
                        <div className={style.sendLayer}>
                            <b className={style.danmuSettingIcon} title="设置弹幕" onClick={videoControl.toggleSettingMenu}/>
                            {controlState.isSettingMenuOn ?danmuSetting:""}
                            <input className={style.danmuInput} onChange={onInputChange} type="text"/>
                            <input className={style.sendDanmuBtn} onClick={sendDanmu} type="button" value="发送弹幕"/>
                            <b className={isLike?style.videoMarked:style.videoUnmarked} title="收藏或取消"/>
                        </div>
                    </div>
                </div>
                <MessageBoxContainer ref={node=>{this.messageBoxContainer = node}}/>
            </div>
        )
    }
}

export default VideoRoom