import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';
import PlacesPage from './PlacesPage';
import NaviPage from './NaviPage';
import DendogramPage from './dendogram/DendogramPage';
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
					<Route path="/navi" component={NaviPage} />
					<Route path="/dendogram" component={DendogramPage} />
					<Route component={NotFoundPage} />
				</Switch>
			</Router>
		);
	}
}

export default App;
