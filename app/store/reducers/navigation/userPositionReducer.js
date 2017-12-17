import { ACTIVE_SECTOR } from '../../../constants/action-types';

const initialState = {
  litera: 'B',
  number: 2
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case ACTIVE_SECTOR: {
			return Object.assign({}, state, {
				sector: payload
			});
		}
		default:
			return state;
	}
}
