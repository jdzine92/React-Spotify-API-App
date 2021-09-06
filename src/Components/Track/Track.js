import React from 'react';
import './Track.css';

class Track extends React.Component {
	constructor(props) {
		super(props)

		//bind track using the addTrack and removeTrack methods below
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);

	}

	//displays + if track can be added, - if it can be removed, using isRemoval 
	renderAction() {
		if (this.props.isRemoval) {
			return <button className="Track-action" onClick={this.removeTrack}>-</button>
		} else {
			return <button className="Track-action" onClick={this.addTrack}>+</button>
		}
	}

	addTrack() {
		//checks if track we are adding has an id that exists
		this.props.onAdd(this.props.track);
	}

	removeTrack() {
		this.props.onRemove(this.props.track);
	}

	render() {
		return (
			<div className="Track">
			  <div className="Track-information">
			    <h3>{this.props.track.name}</h3>
			    <p>{this.props.track.artist} | {this.props.track.album}</p>
			  </div>
			  {this.renderAction()}
			</div>
		)
	}
}

export default Track;