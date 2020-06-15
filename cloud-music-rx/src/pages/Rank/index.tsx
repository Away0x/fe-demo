import React, { useEffect } from 'react';
import { RouteConfigComponentProps } from 'aw-react-router-helper';

import { useRankState, rankStore } from '@/stores';

import Rank from './Rank';

function RankContainer({
  renderRoutes,
}: RouteConfigComponentProps) {
  const { loading, rankList } = useRankState();

  useEffect(() => {
    if (rankList.length) return;
    rankStore.getRankList();
    // eslint-disable-next-line
  }, []);

  return (
    <Rank
      renderRoutes={renderRoutes}
      playList={[]}
      rankList={rankList}
      loading={loading} />
  );
}

export default React.memo(RankContainer);
