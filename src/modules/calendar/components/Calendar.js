import React from 'react';
import dateFns from 'date-fns';
import { connect } from 'react-redux';
import Header from './Header';
import Day from './Day';
import styled from 'styled-components';
import { addEvent, getEvents } from './../actions';
import { toggleModalAndCleanForm } from '../../UI/actions';
import EventModal from './EventModal';
import { parseFormattedDate, getCurrentMonth } from '../../../helpers';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    currentYear: new Date().getFullYear(),
    selectedDate: new Date()
  };

  componentDidMount() {
    this.props.getEvents();
  }

  toggle = (e, formattedDate) => {
    let day;
    if (formattedDate) {
      day = parseFormattedDate(formattedDate);
    } else {
      day = null;
    }

    this.props.toggleModalAndCleanForm(day);
  };

  renderDays() {
    const dateFormat = 'dddd';
    const days = [];
    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col text-right" key={i}>
          {dateFns
            .format(dateFns.addDays(startDate, i), dateFormat)
            .substr(0, 3)}
        </div>
      );
    }
    return <div className="row">{days}</div>;
  }

  renderDaysCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);

    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = 'D';
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        days.push(
          <Day
            key={i}
            disabled={!dateFns.isSameMonth(day, monthStart) ? true : false}
            selected={dateFns.isSameDay(day, selectedDate) ? true : false}
            numberOfDay={formattedDate}
            events={this.props.events.filter(event => {
              return (
                event.eventDate ===
                `${
                  this.state.currentYear
                }-${getCurrentMonth()}-${parseFormattedDate(formattedDate)}`
              );
            })}
            handleOnClick={this.toggle}
          />
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <StyledDiv className="row" key={day}>
          {days}
        </StyledDiv>
      );
      days = [];
    }

    return rows;
  }

  render() {
    if (!this.props.events) return null;

    return (
      <main className="container-fluid">
        <Header currentMonth={this.state.currentMonth} />
        {this.renderDays()}
        {this.renderDaysCells()}

        <EventModal toggle={this.toggle} />
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.eventsReducer.events,
    eventToEdit: state.eventsReducer.eventToEdit
  };
};
export default connect(
  mapStateToProps,
  { addEvent, getEvents, toggleModalAndCleanForm }
)(Calendar);
