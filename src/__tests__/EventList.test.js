import React from 'react';
import { shallow } from 'enzyme';
import EventList from '../EventList';
import Event from '../Event';
import { calendarEventList } from '../mock-data';

describe('<EventList /> Component', () => {
  test('render correct number of events', () => {
    const EventListWrapper = shallow(
      <EventList eventsToShow={calendarEventList} />
    );

    expect(EventListWrapper.find(Event)).toHaveLength(calendarEventList.length);
  });
});
