import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = { query: 32 };

  handleInputChange = (event) => {
    let input = event.target.value;
    this.setState({ query: input });
    this.props.updateNumber(input);
  };

  render() {
    return (
      <div className="number-of-events">
        <label for="number-input">Number of Events</label>
        <input
          type="number"
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
