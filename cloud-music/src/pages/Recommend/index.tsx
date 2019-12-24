import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forceCheck } from 'react-lazyload';
import { renderRoutes, RouteConfigComponentProps, RouteConfig } from 'react-router-config';

import { RootState } from '@/store';

import Slider from '@/components/Slider';
import Scroll from '@/components/Scroll';
import Loading from '@/components/Loading';

import { BannerListItem, RecommendListItem } from '@/interfaces';
import { getBannerList, getRecommendList } from './store/actions';

import RecommendList from './list';
import { Content } from './index.style';

interface RecommendProps {
  bannerList: BannerListItem[];
  recommendList: RecommendListItem[];
  enterLoading: boolean;
  getBannerDataDispatch: () => void;
  getRecommendListDataDispatch: () => void;
  route?: RouteConfig;
}

const Recommend: React.FC<RecommendProps> = ({
  bannerList,
  recommendList,
  enterLoading,
  getBannerDataDispatch,
  getRecommendListDataDispatch,
  route,
}) => {
  useEffect(() => {
    if (!bannerList.length) getBannerDataDispatch();
    if (!recommendList.length) getRecommendListDataDispatch();
    //eslint-disable-next-line
  }, []);

  return (
    <Content>
      <Scroll onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerList} />
          <RecommendList recommendList={recommendList} />
        </div>
      </Scroll>

      {enterLoading ? <Loading /> : null}

      {renderRoutes(route?.routes) }
    </Content>
  )
};

export default React.memo(({ route }: RouteConfigComponentProps) => {
  const dispatch = useDispatch();

  const bannerList = useSelector((state: RootState) => state.recommend.bannerList || []);
  const recommendList = useSelector((state: RootState) => state.recommend.recommendList || []);
  const enterLoading = useSelector((state: RootState) => state.recommend.enterLoading);

  const getBannerDataDispatch = useCallback(() => dispatch(getBannerList()), [dispatch]);
  const getRecommendListDataDispatch = useCallback(() => dispatch(getRecommendList()), [dispatch]);

  return <Recommend
    bannerList={bannerList}
    recommendList={recommendList}
    enterLoading={enterLoading}
    getBannerDataDispatch={getBannerDataDispatch}
    getRecommendListDataDispatch={getRecommendListDataDispatch}
    route={route} />
});
