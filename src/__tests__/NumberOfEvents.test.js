import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents Componenet />', () => {
  let NumberWrapper;

  beforeAll(() => {
    NumberWrapper = shallow(<NumberOfEvents updateNumber={() => {}} />);
  });

  test('render input element', () => {
    expect(NumberWrapper.find('.number-input')).toHaveLength(1);
  });

  test('render number input', () => {
    let query = NumberWrapper.state('query');
    expect(NumberWrapper.find('.number-input').prop('value')).toEqual(query);
  });

  test('change state upon number input', () => {
    NumberWrapper.setState({ query: 10 });
    NumberWrapper.find('.number-input').simulate('change', {
      target: { value: 20 },
    });
    expect(NumberWrapper.state('query')).toEqual(20);
  });
});
