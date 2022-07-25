import { loadFeature, defineFeature } from 'jest-cucumber';
import { shallow } from 'enzyme';

import Event from '../Event';
import { calendarEventList } from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  test('An event is collapsed by default.', ({ given, when, then }) => {
    let EventWrapper;
    given('the main page is displayed,', () => {});

    when("the user hasn't yet selected a specific event,", () => {
      EventWrapper = shallow(<Event event={calendarEventList[0]} />);
    });

    then(
      'a list of events is shown, where each event is described only briefly.',
      () => {
        expect(EventWrapper.find('.details')).toHaveLength(0);
      }
    );
  });

  test('The user can expand an event to see its details.', ({
    given,
    when,
    then,
  }) => {
    let EventWrapper;

    given('an event is diplayed,', () => {
      EventWrapper = shallow(<Event event={calendarEventList[0]} />);
    });

    when('the user clicks on the show button,', () => {
      EventWrapper.find('.toggleDetails').simulate('click');
    });

    then('the details for the event will be shown.', () => {
      expect(EventWrapper.find('.details')).toHaveLength(1);
    });
  });

  test('The user can collapse an event to hide its details.', ({
    given,
    when,
    then,
  }) => {
    let EventWrapper;

    given('that the details of an event are shown,', () => {
      EventWrapper = shallow(<Event event={calendarEventList[0]} />);
      EventWrapper.find('.toggleDetails').simulate('click');
      expect(EventWrapper.find('.details')).toHaveLength(1);
    });

    when('the user clicks on a button to hide the details,', () => {
      EventWrapper.find('.toggleDetails').simulate('click');
    });

    then('the details are hidden again.', () => {
      expect(EventWrapper.find('.details')).toHaveLength(0);
    });
  });
});
