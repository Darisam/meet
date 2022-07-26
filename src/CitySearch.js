import React, { Component } from 'react';
import { InfoAlert } from './Alert';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    showSuggestions: undefined,
    infoText: '',
  };

  handleInputChange = (event) => {
    const value = event.target.value;
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().startsWith(value.toUpperCase());
    });
    if (suggestions.length === 0) {
      this.setState({
        query: value,
        infoText:
          'We can not find the city you are looking for. Please try another city.',
      });
    } else {
      this.setState({ query: value, suggestions: suggestions, infoText: '' });
    }
  };

  handleItemClick = (suggestion) => {
    this.setState({
      query: suggestion,
      suggestions: [],
      showSuggestions: false,
      infoText: '',
    });
    this.props.updateLocation(suggestion);
  };

  render() {
    return (
      <div className="CitySearch">
        <div className="InfoAlert">
          <InfoAlert text={this.state.infoText} />
        </div>
        <div className="searchBox">
          <label htmlFor="city"> Search for a city </label>
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
        </div>
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
