import React from 'react'
import { Route } from 'react-router-dom'
import VideoListContainer from '../containers/VideListContainer'
import VideoRoomContainer from '../containers/VideoRoomContainer'

const Main = () => (
    <main>
        <Route exact path="/" component={VideoListContainer}/>
        <Route path="/videoRoom/:videoId" component={VideoRoomContainer}/>
    </main>
)

export default Main