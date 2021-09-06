import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			input: ''
		}
		this.search = this.search.bind(this);
		//handle input change
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	search() {
		//pass user search input to method
		this.props.onSearch(this.state.input);
	}

	handleInputChange(event) {
		//set user search input to value
		this.setState({ input: event.target.value });
	}
	render() {
		return (
			<div className="SearchBar">
			  <input onChange={this.handleInputChange} placeholder="Enter a song, album, or artist" />
			  <button className="SearchButton" onClick={this.search}>SEARCH</button>
			</div>
		)
	}
}

export default SearchBar;