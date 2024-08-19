import React, {Component} from 'react'
import {MdSearch} from 'react-icons/md'
import TabItem from './components/TabItem'
import SongItem from './components/SongItem'
import './App.css'

const tabsList = [
  {
    tabId: 'for you',
    tabContent: 'For You',
  },
  {
    tabId: 'top tracks',
    tabContent: 'Top Tracks',
  },
]

class App extends Component {
  state = {
    songsList: [],
    activeTabId: tabsList[0].tabId,
    currentSong: null,
    searchInput: '',
  }

  componentDidMount() {
    this.getSongs()
  }

  getSongs = async () => {
    const response = await fetch('https://cms.samespace.com/items/songs')
    const dataObj = await response.json()

    const songs = dataObj.data.map(eachObj => ({
      id: eachObj.id,
      name: eachObj.name,
      artist: eachObj.artist,
      accent: eachObj.accent,
      topTrack: eachObj.top_track,
      url: eachObj.url,
      cover: eachObj.cover,
    }))

    this.setState({songsList: songs})
  }

  onClickButton = id => {
    this.setState({activeTabId: id})
  }

  onClickSong = song => {
    this.setState({currentSong: song}, () => {
      const audioElement = document.querySelector('audio')
      if (audioElement) {
        audioElement
          .play()
          .catch(error => console.error('Playback failed:', error)) // Catching any play errors
      }
    })
  }

  onChangesearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {songsList, activeTabId, currentSong, searchInput} = this.state
    const filteredSongs = songsList.filter(
      eachItem => eachItem.topTrack === true,
    )
    const cover = currentSong?.cover || ''
    const url = currentSong?.url || ''
    const coverUrl = `https://cms.samespace.com/assets/${cover}`
    const name = currentSong?.name || ''
    const artist = currentSong?.artist || ''
    const accent = currentSong?.accent || '#331E00'
    console.log(url)
    const searchedSong = songsList.filter(eachItem =>
      eachItem.name.toLowerCase().includes(searchInput),
    )
    return (
      <div className="main-container" style={{backgroundColor: accent}}>
        <div className="side-bar">
          <img
            src="https://res.cloudinary.com/dxdudfsit/image/upload/v1723875886/Vector_gvuyw5.png"
            alt="spotify-logo"
          />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <img
            src="https://res.cloudinary.com/dxdudfsit/image/upload/v1723876004/Profile_l8s5tf.png"
            alt="profile"
          />
        </div>
        <div className="playlist-container">
          <ul className="unordered-list-tabs">
            {tabsList.map(eachItem => (
              <TabItem
                tabDetails={eachItem}
                key={eachItem.tabId}
                onClickButton={this.onClickButton}
                isActive={activeTabId === eachItem.tabId}
              />
            ))}
          </ul>
          <div className="search-bar-container">
            <input
              type="search"
              placeholder="Search Song, Artist"
              className="search-bar"
              onChange={this.onChangesearchInput}
              value={searchInput}
            />
            <MdSearch className="search-path" />
          </div>
          <ul className="songs-unordered-list">
            {activeTabId === 'for you'
              ? searchedSong.map(eachItem => (
                  <SongItem
                    songDetails={eachItem}
                    key={eachItem.id}
                    onClickSong={this.onClickSong}
                    isActive={eachItem === currentSong}
                  />
                ))
              : filteredSongs.map(eachItem => (
                  <SongItem
                    songDetails={eachItem}
                    key={eachItem.id}
                    onClickSong={this.onClickSong}
                    isActive={eachItem === currentSong}
                  />
                ))}
          </ul>
        </div>
        {currentSong && (
          <div className="player-container">
            <h3>{name}</h3>
            <p className="song-artist">{artist}</p>
            <img
              src={coverUrl}
              alt={currentSong.name}
              className="current-song-cover"
            />
            <br /> <br /> <br />
            <audio controls key={url}>
              <source src={url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    )
  }
}

export default App
