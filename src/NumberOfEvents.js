import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = { query: 32, errorText: '' };

  handleInputChange = (event) => {
    let input = event.target.value;
    this.setState({ query: input });
    let numberInput = Number(input);

    if (input === '') {
      this.setState({ errorText: '' });
    } else if (Number.isInteger(numberInput) && numberInput >= 0) {
      this.setState({ errorText: '' });
      this.props.updateNumber(numberInput);
    } else {
      this.setState({ errorText: 'Please enter a positive integer.' });
    }
  };

  render() {
    return (
      <div className="number-of-events">
        <ErrorAlert text={this.state.errorText} />
        <label htmlFor="number-input">Number of Events</label>
        <input
          type="text"
          id="number-input"
          className="number-input"
          value={this.state.query}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
