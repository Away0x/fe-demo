import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { SingerProvider, useSingerState, singerStore } from './store';
import Singer from './Singer';

function SingerContainer() {
  const { id } = useParams();

  const {
    loading,
    artist,
    songsOfArtist,
  } = useSingerState();

  useEffect(() => {
    const nid = Number(id);
    if (!nid) {
      console.warn('SingerContainer router id error', nid);
      return;
    }

    singerStore.getSingerInfo(nid);
  }, [id]);

  return (
    <Singer
      loading={loading}
      artist={artist}
      songsOfArtist={songsOfArtist} />
  );
}

export default React.memo(() => {
  return (
    <SingerProvider>
      <SingerContainer />
    </SingerProvider>
  );
});
