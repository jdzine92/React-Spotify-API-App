import React from 'react';
import './App.css';
import Playlist from '../Playlist/Playlist.js';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Spotify from '../../util/spotify.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    //empty arrays for search results
    this.state = {
      searchResults: [],
      playlistName: '',
      playlistTracks: []
    };

    //bind various methods defined below
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  //functions to ADD or REMOVE tracks from playlist
  addTrack(track) {
    let tracks = this.state.playlistTracks;
    //if selected track (savedTrack.id) is already in array (track.id) , return nothing
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    //else push the track to playlist, then set playlist state 
    tracks.push(track);
    this.setState({playlistTracks: tracks});

  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    //if current track (tracks) is not equal to tracks in array (track.id), allow removal
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id)

    //set state 
    this.setState({playlistTracks: tracks});
  }

  //function to update playlist name
  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    //get track uri
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    //from spotify module
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(input) {
    //from spotify module, set state as the returned promise
    Spotify.search(input).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

  render() {
    return (
      <div>
        <div className="App-header">
        <h1>Jordans Ja<span className="highlight">mmm</span>ing App</h1>
        </div>
        <div className="App">
          <SearchBar
            onSearch={this.search}
          />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
              />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
             />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
