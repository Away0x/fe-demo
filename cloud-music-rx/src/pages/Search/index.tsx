import React, { useEffect } from 'react';

import { SearchProvider, useSearchState, searchStore } from './store';
import Search from './Search';

function SearchContainer() {
  const {
    enterLoading,
    songsList,
    hotList,
    suggestList,
  } = useSearchState();

  useEffect(() => {
    if (hotList.length) return;
    searchStore.getHotKeyWords();
    // eslint-disable-next-line
  }, []);

  return (
    <Search
      enterLoading={enterLoading}
      songsList={songsList}
      hotList={hotList}
      suggestList={suggestList} />
  );
}

export default React.memo(() => {
  return (
    <SearchProvider>
      <SearchContainer />
    </SearchProvider>
  );
});
