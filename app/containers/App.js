import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';
import PlacesPage from './PlacesPage';
import NotFoundPage from './NotFoundPage';

class App extends Component {
	componentWillMount() {}
	onSetSidebarOpen() {}
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={LoginPage} />
					<Route path="/places" component={PlacesPage} />
					<Route component={NotFoundPage} />
				</Switch>
			</Router>
		);
	}
}

export default App;
