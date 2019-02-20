import * as types from '../../constants/actionTypes';
import { toggleModalAndCleanForm } from '../UI/actions';

export const addEvent = event => {
  const localStorageEvents = JSON.parse(localStorage.getItem('events'));

  if (localStorageEvents) {
    let newEventsArray = localStorageEvents.concat(event);
    localStorage.setItem('events', JSON.stringify(newEventsArray));
  } else {
    localStorage.setItem('events', JSON.stringify([event]));
  }

  return {
    type: types.ADD_EVENT,
    payload: {
      event
    }
  };
};

export const deleteEvent = events => {
  return {
    type: types.DELETE_EVENT,
    payload: {
      events
    }
  };
};

export const initialEvent = () => {
  return {
    type: types.INITIAL_EVENT
  };
};

export const getEvents = () => {
  const localStorageEvents = JSON.parse(localStorage.getItem('events'));
  let eventsList = localStorageEvents ? localStorageEvents : [];

  return {
    type: types.GET_EVENTS,
    payload: {
      events: eventsList
    }
  };
};

export const editEvent = event => {
  const localStorageEvents = JSON.parse(localStorage.getItem('events'));

  const editedEvents = localStorageEvents.map(eventLocal => {
    if (eventLocal.eventId === event.eventId) {
      eventLocal.eventTitle = event.eventTitle;
      eventLocal.eventColor = event.eventColor;
      eventLocal.eventDate = event.eventDate;
      eventLocal.eventTime = event.eventTime;
    }

    return eventLocal;
  });

  localStorage.setItem('events', JSON.stringify(editedEvents));

  return {
    type: types.EDIT_EVENT,
    payload: {
      event
    }
  };
};

export const editEventAndDispatchModal = event => {
  return dispatch => {
    dispatch(toggleModalAndCleanForm(null));
    dispatch(editEvent(event));
    dispatch(getEvents());
  };
};
