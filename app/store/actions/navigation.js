import {
  ADD_SECTOR
} from '../../constants/action-types';


export function addSector(payload) {
  return {
    type: ADD_SECTOR,
    payload
  };
}
