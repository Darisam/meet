import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = { query: 10 };

  handleInputChange = (event) => {
    let input = event.target.value;
    this.setState({ query: input });
  };

  render() {
    return (
      <div>
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
