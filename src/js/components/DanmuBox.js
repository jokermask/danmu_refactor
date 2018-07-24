import React,{Component} from 'react'
import $ from 'jquery'
import style from './css/DanmuBox.css'

class DanmuBox extends Component{

    constructor(){
        super()
        this.height = 450
        this.width = 800
        this.fontSizeArr = [16,20,24]
        this.maxFontSize = this.fontSizeArr[this.fontSizeArr.length-1]
        this.normalDanmuArr = []
        this.topDanmuArr = []
        this.bottomDanmuArr = []
        this.rowNum = parseInt(this.height/this.maxFontSize,10) //容器高度除以最大字体高度
        this.currentTime = 0
        //由于进度条的存在，会使state60ms就更新一次，但弹幕的抽取时间是1s，
        // 所以这变量来判断弹幕时间有没有变化
    }
    
    componentDidMount(){
        const { getDanmu, videoId } = this.props
        getDanmu({video_id:videoId})
    }

    componentWillReceiveProps(nextProps){
        const { danmulist, currentTime, isPlaying } = this.props
        if(isPlaying&&currentTime===this.currentTime) {
            danmulist.forEach(danmu=>{
                if(danmu.play_time === currentTime) {
                    this.addDanmu(danmu)
                }
            })
            this.currentTime++
        }
    }

    shouldComponentUpdate(nextProps,nextState){
        const { canPlayThrough } = this.props
        if(canPlayThrough){
            return false
        }
        return true
    }

    getEmptyRow(type){

        switch (type){
            case 'top':{
                for(let i=0;i<this.rowNum;i++){
                    if(this.topDanmuArr[i]!==1){
                        this.topDanmuArr[i] = 1
                        return i
                    }
                }
                for(let i=0;i<this.rowNum;i++){
                    this.topDanmuArr[i] = 0
                }
                this.topDanmuArr[0] = 1
                return 0
            }
            case 'bottom':{
                for(let i=0;i<this.rowNum;i++){
                    if(this.bottomDanmuArr[i]!==1){
                        this.bottomDanmuArr[i] = 1
                        return i
                    }
                }
                for(let i=0;i<this.rowNum;i++){
                    this.bottomDanmuArr[i] = 0
                }
                this.bottomDanmuArr[0] = 1
                return 0
            }
            default:{
                for(let i=0;i<this.rowNum;i++){
                    if(this.normalDanmuArr[i]!==1){
                        this.normalDanmuArr[i] = 1
                        return i
                    }
                }
                for(let i=0;i<this.rowNum;i++){
                    this.normalDanmuArr[i] = 0
                }
                this.normalDanmuArr[0] = 1
                return 0
            }
        }
    }

    getDanmuConfig= (danmu)=>{
        var config = {}
        switch(danmu.danmu_type){
            case 'top':
            {
                const rowIdx = this.getEmptyRow(danmu.danmu_type)
                var topDanmuArr = this.topDanmuArr
                config.css = {
                    'color': danmu.color,
                    'fontSize': this.fontSizeArr[danmu.font_size] + 'px',
                    'left': '50%',
                    'margin-left': -$("#" + danmu._id).width() / 2,
                    'top': rowIdx * this.maxFontSize + 'px'
                }
                config.ani = (danmuItem)=> {
                    danmuItem.animate({opacity: 0}, 3000, function () {
                        $(this).remove()
                        topDanmuArr[rowIdx] = 0
                    })
                }
                break
            }
            case 'bottom':{
                const rowIdx = this.getEmptyRow(danmu.danmu_type)
                var bottomDanmuArr = this.bottomDanmuArr
                config.css = {
                    'color':danmu.color,
                    'fontSize': this.fontSizeArr[danmu.font_size]+'px',
                    'left': '50%',
                    'margin-left': -$("#" + danmu._id).width() / 2,
                    'bottom': rowIdx*this.maxFontSize + 'px'
                }
                config.ani = (danmuItem)=> {
                    danmuItem.animate({opacity: 0}, 3000, function () {
                        $(this).remove()
                        bottomDanmuArr[rowIdx] = 0
                    })
                }
                break
            }
            default:{//正常弹幕
                const rowIdx = this.getEmptyRow(danmu.danmu_type)
                var normalDanmuArr = this.normalDanmuArr
                config.css = {
                    'color':danmu.color,
                    'fontSize': this.fontSizeArr[danmu.font_size]+'px',
                    'top': rowIdx*this.maxFontSize + 'px',
                    'left':'100%'
                }
                config.ani = (danmuItem)=> {
                    danmuItem.animate({left: -$("#"+danmu._id).width()}, 3000, function () {
                        $(this).remove()
                        normalDanmuArr[rowIdx] = 0
                    })
                }
                break
            }
        }
        return config
    }

    addDanmu = (danmu)=>{
        const danmuItem = $("<span class='singleDanmu'></span>")
        const container = $(".danmuContainer")
        const danmuConfig = this.getDanmuConfig(danmu)
        const danmuCss = danmuConfig.css
        const danmuAni = danmuConfig.ani
        danmuItem.text(danmu.content)
        danmuItem.attr('id',danmu._id)
        danmuItem.css(danmuCss)
        if(danmu.isNew){//用户弹幕
            danmuItem.css("border","solid 1px red")
        }

        container.append(danmuItem)
        setTimeout(danmuAni(danmuItem),1000);
    }

    render(){
        console.log('rendered')
        return(
            <div className='danmuContainer'>
                {
                //子组件，video
                    this.props.children
                }
            </div>
        )
    }
}

export default DanmuBox