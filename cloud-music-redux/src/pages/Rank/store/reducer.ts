import * as actionTypes from './action-types';
import { RankState, RankActions } from './types';

const defaultState: RankState = {
  rankList: [],
  loading: true,
};

export default (state = defaultState, action: RankActions): RankState => {
  switch (action.type) {
    case actionTypes.CHANGE_RANK_LIST:
      return { ...state, rankList: action.payload };
    case actionTypes.CHANGE_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}
