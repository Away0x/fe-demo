import React, { useRef, useCallback, useEffect } from 'react';
import { forceCheck } from 'react-lazyload';
import { RoutesRenderFun } from 'aw-react-router-helper';

import Horizen from '@/components/Horizen';
import Scroll, { ScrollerHandlers } from '@/components/Scroll';
import { Loading } from '@/components/Loading';
import { categoryTypes, alphaTypes } from '@/constants';
import { singersStore } from '@/stores';

import s from './Singers.module.less';
import SingersList from './SingersList';


type SingersProps = {
  category: string;
  alpha: string;
  singerList: Resp.SingerListItem[];
  renderRoutes: RoutesRenderFun;
  enterLoading: boolean;
  pullUpLoading: boolean;
  pullDownLoading: boolean;

  updateCategory: (category: string) => void;
  updateAlpha: (alpha: string) => void;
  pullUpRefresh: () => void;
  pullDownRefresh: () => void;
}

function Singers({
  renderRoutes,

  category,
  alpha,
  singerList,
  
  enterLoading,
  pullUpLoading,
  pullDownLoading,

  updateCategory,
  updateAlpha,

  pullUpRefresh,
  pullDownRefresh,
}: SingersProps) {

  const scrollRef = useRef<ScrollerHandlers | null>(null);

  const handleUpdateCatetory = useCallback((val: Resp.HorizenItem) => {
    if (val.key === category) return;
    updateCategory(val.key);
    scrollRef.current?.refresh();
  }, [category, updateCategory]);

  const handleUpdateAlpha = useCallback((val: Resp.HorizenItem) => {
    if (val.key === alpha) return;
    updateAlpha(val.key);
    scrollRef.current?.refresh();
  }, [alpha, updateAlpha]);

  const handlePullUp = useCallback(() => {
    pullUpRefresh();
  }, [pullUpRefresh]);

  const handlePullDown = useCallback(() => {
    pullDownRefresh();
  }, [pullDownRefresh]);

  useEffect(() => {
    if (singerList.length || category || alpha) return;
    singersStore.getHotSingerList();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className={s.navContainer}>
        <Horizen list={categoryTypes}
          title={"分类(默认热门):"}
          oldVal={category}
          handleClick={handleUpdateCatetory} />
        <Horizen list={alphaTypes}
          title={"首字母:"}
          oldVal={alpha}
          handleClick={handleUpdateAlpha} />
      </div>

      <div className={s.listContainer}>
        <Scroll
          ref={scrollRef}
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          onScroll={forceCheck}>
          <div>
            <SingersList list={singerList} />
          </div>
        </Scroll>

        {enterLoading ? <div className="g-enter-loading"><Loading /></div> : null}
      </div>

      {renderRoutes()}
    </div>
  );
}

export default React.memo(Singers);
