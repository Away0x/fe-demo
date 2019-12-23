import * as actionTypes from './action-types';
import { SingersState, SingersActions } from './types';

const defaultState: SingersState = {
  singerList: [],
  enterLoading: true,
  pullUpLoading: false,
  pullDownLoading: false,
  pageCount: 0,
};

export default (state = defaultState, action: SingersActions): SingersState => {
  switch (action.type) {
    case actionTypes.CHANGE_SINGER_LIST:
      return { ...state, singerList: action.payload };
    case actionTypes.CHANGE_PAGE_COUNT:
      return { ...state, pageCount: action.payload };
    case actionTypes.CHANGE_ENTER_LOADING:
      return { ...state, enterLoading: action.payload };
    case actionTypes.CHANGE_PULLUP_LOADING:
      return { ...state, pullUpLoading: action.payload };
    case actionTypes.CHANGE_PULLDOWN_LOADING:
      return { ...state, pullDownLoading: action.payload };
    default:
      return state;
  }
}
