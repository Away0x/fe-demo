import * as actionTypes from './action-types';
import { SingerState, SingerActions } from './types';

const defaultState: SingerState = {
  artist: null,
  songsOfArtist: [],
  loading: true
};

export default (state = defaultState, action: SingerActions): SingerState => {
  switch (action.type) {
    case actionTypes.CHANGE_ARTIST:
      return { ...state, artist: action.payload };
    case actionTypes.CHANGE_SONGS_OF_ARTIST:
      return { ...state, songsOfArtist: action.payload };
    case actionTypes.CHANGE_ENTER_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}
