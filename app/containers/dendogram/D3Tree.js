import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Updater from './Updater';

export default class D3Tree extends Component {
	componentDidMount() {
		const mountNode = findDOMNode(this);
		const { options, treeData, couplings } = this.props;
		this.tree = new Updater(mountNode, treeData, couplings, options);
	}
	shouldComponentUpdate(/*nextProps, nextState*/) {
		// const mountNode = findDOMNode(this);
		// const { options, treeData, couplings } = this.props;
		// this.tree
		return false;
	}
	render() {
		return <svg />;
	}
}
