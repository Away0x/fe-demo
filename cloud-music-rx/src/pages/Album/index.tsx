import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { AlbumProvider, useAlbumState, albumStore } from './store';
import Album from './Album';

function AlbumContainer() {
  const { id } = useParams();

  const {
    enterLoading,
    pullUpLoading,
    currentAlbum,
    startIndex,
    totalCount,
  } = useAlbumState();

  useEffect(() => {
    const nid = Number(id);
    if (!nid) {
      console.warn('AlbumContainer router id error', nid);
      return;
    }

    albumStore.getAlbumDetail(Number(id));
  }, [id]);
  
  return (
    <Album
      currentAlbum={currentAlbum}
      startIndex={startIndex}
      totalCount={totalCount}
      enterLoading={enterLoading}
      pullUpLoading={pullUpLoading} />
  );
}

export default React.memo(() => {
  return (
    <AlbumProvider>
      <AlbumContainer />
    </AlbumProvider>
  );
});