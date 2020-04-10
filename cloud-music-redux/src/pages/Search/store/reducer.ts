import * as actionTypes from './action-types';
import { SearchState, SearchActions } from './types';

const defaultState: SearchState = {
  hotList: [],
  suggestList: {},
  songsList: [],
  enterLoading: false
};

export default (state = defaultState, action: SearchActions): SearchState => {
  switch (action.type) {
    case actionTypes.SET_HOT_KEYWRODS:
      return { ...state, hotList: action.payload };
    case actionTypes.SET_SUGGEST_LIST:
      return { ...state, suggestList: action.payload };
    case actionTypes.SET_RESULT_SONGS_LIST:
      return { ...state, songsList: action.payload };
    case actionTypes.SET_ENTER_LOADING:
      return { ...state, enterLoading: action.payload };
    default:
      return state;
  }
}
