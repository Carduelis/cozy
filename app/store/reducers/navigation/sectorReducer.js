import { ADD_SECTOR } from '../../../constants/action-types';

const numbers = new Array(10).fill(1).map((item, i) => i);
const initialState = ['A', 'B', 'C', 'D', 'E', 'F'].reduce((acc, L) => {
  numbers.forEach(num => {
    const id = `${L}${num}`;
    acc[id] = { // eslint-disable-line no-param-reassign
      id,
      number: num,
      litera: L
    };
  });
  return acc;
}, {});
export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case ADD_SECTOR: {
			return Object.assign({}, state, {
				[payload.id]: payload
			});
		}
		default:
			return state;
	}
}
