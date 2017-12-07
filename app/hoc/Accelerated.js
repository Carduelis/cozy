import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
	class Accelerated extends Component {
		constructor(props) {
			super(props);
			this.state = { dataset: {} };
		}
		componentDidMount() {
			console.log(this.props.device);
			const { acceleration } = this.props.device;
		}
		render() {
			const { acceleration } = this.props.device;
			const MULT = 1;
			const transform = `rotate3d(${acceleration[2] * MULT}, ${acceleration[1] *
				MULT},${acceleration[0] * MULT}, 10deg)`;
			const style = {
				transform
			};
			console.log(transform);
			const ref = div => (this.div = div);
			return (
				<div className="accelerated" style={style}>
					<span>
						{JSON.stringify(acceleration)}
					</span>
					<ComposedComponent {...this.props} />
				</div>
			);
		}
	}
	const mapStateToProps = state => ({
		device: state.device
	});
	return connect(mapStateToProps)(Accelerated);
}
