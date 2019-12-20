import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forceCheck } from 'react-lazyload';

import { RootState } from '@/store';

import Slider from '@/components/Slider';
import Scroll from '@/components/Scroll';
import Loading from '@/components/Loading';

import { getBannerList, getRecommendList } from './store/actions';

import RecommendList from './list';
import { Content } from './index.style';

const Recommend: React.FC = () => {
  const bannerList = useSelector((state: RootState) => state.recommend.bannerList || []);
  const recommendList = useSelector((state: RootState) => state.recommend.recommendList || []);
  const enterLoading = useSelector((state: RootState) => state.recommend.enterLoading);

  const dispatch = useDispatch();
  const getBannerDataDispatch = useCallback(() => dispatch(getBannerList()), [dispatch]);
  const getRecommendListDataDispatch = useCallback(() => dispatch(getRecommendList()), [dispatch]);

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
    </Content>
  )
};

export default React.memo<typeof Recommend>(Recommend);
