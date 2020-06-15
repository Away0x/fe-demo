import React, { useEffect } from 'react';
import { RouteConfigComponentProps } from 'aw-react-router-helper';

import { useRecommendState, recommendStore } from '@/stores';

import Recommend from './Recommend';

function RecommendContainer({
  renderRoutes,
}: RouteConfigComponentProps) {
  const { bannerList, recommendList, loading } = useRecommendState();

  useEffect(() => {
    recommendStore.initRecommendData();
  }, []);

  return (
    <Recommend
      bannerList={bannerList}
      recommendList={recommendList}
      loading={loading}
      renderRoutes={renderRoutes} />
  );
}

export default React.memo(RecommendContainer);
