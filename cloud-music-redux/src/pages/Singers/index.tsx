import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forceCheck } from 'react-lazyload';
import { renderRoutes, RouteConfig, RouteConfigComponentProps } from 'react-router-config';

import Horizen from '@/components/Horizen';
import Scroll from '@/components/Scroll';
import Loading from '@/components/Loading';
import { categoryTypes, alphaTypes } from '@/constants';
import { RootState } from '@/store';
import {
  SingerListItem,
} from '@/interfaces';

import SinglerList from './list';
import {
  NavContainer,
  ListContainer,
} from './index.style';
import {
  getHotSingerList,
  getSingerList,
  changePageCount,
  changeEnterLoading,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList,
  refreshMoreSingerList,
} from './store/actions';

interface SingersProps {
  singerList: SingerListItem[];
  enterLoading: boolean;
  pullUpLoading: boolean;
  pullDownLoading: boolean;
  pageCount: number;

  getHotSingerDispatch: () => void;
  updateDispatch: (category: string, alpha: string) => void;
  pullUpRefreshDispatch: (category: string, alpha: string, hot: boolean, count: number) => void;
  pullDownRefreshDispatch: (category: string, alpha: string) => void;

  route?: RouteConfig;
}

const Singers: React.FC<SingersProps> = ({
  singerList,
  enterLoading,
  pullUpLoading,
  pullDownLoading,
  pageCount,

  getHotSingerDispatch,
  updateDispatch,
  pullUpRefreshDispatch,
  pullDownRefreshDispatch,

  route,
}) => {
  const [category, setCategory] = useState('');
  const [alpha, setAlpha] = useState('');

  const handleUpdateCatetory = (val: string) => {
    setCategory(val);
    updateDispatch(val, alpha);
  };
  const handleUpdateAlpha = (val: string) => {
    setAlpha(val);
    updateDispatch(category, val);
  };
  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === '', pageCount);
  };
  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha);
  };

  useEffect(() => {
    if (!singerList.length) {
      getHotSingerDispatch();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <NavContainer>
        <Horizen list={categoryTypes}
          title={"分类(默认热门):"}
          oldVal={category}
          handleClick={(val) => handleUpdateCatetory(val.key)} />
        <Horizen list={alphaTypes}
          title={"首字母:"}
          oldVal={alpha}
          handleClick={val => handleUpdateAlpha(val.key)} />
      </NavContainer>

      <ListContainer>
        <Scroll
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          onScroll={forceCheck}>
          <SinglerList list={singerList} />
        </Scroll>
        <Loading show={enterLoading} />
      </ListContainer>

      {renderRoutes(route?.routes)}
    </div>
  )
};

export default React.memo(({ route }: RouteConfigComponentProps) => {
  const dispatch = useDispatch();

  const singerList = useSelector(((state: RootState) => state.singers.singerList || []));
  const enterLoading = useSelector(((state: RootState) => state.singers.enterLoading || false));
  const pullUpLoading = useSelector(((state: RootState) => state.singers.pullUpLoading || false));
  const pullDownLoading = useSelector(((state: RootState) => state.singers.pullDownLoading || false));
  const pageCount = useSelector(((state: RootState) => state.singers.pageCount || 0));

  const getHotSingerDispatch = useCallback(() => dispatch(getHotSingerList()), [dispatch]);
  const updateDispatch = useCallback((category: string, alpha: string) => {
    dispatch(changePageCount(0));
    dispatch(changeEnterLoading(true));
    dispatch(getSingerList(category, alpha));
  }, [dispatch]);

  // 滑到最底部刷新部分的处理
  const pullUpRefreshDispatch = useCallback((category: string, alpha: string, hot: boolean, count: number) => {
    dispatch(changePullUpLoading(true));
    dispatch(changePageCount(count + 1));
    if (hot) {
      dispatch(refreshMoreHotSingerList());
    } else {
      dispatch(refreshMoreSingerList(category, alpha));
    }
  }, [dispatch]);

  // 顶部下拉刷新
  const pullDownRefreshDispatch = useCallback((category: string, alpha: string) => {
    dispatch(changePullDownLoading(true));
    dispatch(changePageCount(0));
    if (category === '' && alpha === '') {
      dispatch(getHotSingerList());
    } else {
      dispatch(getSingerList(category, alpha));
    }
  }, [dispatch]);

  return <Singers
    singerList={singerList}
    enterLoading={enterLoading}
    pullUpLoading={pullUpLoading}
    pullDownLoading={pullDownLoading}
    pageCount={pageCount}
    getHotSingerDispatch={getHotSingerDispatch}
    updateDispatch={updateDispatch}
    pullUpRefreshDispatch={pullUpRefreshDispatch}
    pullDownRefreshDispatch={pullDownRefreshDispatch}
    route={route} />
});
