import React, { Component } from 'react';
import dateFns from 'date-fns';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2%;
  padding: 2%;
  color: #cccccc;
  justify-content: space-between;
`;
export class Header extends Component {
  render() {
    const dateFormat = 'MMMM YYYY';
    const { currentMonth } = this.props;

    return (
      <StyledDiv className="row">
        <h2> {dateFns.format(currentMonth, dateFormat)}</h2>
      </StyledDiv>
    );
  }
}

export default Header;
