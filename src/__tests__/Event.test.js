import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { calendarEvent } from '../mock-data';
import { extractDetails } from '../api';

describe('<Event /> Component', () => {
  let EventWrapper, eventDetails;

  beforeAll(() => {
    eventDetails = extractDetails(calendarEvent);
    EventWrapper = shallow(<Event event={eventDetails} />);
  });

  test('render event', () => {
    expect(EventWrapper.find('.event')).toHaveLength(1);
  });

  test('render event heading', () => {
    expect(EventWrapper.find('.event h2')).toHaveLength(1);
  });
  test('insert event summary into header element', () => {
    expect(EventWrapper.find('.event h2').text()).toBe(eventDetails.summary);
  });

  test('render start time of the event', () => {
    expect(EventWrapper.find('.event .startTime')).toHaveLength(1);
  });
  test('insert correct start time into startTime element', () => {
    expect(EventWrapper.find('.event .startTime').text()).toBe(
      eventDetails.startTime
    );
  });

  test('render location of the event', () => {
    expect(EventWrapper.find('.event .location')).toHaveLength(1);
  });
  test('insert correct location into location element', () => {
    expect(EventWrapper.find('.event .location').text()).toBe(
      eventDetails.location
    );
  });

  test('render button to hide or show details', () => {
    expect(EventWrapper.find('.toggleDetails')).toHaveLength(1);
  });
  test('change state by clicking on button', () => {
    EventWrapper.setState({ areDetailsHidden: false });
    EventWrapper.find('.toggleDetails').simulate('click');
    expect(EventWrapper.state('areDetailsHidden')).toEqual(true);
  });
  test('hide or reveal details according to state', () => {
    EventWrapper.setState({ areDetailsHidden: true });
    expect(EventWrapper.find('.details').hasClass('hidden')).toEqual(true);
  });

  test('render details about the event', () => {
    expect(EventWrapper.find('.details')).toHaveLength(1);
  });

  test('render header for detail element', () => {
    expect(EventWrapper.find('.details h3')).toHaveLength(1);
  });

  test('render description of the event', () => {
    expect(EventWrapper.find('.details .description')).toHaveLength(1);
  });
  test('insert correct description into description element', () => {
    expect(EventWrapper.find('.details .description').text()).toBe(
      eventDetails.description
    );
  });

  test('render link to more information on the event', () => {
    expect(EventWrapper.find('.details a')).toHaveLength(1);
  });
  test('insert correct URL into link element', () => {
    expect(EventWrapper.find('.details a').prop('href')).toBe(
      eventDetails.htmlLink
    );
  });
});
