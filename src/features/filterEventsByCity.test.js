import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount, shallow } from 'enzyme';
import App from '../App';
import CitySearch from '../CitySearch';
import { calendarEventList } from '../mock-data';
import { extractLocations } from '../api';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, (test) => {
  test('When user hasn’t searched for a city, show upcoming events from all cities.', ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;

    given('user hasn’t searched for any city,', () => {});

    when('the user opens the app,', () => {
      AppWrapper = mount(<App />);
    });

    then('the user should see the list of upcoming events.', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(calendarEventList.length);
    });
  });

  // updateLocation may need to be renamed

  test('User should see a list of suggestions when they search for a city.', ({
    given,
    when,
    then,
  }) => {
    let CitySearchWrapper;
    const cityName = 'London';

    given('the main page is open,', () => {
      let locations = extractLocations(calendarEventList);
      CitySearchWrapper = shallow(
        <CitySearch updateLocation={() => {}} locations={locations} />
      );
    });

    when('the user starts typing in the city textbox,', () => {
      CitySearchWrapper.find('.city').simulate('change', {
        target: { value: cityName },
      });
    });

    then(
      'the user should receive a list of cities (suggestions) that match what they’ve typed.',
      () => {
        let existsMatch = calendarEventList
          .map((event) => event.location.includes(cityName))
          .includes(true);

        expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(
          existsMatch ? 2 : 1
        );
      }
    );
  });

  test('User can select a city from the suggested list.', ({
    given,
    and,
    when,
    then,
  }) => {
    let AppWrapper;
    const cityName = 'London';

    given('user was typing “Berlin” in the city textbox,', async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.find('.city').simulate('change', {
        target: { value: cityName },
      });
    });

    and('the list of suggested cities is showing,', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.suggestions li')).toHaveLength(2);
    });

    when(
      'the user selects a city (e.g., “Berlin, Germany”) from the list,',
      () => {
        AppWrapper.find('.suggestions li').at(0).simulate('click');
      }
    );

    then(
      'their city should be changed to that city (i.e., “Berlin, Germany”),',
      () => {
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        expect(CitySearchWrapper.state('query')).toContain(cityName);
      }
    );

    and(
      'the user should receive a list of upcoming events in that city.',
      () => {
        expect(AppWrapper.find('.event')).toHaveLength(
          calendarEventList.filter((event) => event.location.includes(cityName))
            .length
        );
      }
    );
  });
});
