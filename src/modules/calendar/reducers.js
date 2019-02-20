import * as types from '../../constants/actionTypes';

const initialState = {
  events: [],
  editEvent: false,
  // eventToEdit: null,
  currentMonth: new Date(),
  currentYear: new Date().getFullYear(),
  eventToEdit: {
    eventId: null,
    eventTitle: '',
    eventColor: '#F6546A',
    eventDate: '',
    eventTime: '10:00'
  }
};

export default {
  eventsReducer: (state = initialState, action) => {
    switch (action.type) {
      case types.GET_EVENTS:
        return { ...state, events: action.payload.events };

      case types.ADD_EVENT:
        let newEventsArray = state.events.concat(action.payload.event);
        newEventsArray
          .sort((a, b) => {
            return a.eventTime.split(':')[1] - b.eventTime.split(':')[1];
          })
          .sort((a, b) => {
            return a.eventTime.split(':')[0] - b.eventTime.split(':')[0];
          });

        return { ...state, events: newEventsArray };

      case types.DELETE_EVENT:
        return { ...state, events: action.payload.events };

      case types.EDIT_EVENT:
        return { ...state, eventToEdit: action.payload.event };

      case types.INITIAL_EVENT:
        return {
          ...state,
          eventToEdit: {
            eventId: null,
            eventTitle: '',
            eventColor: '#F6546A',
            eventDate: '',
            eventTime: '10:00'
          }
        };

      default:
        return state;
    }
  }
};
