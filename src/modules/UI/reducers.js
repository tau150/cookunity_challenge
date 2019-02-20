import * as types from '../../constants/actionTypes';

const initialState = {
  modal: false,
  clickedDay: null
};

export default {
  uiReducer: (state = initialState, action) => {
    switch (action.type) {
      case types.TOGGLE_MODAL:
        return {
          ...state,
          modal: !state.modal,
          clickedDay: action.payload.clickedDay
        };

      default:
        return state;
    }
  }
};
