import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addSector } from '../store/actions/navigation';
import Tile from './navigation/Tile';

class NaviPage extends Component {
	render() {
		return (
      <div className="rows">
        <div className="row">
          <Tile litera="A" number="1" />
          <Tile litera="A" number="1" />
          <Tile litera="A" number="1" />
        </div>
        <div className="row">
          <Tile litera="A" number="1" />
          <Tile litera="A" number="1" />
          <Tile litera="A" number="1" />
        </div>
        <div className="row">
          <Tile litera="A" number="1" />
          <Tile litera="A" number="1" />
          <Tile litera="A" number="1" />
        </div>
      </div>
		);
	}
}

const mapDispatchToProps = {
  addSector
};


export default connect(null, mapDispatchToProps)(NaviPage);
