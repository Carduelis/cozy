import React, { Component } from 'react';
import Header from './Header';
import Page from './Page';
import PlacesList from './PlacesList';

class NotFoundPage extends Component {
	render() {
		return (
			<Page name="places">
				<Header />
				<PlacesList />
			</Page>
		);
	}
}

export default NotFoundPage;
