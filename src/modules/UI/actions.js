import * as types from '../../constants/actionTypes';
import { initialEvent } from '../calendar/actions';
export const toggleModal = clickedDay => {
  return {
    type: types.TOGGLE_MODAL,
    payload: {
      clickedDay
    }
  };
};

export const toggleModalAndCleanForm = clickedDay => {
  return dispatch => {
    if (!clickedDay) {
      dispatch(initialEvent());
    }
    dispatch(toggleModal(clickedDay));
  };
};
