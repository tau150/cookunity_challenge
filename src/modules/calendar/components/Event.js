import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { deleteEvent, editEventAndDispatchModal } from '../actions';

const StyledDiv = styled.div`
  background: ${({ color }) => color};
  border-radius: 10px;
  margin-top: 10px;
  padding: 0 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #eaeaea;

  p {
    margin: 0;
  }

  i {
    padding: 2%;
    color: #fff;
    border-radius: 10%;
    margin: 2%;
  }
`;

class Event extends React.Component {
  handleDeleteEvent = (e, eventId) => {
    e.stopPropagation();
    const events = this.props.events.filter(event => event.eventId !== eventId);
    localStorage.setItem('events', JSON.stringify(events));
    this.props.deleteEvent(events);
  };

  handleEditEvent = e => {
    e.stopPropagation();
    const event = {
      eventId: this.props.eventId,
      eventTitle: this.props.title,
      eventDate: this.props.date,
      eventTime: this.props.time,
      eventColor: this.props.color
    };

    this.props.editEventAndDispatchModal(event);
  };

  render() {
    return (
      <StyledDiv color={this.props.color} onClick={this.handleEditEvent}>
        <p>
          {this.props.time} -{' '}
          {this.props.title.length > 10
            ? this.props.title.substr(0, 10) + '...'
            : this.props.title}
        </p>
        <i
          onClick={e => this.handleDeleteEvent(e, this.props.eventId)}
          className="fa fa-window-close"
          aria-hidden="true"
        />
      </StyledDiv>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.eventsReducer.events
  };
};

export default connect(
  mapStateToProps,
  { deleteEvent, editEventAndDispatchModal }
)(Event);
