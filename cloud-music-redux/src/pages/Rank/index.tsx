import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { renderRoutes, RouteConfig, RouteConfigComponentProps } from "react-router-config";

import { RankListItem } from '@/interfaces';
import { RootState } from '@/store';
import Scroll from '@/components/Scroll';
import Loading from '@/components/Loading';

import RankList from './list';
import { getRankList } from './store/actions';
import { Container, EnterLoading } from './index.style';
import { filterIndex } from './utils';

interface RankProps {
  rankList: RankListItem[];
  loading: boolean;
  getRankListDataDispatch: () => void;

  route?: RouteConfig;
}

const Rank: React.FC<RankProps> = ({
  rankList,
  loading,

  getRankListDataDispatch,

  route,
}) => {
  useEffect(() => {
    if (!rankList.length) {
      getRankListDataDispatch();
    }
    // eslint-disable-next-line
  }, []);

  const globalStartIndex = filterIndex(rankList);
  const officialList = rankList.slice(0, globalStartIndex);
  const globalList = rankList.slice(globalStartIndex);
  const displayStyle = loading ? {'display': 'none'}:  {'display': ''};

  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>官方榜</h1>
          <RankList list={officialList} />
          <h1 className="global" style={displayStyle}>全球榜</h1>
          <RankList list={globalList} global={true} />
          {loading ? <EnterLoading><Loading></Loading></EnterLoading> : null}
        </div>
      </Scroll>
      {renderRoutes(route?.routes)}
    </Container>
  )
};

export default React.memo(({ route }: RouteConfigComponentProps) => {
  const dispatch = useDispatch();

  const rankList = useSelector((state: RootState) => state.rank.rankList || []);
  const loading = useSelector((state: RootState) => state.rank.loading);

  const getRankListDataDispatch = useCallback(() => dispatch(getRankList()), [dispatch]);

  return <Rank
    rankList={rankList}
    loading={loading}
    getRankListDataDispatch={getRankListDataDispatch}
    route={route} />
});
