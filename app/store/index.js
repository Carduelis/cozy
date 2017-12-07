// if (process.env.NODE_ENV !== 'development' || process.env.PLATFORM_ENV !== 'web') {
//   module.exports = require('./configureStore.prod');
// } else {
//   module.exports = require('./configureStore.dev');
// }

import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import debounce from 'debounce';
import { ACCELERATION } from '../constants/action-types';
import reducers from './reducers';
import defaultStore from './defaultStore';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create a store that has redux-thunk middleware enabled
const store = createStore(reducers, defaultStore, composeEnhancers(applyMiddleware(thunk)));

if (typeof window.DeviceMotionEvent !== 'undefined') {
	window.ondevicemotion = onmotion;
}

let lastExecution;
function onmotion(e) {
	const { accelerationIncludingGravity, acceleration } = e;
	const now = Date.now();
	if (now - lastExecution < 17) return;
	console.log(e);
	const data = [acceleration.x, acceleration.y, acceleration.z].map(
		item => Math.ceil(item * 1000) / 1000
	);
	store.dispatch({
		type: ACCELERATION,
		payload: data
	});
	lastExecution = now;
}
export default store;
