import React,{Component} from 'react'
import { connect } from 'react-redux'
import { Motion, spring } from 'react-motion';
import { getDanmuByVideo } from '../reducers/danmuReducer'
import style from './css/DanmuBox.css'

class DanmuBox extends Component{

    constructor(){
        super()
        this.height = 450
        this.width = 800
        this.maxFontSize = 24
        this.curDanmulist =  []
        this.normalDanmuArr = []
        this.topDanmuArr = []
        this.bottomDanmuArr = []
        this.rowNum = parseInt(this.height/this.maxFontSize) //容器高度除以最大字体高度
    }
    
    componentDidMount(){
        const { getDanmu, videoId } = this.props
        getDanmu({video_id:videoId})
    }

    getEmptyRow(type){

        switch (type){
            case 'top':{
                if(this.topDanmuArr[this.rowNum]) this.topDanmuArr = []
                this.topDanmuArr[this.topDanmuArr.length] = true
                let colNum = this.topDanmuArr.length
                return colNum
            }
            case 'bottom':{
                if(this.bottomDanmuArr[this.rowNum]) this.bottomDanmuArr = []
                this.bottomDanmuArr[this.bottomDanmuArr.length] = true
                let colNum = this.topDanmuArr.length
                return colNum
            }
            default:{
                if(this.normalDanmuArr[this.rowNum]) this.normalDanmuArr = []
                this.normalDanmuArr[this.normalDanmuArr.length] = true
                let colNum = this.topDanmuArr.length
                return colNum
            }
        }
    }

    render(){
        const { danmulist, currentTime, isPlaying } = this.props

        console.log(this.curDanmulist)
        const fontSizeArr = ['16px','20px','24px']

        const genDanmuStyle = (danmu)=>{
            switch(danmu.danmu_style){
                case 'top':{
                    const rowNum = this.getEmptyRow(danmu.danmu_style)
                    return {
                        color:danmu.color,
                        fontSize: fontSizeArr[danmu.font_size],
                        left: '50%',
                        top: rowNum*this.maxFontSize + 'px'
                    }
                }
                case 'bottom':{
                    const rowNum = this.getEmptyRow(danmu.danmu_style)
                    return {
                        color:danmu.color,
                        fontSize: fontSizeArr[danmu.font_size],
                        left: '50%',
                        bottom: rowNum*this.maxFontSize + 'px'
                    }
                }
                default:{//正常弹幕
                    const rowNum = this.getEmptyRow(danmu.danmu_style)
                    return {
                        color:danmu.color,
                        fontSize: fontSizeArr[danmu.font_size],
                        top: rowNum*this.maxFontSize + 'px'
                    }
                }
            }
        }

        const delDanmuInList = (danmu)=>{
            //this.curDanmulist.forEach((item,idx,arr)=>{
            //    if(item._id==danmu._id){
            //        arr.splice(idx,1)
            //        console.log(idx+"done!!!!!!!!!!!!!!!!!!!!!!!!!!")
            //    }
            //})

        }

        if(isPlaying) {
            this.curDanmulist = this.curDanmulist.concat(danmulist.filter(danmu=> {
                return danmu.play_time === currentTime
            }))
        }

        return(
            <div className={style.danmuContainer}>
                {
                    //添加弹幕
                    this.curDanmulist.map(danmu=>{
                        console.log(danmu.danmu_type)
                        if(danmu.danmu_type=='normal'||!danmu.danmu_type){
                            var startStyle = {
                                left:this.width
                            }
                            var endStyle = {
                                left:spring(-danmu.content.length*this.maxFontSize,{stiffness: 13, damping: 26})
                            }
                        }else{
                            var startStyle = {
                                opacity:1
                            }
                            var endStyle = {
                                opacity:spring(0,{stiffness: 10, damping: 10})
                            }
                        }

                        const danmuStyle = genDanmuStyle(danmu)

                        return (
                            <Motion key={danmu._id}  defaultStyle={startStyle} style={endStyle} onRest={delDanmuInList(danmu)}>
                                {interpolatingStyle => <p  ref={danmu._id} className={style.singleDanmu} style={{...interpolatingStyle,...danmuStyle}} >
                                    {danmu.content}
                                </p>}
                            </Motion>
                        )
                    })
                }
                {//子组件，video
                    this.props.children
                }
            </div>
        )
    }
}

export default DanmuBox