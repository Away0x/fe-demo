import * as actionTypes from './action-types';
import { RecommendState, RecommendActions } from './types';

const defaultState: RecommendState = {
  bannerList: [],
  recommendList: [],
  enterLoading: true,
};

export default (state: RecommendState = defaultState, action: RecommendActions): RecommendState => {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      return { ...state, bannerList: action.payload }
    case actionTypes.CHANGE_RECOMMEND_LIST:
      return { ...state, recommendList: action.payload }
    case actionTypes.CHANGE_ENTER_LOADING:
      return { ...state, enterLoading: action.payload }
    default:
      return state;
  }
};
