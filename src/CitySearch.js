import React, { Component } from 'react';

class CitySearch extends Component {
  state = { query: '', suggestions: [] };

  handleInputChange = (event) => {
    const value = event.target.value;
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    this.setState({ query: value, suggestions: suggestions });
  };

  handleItemClick = (suggestion) => {
    this.setState({ query: suggestion });
  };

  render() {
    return (
      <div className="CitySearch">
        <input
          type="text"
          className="city"
          value={this.state.query}
          onChange={this.handleInputChange}
        />
        <ul className="suggestions">
          {this.state.suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => {
                this.handleItemClick(suggestion);
              }}
            >
              {suggestion}
            </li>
          ))}
          <li key="all">See all cities</li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;
