import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../CitySearch';
import { calendarEventList } from '../mock-data.js';
import { extractLocations } from '../api';

describe('<CitySearch /> Component', () => {
  let CitySearchWrapper, locations;

  beforeAll(() => {
    locations = extractLocations(calendarEventList);
    CitySearchWrapper = shallow(
      <CitySearch locations={locations} updateLocation={() => {}} />
    );
  });

  test('render imput element', () => {
    expect(CitySearchWrapper.find('.city')).toHaveLength(1);
  });

  test('render list of suggesions', () => {
    expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
  });

  test('render text input correctly', () => {
    const query = CitySearchWrapper.state('query');
    expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
  });

  test('change state according to text input', () => {
    CitySearchWrapper.setState({ query: 'Munich' });
    const eventObject = { target: { value: 'Berlin' } };
    CitySearchWrapper.find('.city').simulate('change', eventObject);
    expect(CitySearchWrapper.state('query')).toBe('Berlin');
  });

  test('render list of suggestions correctly', () => {
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(
      suggestions.length + 1
    );
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(
        suggestions[i]
      );
    }
  });

  test('suggestion list match query string when changed', () => {
    CitySearchWrapper.setState({ query: '', suggestions: [] });
    CitySearchWrapper.find('.city').simulate('change', {
      target: { value: 'Berlin' },
    });
    const query = CitySearchWrapper.state('query');
    const filteredLocations = locations.filter((location) => {
      return location.toUpperCase().startsWith(query.toUpperCase());
    });
    expect(CitySearchWrapper.state('suggestions')).toEqual(filteredLocations);
  });

  test('selecting a location should change query state', () => {
    CitySearchWrapper.setState({ query: 'Berlin' });
    const suggestions = CitySearchWrapper.state('suggestions');
    CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
    expect(CitySearchWrapper.state('query')).toBe(suggestions[0]);
  });

  test('selecting input reveals the suggestion list', () => {
    CitySearchWrapper.find('.city').simulate('focus');
    expect(CitySearchWrapper.state('showSuggestions')).toBe(true);
    expect(CitySearchWrapper.find('.suggestions').prop('style')).not.toEqual({
      display: 'none',
    });
  });

  test('selecting a suggestion should hide the suggestion list', () => {
    CitySearchWrapper.setState({ query: 'Berlin', showSuggestions: undefined });
    CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
    expect(CitySearchWrapper.state('showSuggestions')).toBe(false);
    expect(CitySearchWrapper.find('.suggestions').prop('style')).toEqual({
      display: 'none',
    });
  });
});
