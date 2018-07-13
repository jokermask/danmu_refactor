/**
 * Created by 天俊sama on 2018/7/9.
 */
import VideoBlock from '../components/VideoBlock'
import { connect } from 'react-redux'
import { fetchVideos } from '../reducers/videoInfoReducer'
import React, { Component } from 'react'

const videoListStyle = {
    display: 'flex',
    justifyContent: 'center',
    width: '992px',
    margin: '0 auto'
}

class VideoList extends Component{

    componentDidMount(){
        const { fetchVideos } = this.props
        fetchVideos()
    }
    render(){
        const { videolist } = this.props
        return (
            <div style={videoListStyle}>
                {videolist.map(video =>
                    <VideoBlock key={video._id} videoInfo={video}/>
                )}
            </div>)
    }
}

const mapStateToProps = state => ({
    videolist:state.videoReducer.videolist
})

function mapDispatchToProps(dispatch) {
    return {
        fetchVideos: () => {
            dispatch(fetchVideos())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoList)