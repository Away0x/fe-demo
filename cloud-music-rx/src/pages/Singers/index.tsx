import React, { useCallback } from 'react';
import { RouteConfigComponentProps } from 'aw-react-router-helper';

import { useSingersState, singersStore } from '@/stores';

import Singers from './Singers';

function SingersContainer({
  renderRoutes,
}: RouteConfigComponentProps) {
  const {
    category,
    alpha,
    singerList,
    enterLoading,
    pullUpLoading,
    pullDownLoading,
  } = useSingersState();

  /** 更新歌手分类 */
  const updateCategory = useCallback((category: string) => {
    singersStore.commit(state => state.category = category);
    singersStore.getSingerList();
  }, []);

  /** 更新字母 */
  const updateAlpha = useCallback((alpha: string) => {
    singersStore.commit(state => state.alpha = alpha);
    singersStore.getSingerList();
  }, []);

  /** 滑到最底部刷新部分的处理 */
  const pullUpRefresh = useCallback(() => {
    singersStore.commit(state => state.pullUpLoading = true);

    if (singersStore.state.category === '') {
      singersStore.refreshMoreHotSingerList(); // 加载热门
    } else {
      singersStore.refreshMoreSingerList();
    }
  }, []);

  /** 顶部下拉刷新 */
  const pullDownRefresh = useCallback(() => {
    singersStore.commit(state => {
      state.pullDownLoading = true;
      state.listOffset = 0;
    });

    if (singersStore.state.category === '' && singersStore.state.alpha === '') {
      singersStore.getHotSingerList();
    } else {
      singersStore.getSingerList();
    }
  }, []);

  return (
    <Singers
      category={category}
      alpha={alpha}
      singerList={singerList}
      updateCategory={updateCategory}
      updateAlpha={updateAlpha}
      enterLoading={enterLoading}
      pullUpLoading={pullUpLoading}
      pullDownLoading={pullDownLoading}
      pullUpRefresh={pullUpRefresh}
      pullDownRefresh={pullDownRefresh}
      renderRoutes={renderRoutes} />
  );
}

export default React.memo(SingersContainer);