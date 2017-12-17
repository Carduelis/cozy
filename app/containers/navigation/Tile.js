import React, { Component } from 'react';
import { connect } from 'react-redux';

class Tile extends Component {
	render() {
    // const { currentSector } = this.props;
		return (
      <div className="tile">
        <div className="tile-content">
          <span className="litera">
            {this.props.litera}
          </span>
          <span className="number">
            {this.props.number}
          </span>
        </div>
      </div>
		);
	}
}

const mapStateToProps = function ({ data }) {
	const { sectors, position } = data.navigation;
  return {
    sectors,
    currentSector: position
  };
};

export default connect(mapStateToProps)(Tile);
