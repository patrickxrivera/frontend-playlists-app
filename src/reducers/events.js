import { handleActions } from 'redux-actions';

const initialState = {
  isSaved: false
};

export default handleActions(
  {
    TOGGLE_SAVE_ANIMATION: (state, action) => ({
      ...state,
      isSaved: !state.isSaved
    })
  },
  initialState
);

export const getIsSaved = (state) => state.events.isSaved;