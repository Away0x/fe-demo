import React, { useState, useRef, useEffect, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@/store';
import { AlbumListItem } from '@/interfaces';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import Scroll from '@/components/Scroll';
import { getCount, isEmptyObject, getName } from '@/utils';
import helpers from '@/assets/style/helpers';
import { HEADER_HEIGHT } from '@/constants';

import {
  Container,
  Menu,
  TopDesc,
  SongList,
  SongItem,
} from './index.style';
import { getAlbumList } from './store/actions';

const MenuWrapper = () => {
  return (
    <Menu>
      <div>
        <i className="iconfont">&#xe6ad;</i>
        评论
        </div>
      <div>
        <i className="iconfont">&#xe86f;</i>
        点赞
        </div>
      <div>
        <i className="iconfont">&#xe62d;</i>
        收藏
        </div>
      <div>
        <i className="iconfont">&#xe606;</i>
        更多
        </div>
    </Menu>
  )
};

const TopDescWrapper = ({
  currentAlbum,
}: {
  currentAlbum: AlbumListItem,
}) => {
  return (
    <TopDesc background={currentAlbum.coverImgUrl}>
      <div className="background">
        <div className="filter"></div>
      </div>
      <div className="img_wrapper">
        <div className="decorate"></div>
        <img src={currentAlbum.coverImgUrl} alt="" />
        <div className="play_count">
          <i className="iconfont play">&#xe885;</i>
          <span className="count">{getCount(currentAlbum.subscribedCount)}</span>
        </div>
      </div>
      <div className="desc_wrapper">
        <div className="title">{currentAlbum.name}</div>
        <div className="person">
          <div className="avatar">
            <img src={currentAlbum.creator.avatarUrl} alt="" />
          </div>
          <div className="name">{currentAlbum.creator.nickname}</div>
        </div>
      </div>
    </TopDesc>
  )
};

const SongListWrapper = ({
  currentAlbum,
}: {
  currentAlbum: AlbumListItem
}) => {
  return (
    <SongList>
      <div className="first_line">
        <div className="play_all">
          <i className="iconfont">&#xe6e3;</i>
          <span>播放全部 <span className="sum">(共{currentAlbum.tracks.length}首)</span></span>
        </div>
        <div className="add_list">
          <i className="iconfont">&#xe62d;</i>
          <span>收藏({getCount(currentAlbum.subscribedCount)})</span>
        </div>
      </div>
      <SongItem>
        {
          currentAlbum.tracks.map((item, index) => {
            return (
              <li key={index}>
                <span className="index">{index + 1}</span>
                <div className="info">
                  <span>{item.name}</span>
                  <span>
                    {getName(item.ar)} - {item.al.name}
                  </span>
                </div>
              </li>
            )
          })
        }
      </SongItem>
    </SongList>
  )
};

interface AlbumProps {
  currentAlbum: AlbumListItem | null;
  enterLoading: boolean;
  getAlbumDataDispatch: (id: number) => void;
}

type RouteProps = RouteComponentProps<{id: string}>

const Album: React.FC<RouteProps & AlbumProps> = ({
  history,
  match,

  currentAlbum,
  enterLoading,

  getAlbumDataDispatch,
}) => {
  const id = match.params.id;
  const headerEl = useRef<HTMLDivElement | null>(null);
  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState("歌单");
  const [isMarquee, setIsMarquee] = useState(false); // 是否跑马灯

  useEffect(() => {
    getAlbumDataDispatch(Number(id));
  }, [getAlbumDataDispatch, id]);

  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, []);

  const handleScroll = useCallback((pos: any) => {
    const minScrollY = -HEADER_HEIGHT;
    const percent = Math.abs(pos.y / minScrollY);
    const headerDom = headerEl.current;

    if (!currentAlbum) return;
    if (!headerDom) return;

    // 滑过顶部的高度开始变化
    if (pos.y < minScrollY) {
      headerDom.style.backgroundColor = helpers.theme_color;
      headerDom.style.opacity = `${Math.min(1, (percent - 1) / 2)}`;
      setTitle(currentAlbum.name);
      setIsMarquee(true);
    } else {
      headerDom.style.backgroundColor = "";
      headerDom.style.opacity = String(1);
      setTitle("歌单");
      setIsMarquee(false);
    }
  }, [currentAlbum]);

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={history.goBack}>
      <Container>
        <Header ref={headerEl} title={title} handleClick={handleBack} isMarquee={isMarquee}></Header>
        {currentAlbum && !isEmptyObject(currentAlbum) ?
          (
            <Scroll
              bounceTop={false}
              onScroll={handleScroll}>
              <div>
                <TopDescWrapper currentAlbum={currentAlbum} />
                <MenuWrapper />
                <SongListWrapper currentAlbum={currentAlbum} />
              </div>
            </Scroll>
          )
          : null
        }
        {enterLoading ? <Loading /> : null}
      </Container>
    </CSSTransition>
  )
};

export default React.memo((props: RouteProps) => {
  const dispatch = useDispatch();

  const currentAlbum = useSelector((state: RootState) => state.album.currentAlbum);
  const enterLoading = useSelector((state: RootState) => state.album.enterLoading);

  const getAlbumDataDispatch = useCallback((id: number) => dispatch(getAlbumList(id)), [dispatch]);

  return <Album
    currentAlbum={currentAlbum}
    enterLoading={enterLoading}
    getAlbumDataDispatch={getAlbumDataDispatch}
    {...props}
   />
});
