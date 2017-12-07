import { combineReducers } from 'redux';
import uiReducer from './uiReducer';
import deviceReducer from './deviceReducer';
import mainDataReducer from './mainDataReducer';

export default combineReducers({
	data: mainDataReducer,
	ui: uiReducer,
	device: deviceReducer
});
