import React from 'react';
import { forceCheck } from 'react-lazyload';
import { RoutesRenderFun } from 'aw-react-router-helper';

import Slider from '@/components/Slider';
import Scroll from '@/components/Scroll';
import { Loading } from '@/components/Loading';

import s from './Recommend.module.less';
import RecommendList from './RecommendList';

type RecommendProps = {
  bannerList: Resp.BannerListItem[];
  recommendList: Resp.RecommendListItem[];
  loading: boolean;
  renderRoutes: RoutesRenderFun;
};

function Recommend({
  bannerList,
  recommendList,
  loading,
  renderRoutes,
}: RecommendProps) {
  return (
    <div className={s.container}>
      <Scroll onScroll={forceCheck}>
        <div>
          <Slider list={bannerList} />
          <RecommendList recommendList={recommendList} />
        </div>
      </Scroll>

      {loading ? <div className="g-enter-loading"><Loading /></div> : null}

      {renderRoutes()}
    </div>
  );
}

export default React.memo(Recommend);

