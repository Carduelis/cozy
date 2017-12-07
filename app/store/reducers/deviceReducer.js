import { ACCELERATION } from '../../constants/action-types';

const initialState = {};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case ACCELERATION: {
			return Object.assign({}, state, {
				acceleration: payload
			});
		}
		default:
			return state;
	}
}
