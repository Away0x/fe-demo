import React, { useState, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useHistory } from 'react-router-dom';
import LazyLoad, { forceCheck } from 'react-lazyload';

import { globalStore } from '@/stores';
import { Loading } from '@/components/Loading';
import SearchBox from '@/components/SearchBox';
import Scroll from '@/components/Scroll';

import SingersList from '@/pages/Singers/SingersList';
import { LazyLoadContentImg } from '@/pages/Recommend/RecommendList';
import { getName } from '@/tools/utils';

import s from './Search.module.less';
import { searchStore } from './store';

const HotKeyList: React.FC<{
  list: Resp.HotKeyWordItem[];
  setQuery: (query: string) => void;
}> = React.memo(({
  list,
  setQuery,
}) => {
  return (
    <ul>
      {
        list.map(item => {
          return (
            <li className={s.hotKeyItem} key={item.first} onClick={() => setQuery(item.first)}>
              <span>{item.first}</span>
            </li>
          );
        })
      }
    </ul>
  );
});

const SongsList: React.FC<{
  list: Resp.SongListItem[];
  selectItem: (event: React.MouseEvent<HTMLLIElement, MouseEvent>, id: number) => void;
}> = React.memo(({
  list,
  selectItem,
}) => {
  return (
    <ul className={s.songList}>
      {
        list.map(item => {
          return (
            <li key={item.id} onClick={(e) => selectItem(e, item.id)}>
              <div>
                <span>{item.name}</span>
                <span>
                  {getName(item.artists || [])} - {item.album?.name}
                </span>
              </div>
            </li>
          );
        })
      }
    </ul>
  );
});

const AlbumList: React.FC<{
  list?: Resp.AlbumListItem[];
  selectItem: (id: number) => void;
}> = React.memo(({
  list,
  selectItem,
}) => {
  if (!list || !list.length) return null;

  return (
    <div className={s.albumList}>
      <h1>相关歌单</h1>
      {
        list.map((item, index) => {
          return (
            <div className={s.albumItem} key={item.id + '' + index} onClick={() => selectItem(item.id)}>
              <div className={s.imgWrapper}>
                <LazyLoad placeholder={<LazyLoadContentImg />}>
                  <LazyLoadContentImg src={item.coverImgUrl} />
                </LazyLoad>
              </div>
              <span className={s.albumName}>歌单: {item.name}</span>
            </div>
          );
        })
      }
    </div>
  );
});

type SearchProps = {
  enterLoading: boolean;
  hotList: Resp.HotKeyWordItem[];
  suggestList: Resp.SuggestData;
  songsList: Resp.SongListItem[];
};

function Search({
  enterLoading,
  hotList,
  suggestList,
  songsList,
}: SearchProps) {
  const history = useHistory();
  const [showStatus, setShowStatus] = useState(true);
  const [query, setQuery] = useState('');

  const handleBack = useCallback(() => {
    setShowStatus(false); // 触发 CSSTransition 消失动画，并通过 onExited 返回上一个页面
  }, []);

  const handleQuery = useCallback((query: string) => {
    setQuery(query);
    if (!query) return;
    searchStore.getSuggestList(query);
  }, []);

  const handleHotkeyItemSelect = useCallback((query: string) => {
    setQuery(query);
  }, []);

  const selectSongItem = useCallback((event: React.MouseEvent<HTMLLIElement, MouseEvent>, id: number) => {
    console.log(event, id);
  }, []);

  const selectAlbumItem = useCallback((id: number) => {
    globalStore.redirect({path: `/album/${id}`});
  }, [history]);

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly2"
      appear={true}
      unmountOnExit
      onExited={history.goBack}>
      <div className={s.container}>
        <SearchBox back={handleBack} newQuery={query} handleQuery={handleQuery} />

        {/* 热门搜索 */}
        <div className={s.shortCutWrapper} style={{ display: query ? 'none' : '' }}>
          <Scroll>
            <div>
              <div className={s.hotKey}>
                <h1>热门搜索</h1>
                <ul>
                  <HotKeyList list={hotList} setQuery={handleHotkeyItemSelect} />
                </ul>
              </div>
            </div>
          </Scroll>
        </div>

        {/* 搜索结果 */}
        <div className={s.shortCutWrapper} style={{ display: query ? '' : 'none' }}>
          <Scroll onScroll={forceCheck}>
            <div>
              {/* 相关歌手 */}
              <SingersList title="相关歌手" list={suggestList.artists} />
              {/* 相关歌单 */}
              <AlbumList list={suggestList.playlists} selectItem={selectAlbumItem} />
              {/* 歌曲列表 */}
              <SongsList list={songsList} selectItem={selectSongItem} />
            </div>
          </Scroll>
        </div>

        {enterLoading ? <div className="g-enter-loading"><Loading /></div> : null}
      </div>
    </CSSTransition>
  );
}

export default React.memo(Search);
