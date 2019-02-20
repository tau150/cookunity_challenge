import React from 'react';
import { connect } from 'react-redux';
import uniqid from 'uniqid';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { addEvent, editEventAndDispatchModal } from '../actions';
import { toggleModalAndCleanForm } from '../../UI/actions';
import { getCurrentMonth } from './../../../helpers';
import { rangeDateForInput } from '../../../helpers';

class EventForm extends React.Component {
  state = {
    eventId: this.props.eventId,
    clickedDay: this.props.clickedDay,
    eventTitle: this.props.eventTitle,
    eventColor: this.props.eventColor,
    eventDate: this.props.eventId
      ? this.props.eventDate
      : `${new Date().getFullYear()}-${getCurrentMonth()}-${
          this.props.clickedDay
        }`,
    eventTime: this.props.eventTime
  };

  handleChangeInput = (e, input) => {
    if (input === 'event') {
      this.setState({ eventTitle: e.target.value });
    }

    if (input === 'eventColor') {
      this.setState({ eventColor: e.target.value });
    }

    if (input === 'eventDate') {
      this.setState({ eventDate: e.target.value });
    }

    if (input === 'eventTime') {
      this.setState({ eventTime: e.target.value });
    }
  };

  handleSubmitEvent = () => {
    let event;

    if (this.state.eventId) {
      event = {
        eventId: this.state.eventId,
        eventTitle: this.state.eventTitle,
        eventColor: this.state.eventColor,
        eventDate: this.state.eventDate,
        eventTime: this.state.eventTime
      };

      this.props.editEventAndDispatchModal(event);
      this.props.toggleModalAndCleanForm();
    } else {
      event = {
        eventId: uniqid(),
        eventTitle: this.state.eventTitle,
        eventColor: this.state.eventColor,
        eventDate: this.state.eventDate,
        eventTime: this.state.eventTime
      };

      this.props.addEvent(event);
    }

    this.props.toggleModalAndCleanForm();
  };

  render() {
    return (
      <div>
        <FormGroup>
          <Label for="exampleEmail">Event Name</Label>
          <Input
            onChange={e => this.handleChangeInput(e, 'event')}
            type="text"
            value={this.state.eventTitle}
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
            min={rangeDateForInput('min')}
            max={rangeDateForInput('max')}
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
        </FormGroup>
        <div className="d-flex justify-content-center">
          <Button
            className="mr-2"
            color="info"
            onClick={this.handleSubmitEvent}
            disabled={this.state.eventTitle.length > 0 ? false : true}
          >
            {this.state.eventId ? 'Edit Event' : 'Add Event'}
          </Button>
          <Button
            className="ml-2"
            color="secondary"
            onClick={this.props.toggleModalAndCleanForm}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addEvent, editEventAndDispatchModal, toggleModalAndCleanForm }
)(EventForm);
