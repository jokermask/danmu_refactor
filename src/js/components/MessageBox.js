import React, { Component } from 'react'
import style from './css/MessageBox.css'

class MessageBox extends Component{

    //shouldComponentUpdate(nextProps,nextState){
    //    if(nextProps.messageList!=this.messageList){
    //        return true
    //    }
    //    return false
    //}
    addNewMessage = (danmu)=>{
        const { addSingleMessage } = this.props
        console.log(danmu)
        const newMsg = {
            nickname:danmu.replier_nickname,
            content:danmu.content,
            id:danmu._id
        }
        addSingleMessage(newMsg)
    }

    render(){
        const { messageList } = this.props
        console.log(messageList)
        var myDate = new Date()
        var hours = myDate.getHours()
        var minutes = myDate.getMinutes()
        if(minutes<10){
            minutes = "0"+minutes
        }
        var timeNow = "("+hours + ":" + minutes +")"

        return(
            <div className={style.messagesBox}>
                <p className={style.messagesBoxTitle}>即时信息</p>
                <div className={style.messagesBoxContent}>
                    <ul className={style.messagesList}>
                        {
                            messageList.map(item=>{
                                return (
                                    <li key={item.id}><b className={style.messagesAuthor}>{timeNow+item.nickname+": "}</b>{item.content}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default MessageBox