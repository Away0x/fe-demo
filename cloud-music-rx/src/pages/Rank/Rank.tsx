import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { RoutesRenderFun } from 'aw-react-router-helper';

import { globalStore } from '@/stores';
import Scroll from '@/components/Scroll';
import { Loading } from '@/components/Loading';

import s from './Rank.module.less';
import { filterIndex } from './utils';

function SongList(props: { list?: Resp.RankSongItem[] }) {
  if (!props.list) return null;

  return (
    <ul className={s.songList}>
      {
        props.list.map((item, index) => {
          return (
            <li key={index}>
              {index + 1}. {item.first} - {item.second}
            </li>
          )
        })
      }
    </ul>
  );
}

function RankList({
  list,
  global = false,
  enterDetail,
}: {
  list: Resp.RankListItem[];
  global?: boolean
  enterDetail: (item: Resp.RankListItem) => void;
}) {
  return (
    <ul className={s.list} style={{display: global ? 'flex' : ''}}>
      {
        list.map((item, index) => {
          const hasTracks = item.tracks && item.tracks.length;

          return (
            <li className={s.listItem} key={`${item.coverImgId}${index}`}
              style={{display: hasTracks ? 'flex' : ''}}
              onClick={_ => enterDetail(item)}>

              <div className={s.imgWrapper} style={{
                width: hasTracks ? '27vw' : '32vw',
                height: hasTracks ? '27vw' : '32vw',
              }}>
                <img src={item.coverImgUrl} alt="" />
                <div className={s.decorate}></div>
                <span className={s.updateFrequecy}>{item.updateFrequency}</span>
              </div>

              {!global ? <SongList list={item.tracks} /> : null}
            </li>
          )
        })
      }
    </ul>
  );
}

type RankProps = {
  renderRoutes: RoutesRenderFun;

  rankList: Resp.RankListItem[];
  playList: any[];
  loading: boolean;
};

function Rank({
  renderRoutes,

  playList,
  rankList,
  loading,
}: RankProps) {

  const history = useHistory();

  const globalStartIndex = filterIndex(rankList);
  const officialList = rankList.slice(0, globalStartIndex);
  const globalList = rankList.slice(globalStartIndex);
  const displayStyle = loading ? { 'display': 'none' } : { 'display': '' };

  const enterDetail = useCallback((item: Resp.RankListItem) => {
    globalStore.redirect({path: `/rank/${item.id}`})
  }, []);

  return (
    <div className={s.container} style={{bottom: playList.length > 0 ? '60px' : 0}}>
      <Scroll>
        <div>
          <h1 className={s.title} style={displayStyle}>官方榜</h1>
          <RankList list={officialList} enterDetail={enterDetail} />

          <h1 className={s.title}  style={displayStyle}>全球榜</h1>
          <RankList list={globalList} global={true} enterDetail={enterDetail} />

          {loading ? <div className="g-enter-loading"><Loading /></div> : null}
        </div>
      </Scroll>

      {renderRoutes()}
    </div>
  );
}

export default React.memo(Rank);
