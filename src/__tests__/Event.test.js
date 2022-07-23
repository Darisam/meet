import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { calendarEvent } from '../mock-data';

describe('<Event /> Component', () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event event={calendarEvent} />);
  });

  test('render event', () => {
    expect(EventWrapper.find('.event')).toHaveLength(1);
  });

  test('render event heading', () => {
    expect(EventWrapper.find('.event h2')).toHaveLength(1);
  });
  test('insert event summary into header element', () => {
    expect(EventWrapper.find('.event h2').text()).toBe(calendarEvent.summary);
  });

  test('render start time of the event', () => {
    expect(EventWrapper.find('.startTime')).toHaveLength(1);
  });
  test('insert correct start time into startTime element', () => {
    expect(EventWrapper.find('.startTime').text()).toBe(
      calendarEvent.start.dateTime
    );
  });

  test('render location of the event', () => {
    expect(EventWrapper.find('.event .location')).toHaveLength(1);
  });
  test('insert correct location into location element', () => {
    expect(EventWrapper.find('.event .location').text()).toBe(
      calendarEvent.location
    );
  });

  /* The following six test check whether the proper details are displayed, provided areDetailsHidden is false. */
  test('render details about the event', () => {
    EventWrapper.setState({ areDetailsHidden: false });
    expect(EventWrapper.find('.details')).toHaveLength(1);
  });

  test('render header for detail element', () => {
    EventWrapper.setState({ areDetailsHidden: false });
    expect(EventWrapper.find('.details h3')).toHaveLength(1);
  });

  test('render description of the event', () => {
    EventWrapper.setState({ areDetailsHidden: false });
    expect(EventWrapper.find('.details .description')).toHaveLength(1);
  });
  test('insert correct description into description element', () => {
    EventWrapper.setState({ areDetailsHidden: false });
    expect(EventWrapper.find('.details .description').text()).toBe(
      calendarEvent.description
    );
  });

  test('render link to more information on the event', () => {
    EventWrapper.setState({ areDetailsHidden: false });
    expect(EventWrapper.find('.details a')).toHaveLength(1);
  });
  test('insert correct URL into link element', () => {
    EventWrapper.setState({ areDetailsHidden: false });
    expect(EventWrapper.find('.details a').prop('href')).toBe(
      calendarEvent.htmlLink
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
  test('hide details if state says they are hidden', () => {
    EventWrapper.setState({ areDetailsHidden: true });
    expect(EventWrapper.find('.details')).toHaveLength(0);
  });
});
