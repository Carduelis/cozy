import React, { Component } from 'react';
import Card from './Card';
import Accelerated from '../hoc/Accelerated';
import ClassName from '../helpers/ClassName';

class Place extends Component {
	render() {
		const { visited, title, description } = this.props;
		const className = new ClassName('place');
		console.log(className);
		if (visited) {
			className.push('visited');
		}
		return (
			<Card>
				<div className={className.getClass()}>
					<h2>
						{title}
					</h2>
					<p>
						{description}
					</p>
				</div>
			</Card>
		);
	}
}

export default Accelerated(Place);
