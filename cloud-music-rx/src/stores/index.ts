import { useSubjectStore, createContextStore } from '@away0x/react-rx-store';

import { globalStore } from './global';
import { authStore } from './auth';
import { recommendStore } from './recommend';
import { singersStore } from './singers';
import { rankStore } from './rank';
import { playerStore } from './player';

const Store = createContextStore(() => {
  const globalState = useSubjectStore(globalStore, {dev: true});
  const authState = useSubjectStore(authStore);
  const recommendState = useSubjectStore(recommendStore);
  const singersState = useSubjectStore(singersStore);
  const rankState = useSubjectStore(rankStore);
  const playerState = useSubjectStore(playerStore);

  return {
    globalState,
    authState,
    recommendState,
    singersState,
    rankState,
    playerState,
  };
});

const RootProvider = Store.Provider;

const useGlobalState = () => {
  return Store.useStore().globalState;
};

const useAuthState = () => {
  return Store.useStore().authState;
};

const useRecommendState = () => {
  return Store.useStore().recommendState;
};

const useSingersState = () => {
  return Store.useStore().singersState;
};

const useRankState = () => {
  return Store.useStore().rankState;
};

const usePlayerState = () => {
  return Store.useStore().playerState;
};

export {
  // providers
  RootProvider,

  // state hooks
  useGlobalState,
  useAuthState,
  useRecommendState,
  useSingersState,
  useRankState,
  usePlayerState,
  
  // stores
  globalStore,
  authStore,
  recommendStore,
  singersStore,
  rankStore,
  playerStore,
};