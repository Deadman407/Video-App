import './App.css';
import { Grid } from '@material-ui/core';
import { SearchBar, VideoDetail,VideoList } from './components'

import youtube from './api/video-app'

import React, { Component } from 'react'

export default class App extends Component {
  state = {
    videos: [],
    selectedVideo: null
  }

  componentDidMount() {
    this.handleSubmit('React js')
  }

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video })
  }

  handleSubmit = async (searchTerm) => {
    const response = await youtube.get('search', {
      params: {
        part: 'snippet',
        maxResults: 5,
        key: 'AIzaSyDTs4TgELISgt7tsUcYyvrmL05Owu1PrpQ',
        q: searchTerm
    }
  })

  this.setState({  videos: response.data.items, selectedVideo: response.data.items[0] })

    console.log(response.data.items)
  }

  render() {
    const { selectedVideo, videos } = this.state

    return (
      <Grid justifyContent='center' container spacing={12}>
        <Grid item xs={12}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <SearchBar onFormSubmit={this.handleSubmit}/>
            </Grid>
            <Grid item xs={8}>
              <VideoDetail video={selectedVideo} />
            </Grid>
            <Grid item xs={4}>
              <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}