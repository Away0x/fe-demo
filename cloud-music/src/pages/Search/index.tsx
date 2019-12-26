import React, { useEffect, useState, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import LazyLoad, { forceCheck } from 'react-lazyload';
import { useDispatch, useSelector } from 'react-redux';

import {
  HotKeyWordItem,
  SongListItem,
} from '@/interfaces';
import { RootState } from '@/store';
import { getName } from '@/utils';
import Scroll from '@/components/Scroll';
import Loading from '@/components/Loading';

import SearchBox from './search-box';
import {
  getHotKeyWords,
  changeEnterLoading,
  getSuggestList,
} from './store/actions';
import {
  Container,
  ShortcutWrapper,
  List,
  ListItem,
  SongItem,
  HotKey,
} from './index.style';

interface SearchProps {
  hotList: HotKeyWordItem[];
  enterLoading: boolean;
  suggestList: any;
  songsList: SongListItem[];
  songsCount: number;

  getHotKeyWordsDispatch: () => void;
  changeEnterLoadingDispatch: (status: boolean) => void;
  getSuggestListDispatch: (q: string) => void;
  // getSongDetailDispatch: (id: number) => void;
}

const Search: React.FC<RouteComponentProps & SearchProps> = ({
  hotList,
  enterLoading,
  suggestList,
  songsCount,
  songsList,

  getHotKeyWordsDispatch,
  changeEnterLoadingDispatch,
  getSuggestListDispatch,
  // getSongDetailDispatch,

  history,
}) => {
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState('');
  // const musicNoteRef = useRef();

  useEffect(() => {
    setShow(true);
    if (!hotList.length) getHotKeyWordsDispatch();
    // eslint-disable-next-line
  }, []);

  const searchBack = useCallback(() => {
    setShow(false);
  }, []);

  const handleQuery = (q: string) => {
    setQuery(q);
    if (!q) return;
    changeEnterLoadingDispatch(true);
    getSuggestListDispatch(q);
  };

  const renderHotKey = () => {
    return (
      <ul>
        {
          hotList.map(item => {
            return (
              <li className="item" key={item.first} onClick={() => setQuery(item.first)}>
                <span>{item.first}</span>
              </li>
            )
          })
        }
      </ul>
    )
  };

  const renderAlbum = () => {
    let albums = suggestList.playlists;
    if (!albums || !albums.length) return;
    return (
      <List>
        <h1 className="title">相关歌单</h1>
        {
          albums.map((item: any, index: number) => {
            return (
              <ListItem key={item.accountId + "" + index} onClick={() => history.push(`/album/${item.id}`)}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('./music.png')} alt="music" />}>
                    <img src={item.coverImgUrl} width="100%" height="100%" alt="music" />
                  </LazyLoad>
                </div>
                <span className="name">歌单: {item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  };
  const renderSingers = () => {
    let singers = suggestList.artists;
    if (!singers || !singers.length) return;
    return (
      <List>
        <h1 className="title">相关歌手</h1>
        {
          singers.map((item: any, index: number) => {
            return (
              <ListItem key={item.accountId + "" + index} onClick={() => history.push(`/singers/${item.id}`)}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="singer" />}>
                    <img src={item.picUrl} width="100%" height="100%" alt="music" />
                  </LazyLoad>
                </div>
                <span className="name">歌手: {item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  };

  const renderSongs = () => {
    return (
      <SongItem style={{ paddingLeft: "20px" }} >
        {
          songsList.map(item => {
            return (
              <li key={item.id} onClick={(e) => selectItem(e, item.id)}>
                <div className="info">
                  <span>{item.name}</span>
                  <span>
                    {getName(item.artists)} - {item.album.name}
                  </span>
                </div>
              </li>
            )
          })
        }
      </SongItem>
    )
  };

  const selectItem = (e: any, id: number) => {
    // getSongDetailDispatch(id);
    console.log(e);
    // musicNoteRef.current.startAnimation({ x: e.nativeEvent.clientX, y: e.nativeEvent.clientY });
  }
  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames="fly"
      unmountOnExit
      onExited={() => history.goBack()}>
      <Container play={songsCount}>
        <div className="search_box_wrapper">
          <SearchBox back={searchBack} newQuery={query} handleQuery={handleQuery}></SearchBox>
        </div>
        <ShortcutWrapper show={!query}>
          <Scroll>
            <div>
              <HotKey>
                <h1 className="title">热门搜索</h1>
                {renderHotKey()}
              </HotKey>
            </div>
          </Scroll>
        </ShortcutWrapper>
        <ShortcutWrapper show={!!query}>
          <Scroll onScroll={forceCheck}>
            <div>
              {renderSingers()}
              {renderAlbum()}
              {renderSongs()}
            </div>
          </Scroll>
        </ShortcutWrapper>
        {enterLoading ? <Loading /> : null}
        {/* <MusicalNote ref={musicNoteRef}></MusicalNote> */}
      </Container>
    </CSSTransition>
  );
};

export default React.memo((props: RouteComponentProps) => {
  const dispatch = useDispatch();

  const hotList = useSelector((state: RootState) => state.search.hotList);
  const suggestList = useSelector((state: RootState) => state.search.suggestList);
  const songsList = useSelector((state: RootState) => state.search.songsList);
  const enterLoading = useSelector((state: RootState) => state.search.enterLoading);

  const getHotKeyWordsDispatch = useCallback(() => dispatch(getHotKeyWords()), [dispatch]);
  const changeEnterLoadingDispatch = useCallback((status: boolean) =>
    dispatch(changeEnterLoading(status)), [dispatch]);
  const getSuggestListDispatch = useCallback((q: string) =>
    dispatch(getSuggestList(q)), [dispatch]);

  return <Search
    hotList={hotList}
    suggestList={suggestList}
    songsList={songsList}
    enterLoading={enterLoading}
    songsCount={0}
    getHotKeyWordsDispatch={getHotKeyWordsDispatch}
    changeEnterLoadingDispatch={changeEnterLoadingDispatch}
    getSuggestListDispatch={getSuggestListDispatch}
    {...props} />
});
