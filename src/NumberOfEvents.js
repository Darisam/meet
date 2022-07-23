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
      <div>
        Number of Events
        <input
          type="number"
          className="number-input"
          value={this.state.query}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
