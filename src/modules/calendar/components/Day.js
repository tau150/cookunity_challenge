import React from 'react';
import styled from 'styled-components';
import Event from './Event';

const StyledDiv = styled.div`
  border: 0.5px solid #a6a6a7;
  width: 14.28%;
  min-height: 120px;
  position: relative;
  max-height: 120px;
  overflow-y: auto;
  cursor: pointer;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : '')};
  background: ${({ disabled }) => (disabled ? '#777' : '')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : '')};

  .numberOfDay {
    text-align: right;
    position: absolute;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    line-height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    margin-top: 5px;
    margin-right: 5px;
    padding: 12px;
    color: ${({ selected }) => (selected ? '#000' : '#fff')};
    background: ${({ selected }) => (selected ? '#ec5445' : '')};
  }

  .day-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .day-header i {
    margin-top: 5px;
    margin-left: 5px;
    color: #fff;
  }
  .events-container {
    margin-top: 30px;
    padding: 2%;
  }
`;

const Day = ({
  numberOfDay,
  events,
  handleOnClick,
  date,
  selected,
  disabled
}) => {
  const filteresEvents = events.filter(event => event.eventDate === date);

  const eventsList = filteresEvents.map(event => {
    return (
      <Event
        eventId={event.eventId}
        time={event.eventTime}
        color={event.eventColor}
        title={event.eventTitle}
        date={event.eventDate}
        handleOnClick={handleOnClick}
      />
    );
  });
  return (
    <StyledDiv
      disabled={disabled}
      selected={selected}
      onClick={e => handleOnClick(e, numberOfDay)}
    >
      <span className="numberOfDay">{numberOfDay}</span>
      <div className="events-container">{eventsList}</div>
    </StyledDiv>
  );
};

export default Day;
