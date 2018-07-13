import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import style from './css/VideoBlcok.css'
import playBtn from '../../img/play-btn.png'

class VideoBlock extends Component{

    render(){
        const { videoInfo } = this.props
        console.log(videoInfo)

        return(
            <div className={style.singleVideo}>
                <div className={style.videoInfo}>
                    <h3 className={style.videoTittle}>{ videoInfo.video_tittle }</h3>
                    <p className={style.author} data-author={videoInfo.author_username}>{ videoInfo.author_nickname }</p>
                </div>
                <div className={style.brief}>{ videoInfo.brief }</div>
                <img className={style.cover} src={ videoInfo.cover } alt="cover"/>
                <Link to={"/videoRoom/"+videoInfo._id}><img className={style.playBtn} src={playBtn} alt="playBtn"/></Link>
                    <div className={style.proNumber}>
                        <p>{videoInfo.pro_count}</p>
                        <b className={style.proIcon}/>
                    </div>
            </div>
        )}
}


export default VideoBlock ;