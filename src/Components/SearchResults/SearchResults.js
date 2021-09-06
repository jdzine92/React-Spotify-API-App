import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList.js';


//onAdd is for adding track results to playlist
//isRemoval is for removing a track from playlist
class SearchResults extends React.Component {
	render() {
		return (
			<div className="SearchResults">
					<h2>Results</h2>
			  <TrackList tracks={this.props.searchResults}
			  	onAdd={this.props.onAdd}
			  	isRemoval={false}
			  />
			</div>
		)
	}
}

export default SearchResults;