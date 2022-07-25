import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import App from '../App';
import { calendarEventList } from '../mock-data';

const feature = loadFeature('./src/features/changeNumberOfEventsShown.feature');

defineFeature(feature, (test) => {
  test('32 events are shown by default.', ({ given, when, then }) => {
    let AppWrapper;
    given('a list of events is shown,', () => {
      AppWrapper = mount(<App />);
      AppWrapper.setState({ events: calendarEventList });
    });

    when("the user hasn't changed anything,", () => {});

    then('at most 32 events will be displayed at once.', () => {
      expect(AppWrapper.state('numberOfEvents')).toEqual(32);
      expect(AppWrapper.find('.EventList').length).toBeLessThan(33);
    });
  });

  test('The user can change the number of events shown.', ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    const eventNumber = 2;

    given('a list of events is shown,', () => {
      AppWrapper = mount(<App />);
      AppWrapper.setState({ events: calendarEventList });
    });

    when(
      'the user changes the number in a field specifying the number of events shown,',
      () => {
        AppWrapper.find('.number-input').simulate('change', {
          target: { value: eventNumber },
        });
      }
    );

    then('up to the new number of events will be shown at once.', () => {
      expect(AppWrapper.state('numberOfEvents')).toEqual(eventNumber);
      expect(AppWrapper.find('.EventList li').length).toBeLessThanOrEqual(
        eventNumber
      );
    });
  });
});
