import reducer from './reducer';
import initialState from 'initialState';

describe('tripsReducer', () => {
  it('should default return the initial trips state', () => {
    expect(reducer(undefined, {})).toEqual(initialState.trips);
  });
});
