import React from 'react';

import SongList from '@/components/SongList';

import s from './AlbumDetail.module.less';

const Top = React.memo(({
  currentAlbum,
}: {
  currentAlbum: Resp.AlbumListItem;
}) => {
  const background = `url(${currentAlbum.coverImgUrl}) 0px 0px / 100% 100% no-repeat`;

  return (
    <div className={s.top}>
      <div className={s.topBg} style={{ background }}>
        <div className={s.topFilter}></div>
      </div>
      <div className={s.imgWrapper}>
        <div className={s.decorate}></div>
        <img src={currentAlbum.coverImgUrl} alt="" />
        <div className={s.playCount}>
          <i className="iconfont play">&#xe885;</i>
          <span>{Math.floor(currentAlbum.subscribedCount / 1000) / 10}万</span>
        </div>
      </div>
      <div className={s.descWrapper}>
        <div className={s.descTitle}>{currentAlbum.name}</div>
        <div className={s.person}>
          <div className={s.avatar}>
            <img src={currentAlbum.creator.avatarUrl} alt="" />
          </div>
          <div className={s.name}>{currentAlbum.creator.nickname}</div>
        </div>
      </div>
    </div>
  );
});

const MenuWrapper = React.memo(() => {
  return (
    <div className={s.menu}>
      <div>
        <i className="iconfont">&#xe6ad;</i> 评论
      </div>
      <div>
        <i className="iconfont">&#xe86f;</i> 点赞
      </div>
      <div>
        <i className="iconfont">&#xe62d;</i> 收藏
      </div>
      <div>
        <i className="iconfont">&#xe606;</i> 更多
      </div>
    </div>
  )
});


type AlbumDetailProps = {
  currentAlbum: Resp.AlbumListItem;
};

function AlbumDetail({
  currentAlbum,
}: AlbumDetailProps) {
  return (
    <div>
      <Top currentAlbum={currentAlbum} />
      <MenuWrapper />
      <SongList songs={currentAlbum.tracks} />
    </div>
  );
}

export default React.memo(AlbumDetail);
