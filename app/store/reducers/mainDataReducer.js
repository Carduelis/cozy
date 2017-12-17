import { combineReducers } from 'redux';
import bandsReducer from './bandsReducer';
import navigationReducer from './navigationReducer';

export default combineReducers({
	bands: bandsReducer,
	navigation: navigationReducer
});
