import React, { useState, useCallback, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useHistory } from 'react-router-dom';

import { HEADER_HEIGHT } from '@/constants';
import NavHeader from '@/components/NavHeader';
import Scroll from '@/components/Scroll';
import { Loading } from '@/components/Loading';
import { isEmptyObject } from '@/tools/utils';
import cssVar from '@/styles/var.module.less';

import AlbumDetail from './AlbumDetail';
import s from './Album.module.less';


type AlbumProps = {
  currentAlbum: Resp.AlbumListItem | null;
  enterLoading: boolean;
  pullUpLoading: boolean;
  startIndex: number;
  totalCount: number;
};

function Album({
  currentAlbum,
  enterLoading,
  pullUpLoading,
  startIndex,
  totalCount,
}: AlbumProps) {
  const history = useHistory();

  const headerRef = useRef<HTMLDivElement | null>(null);

  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState('歌单');
  const [isMarquee, setIsMarquee] = useState(false); // 是否跑马灯
  
  const handleBack = useCallback(() => {
    setShowStatus(false); // 触发 CSSTransition 消失动画，并通过 onExited 返回上一个页面
  }, []);

  const handleScroll = useCallback((pos: any) => {
    const minScrollY = -HEADER_HEIGHT;
    const percent = Math.abs(pos.y / minScrollY);
    const headerDom = headerRef.current;

    if (!currentAlbum) return;
    if (!headerDom) return;

    // 滑过顶部的高度开始变化
    if (pos.y < minScrollY) {
      headerDom.style.backgroundColor = cssVar.themeColor;
      headerDom.style.opacity = `${Math.min(1, (percent - 1) / 2)}`;
      setTitle(currentAlbum.name);
      setIsMarquee(true);
    } else {
      headerDom.style.backgroundColor = "";
      headerDom.style.opacity = String(1);
      setTitle('歌单');
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
      <div className={s.container}>
        <NavHeader ref={headerRef} title={title} isMarquee={isMarquee} handleClick={handleBack} />

        {currentAlbum && !isEmptyObject(currentAlbum) ?
          (
            <Scroll
              bounceTop={false}
              onScroll={handleScroll}>
              <AlbumDetail currentAlbum={currentAlbum} />
            </Scroll>
          ) : null}

        {enterLoading ? <Loading /> : null}
      </div>
    </CSSTransition>
  );
}

export default React.memo(Album);
