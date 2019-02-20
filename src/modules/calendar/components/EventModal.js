import React from 'react';
import { addEvent, getEvents } from './../actions';
import { toggleModal } from '../../UI/actions';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import EventForm from './EventForm';

class EventModal extends React.Component {
  // state = this.props.eventToEdit
  //   ? {
  //       event: this.props.event,
  //       eventColor: this.props.eventColor,
  //       eventDate: this.props.eventDate,
  //       eventTime: this.props.eventTime
  //     }
  //   : {
  //       currentMonth: new Date(),
  //       currentYear: new Date().getFullYear(),
  //       event: '',
  //       eventColor: '#F6546A',
  //       eventDate: '',
  //       eventTime: '10:00'
  //     };

  // toggle = (e, formattedDate) => {
  //   this.setState(prevState => ({
  //     modal: !prevState.modal
  //   }));
  //     if (!this.state.modal) {
  //       let currentMonth = this.getCurrentMonth();
  //       formattedDate = this.parseFormattedDate(formattedDate);
  //       const currentDate = `${
  //         this.state.currentYear
  //       }-${currentMonth}-${formattedDate}`;
  //       this.setState({ eventDate: currentDate });
  //     }
  // };

  // state = {
  //   event: this.props.eventToEdit.event,
  //   eventColor: this.props.eventToEdit.eventColor,
  //   eventDate: this.props.eventToEdit.event,
  //   eventTime: this.props.eventToEdit.eventTime
  // };

  // handleChangeInput = (e, input) => {
  //   if (input === 'event') {
  //     this.setState({ event: e.target.value });
  //   }

  //   if (input === 'eventColor') {
  //     this.setState({ eventColor: e.target.value });
  //   }

  //   if (input === 'eventDate') {
  //     this.setState({ eventDate: e.target.value });
  //   }

  //   if (input === 'eventTime') {
  //     this.setState({ eventTime: e.target.value });
  //   }
  // };

  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>
          {this.props.eventToEdit.eventId === null ? 'Add Event' : 'Edit Event'}
        </ModalHeader>
        <ModalBody>
          {/* <FormGroup>
            <Label for="exampleEmail">Event Name</Label>
            <Input
              onChange={e => this.handleChangeInput(e, 'event')}
              type="text"
              value={this.state.eventName}
              name="event"
              id="event"
            />
          </FormGroup>
          <FormGroup>
            <Label for="eventColor">Event Color</Label>
            <Input
              onChange={e => this.handleChangeInput(e, 'eventColor')}
              type="color"
              value={this.state.eventColor}
              name="eventColor"
              id="event"
            />
          </FormGroup>
          <FormGroup>
            <Label for="eventDate">Event Date</Label>
            <Input
              onChange={e => this.handleChangeInput(e, 'eventDate')}
              type="date"
              value={this.state.eventDate}
              name="eventDate"
              id="event"
            />
          </FormGroup>
          <FormGroup>

         <Label for="eventTime">Event Time</Label>
            <Input
              onChange={e => this.handleChangeInput(e, 'eventTime')}
              type="time"
              value={this.state.eventTime}
              name="eventTime"
              id="eventTime"
            />
          </FormGroup>  */}
          <EventForm
            eventId={this.props.eventToEdit.eventId}
            clickedDay={this.props.clickedDay}
            eventTitle={this.props.eventToEdit.eventTitle}
            eventColor={this.props.eventToEdit.eventColor}
            eventDate={this.props.eventToEdit.eventDate}
            eventTime={this.props.eventToEdit.eventTime}
          />
        </ModalBody>
        <ModalFooter />
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    modal: state.uiReducer.modal,
    eventToEdit: state.eventsReducer.eventToEdit,
    clickedDay: state.uiReducer.clickedDay
  };
};

export default connect(
  mapStateToProps,
  { addEvent, getEvents, toggleModal }
)(EventModal);
