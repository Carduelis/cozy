import React, { Component } from 'react';

class Page extends Component {
	render() {
		const { children, name } = this.props;
		const customClassName = name ? ` page-${name}` : '';
		const className = `page${customClassName}`;
		return (
			<div className={className}>
				{children}
			</div>
		);
	}
}

export default Page;
