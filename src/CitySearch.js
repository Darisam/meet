import React, { Component } from 'react';

class CitySearch extends Component {
  state = { query: '', suggestions: [], showSuggestions: undefined };

  handleInputChange = (event) => {
    const value = event.target.value;
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    this.setState({ query: value, suggestions: suggestions });
  };

  handleItemClick = (suggestion) => {
    this.setState({ query: suggestion, showSuggestions: false });
    this.props.updateLocation(suggestion);
  };

  render() {
    return (
      <div className="CitySearch">
        {/*<label for="city"> Search for a city </label>*/}
        <input
          type="text"
          id="city"
          className="city"
          value={this.state.query}
          onChange={this.handleInputChange}
          onFocus={() => {
            this.setState({ showSuggestions: true });
          }}
        />
        <ul
          className="suggestions"
          style={this.state.showSuggestions ? {} : { display: 'none' }}
        >
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
          <li key="all" onClick={() => this.handleItemClick('all')}>
            See all cities
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;
