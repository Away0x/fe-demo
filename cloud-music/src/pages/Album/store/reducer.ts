import * as actionTypes from './action-types';
import { AlbumState, AlbumActions } from './types';

const defaultState: AlbumState = {
  currentAlbum: null,
  enterLoading: false,
};

export default (state = defaultState, action: AlbumActions): AlbumState => {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_ALBUM:
      return { ...state, currentAlbum: action.payload };
    case actionTypes.CHANGE_ENTER_LOADING:
      return { ...state, enterLoading: action.payload };
    default:
      return state;
  }
};
