import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { extractLocations, getEvents } from '../api';

describe('<App /> component', () => {
  let AppWrapper;

  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('render component determining the number of events shown', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

describe('<App /> integration', () => {
  test('App passes the events to show as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const eventList = AppWrapper.instance().eventsToShow();
    expect(AppWrapper.find(EventList).props().eventsToShow).toEqual(eventList);
    AppWrapper.unmount();
  });

  test('App passes location state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppEventState = AppWrapper.state('events');
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(
      extractLocations(AppEventState)
    );
    AppWrapper.unmount();
  });

  test('get location to be shown from CitySearch', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const allEvents = await getEvents();
    const locations = extractLocations(allEvents);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * suggestions.length);
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClick(selectedCity);
    expect(AppWrapper.state('location')).toEqual(selectedCity);
    AppWrapper.unmount();
  });

  test('get list of all events when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    await suggestionItems.at(suggestionItems.length - 1).simulate('click');
    const allEvents = await getEvents();
    expect(AppWrapper.state('events')).toEqual(allEvents);
    AppWrapper.unmount();
  });

  test('get number of events to be shown from NOE component', () => {
    const AppWrapper = mount(<App />);
    AppWrapper.find(NumberOfEvents)
      .find('.number-input')
      .simulate('change', { target: { value: 20 } });
    const numberInput = AppWrapper.find(NumberOfEvents).state('query');
    expect(AppWrapper.state('numberOfEvents')).toEqual(numberInput);
    AppWrapper.unmount();
  });

  test('show number of events equal or less than numberOfEvents state', async () => {
    const AppWrapper = mount(<App />);
    let eventList = await getEvents();
    AppWrapper.setState({ events: eventList, numberOfEvents: 2 });
    const stateNumber = AppWrapper.state('numberOfEvents');
    expect(AppWrapper.find(EventList).find('.EventList li')).toHaveLength(
      Math.min(stateNumber, eventList.length)
    );
    AppWrapper.unmount();
  });
});
