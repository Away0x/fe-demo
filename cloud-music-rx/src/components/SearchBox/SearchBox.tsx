import React, { useRef, useState, useEffect } from 'react';
import c from 'classnames';
import { useEventCallback } from 'rxjs-hooks';
import { map, tap, debounceTime } from 'rxjs/operators';

import s from './SearchBox.module.less';

type SearchBoxProps = {
  newQuery: string;
  back: () => void;
  handleQuery: (query: string) => void;
};

function SearchBox({
  newQuery,
  back,
  handleQuery,
}: SearchBoxProps) {
  const queryRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState(newQuery);
  
  const [handleQueryChange] = useEventCallback<string, string>(
    (event$) => {
      return event$.pipe(
        map(s => s.trim()),
        debounceTime(800),
        tap(s => handleQuery(s)),
      );
    },
    '',
  );

  const displayStyle = query ? { display: 'block' } : { display: 'none' };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setQuery(val);
  };

  const clearQuery = () => {
    setQuery('');
    if (!queryRef.current) return;
    queryRef.current.focus();
  };

  useEffect(() => {
    queryRef.current?.focus();
  }, []);

  useEffect(() => {
    setQuery(newQuery);
  }, [newQuery]);

  useEffect(() => {
    handleQueryChange(query);
  }, [query, handleQueryChange]);

  return (
    <div className={s.container}>
      <i className={c('iconfont', s.iconBack)} onClick={back}>&#xe655;</i>
      <input ref={queryRef} value={query} className={s.box} placeholder="搜索歌曲、歌手、专辑" onChange={handleChange} />
      <i className={c('iconfont', s.iconDelete)} onClick={clearQuery} style={displayStyle}>&#xe600;</i>
    </div>
  );
}

export default React.memo(SearchBox);
