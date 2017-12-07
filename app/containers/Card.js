import React, { Component } from 'react';
class Place extends Component {
	render() {
		const { children } = this.props;
		return (
			<div className="card">
				{children}
			</div>
		);
	}
}

export default Place;
