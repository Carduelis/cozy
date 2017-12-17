import { combineReducers } from 'redux';
import sectors from './navigation/sectorReducer';
import position from './navigation/userPositionReducer';

export default combineReducers({
	sectors,
  position
});
