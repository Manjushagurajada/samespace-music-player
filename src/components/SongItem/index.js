import './index.css'

const SongItem = props => {
  const {songDetails, onClickSong, isActive} = props
  const {cover, name, artist} = songDetails
  const img = `https://cms.samespace.com/assets/${cover}`
  const clickSong = () => {
    onClickSong(songDetails)
  }
  const activeSong = isActive ? 'selected' : ''
  return (
    <li className={`song-list-item ${activeSong}`} onClick={clickSong}>
      <img src={img} alt="cover" className="cover-pic" />
      <div>
        <p className="name">{name}</p>
        <p className="artist">{artist}</p>
      </div>
    </li>
  )
}

export default SongItem
