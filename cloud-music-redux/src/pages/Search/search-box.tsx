import React, { useRef, useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';

import helpers from '@/assets/style/helpers';
import { debounce } from '@/utils';

const SearchBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  padding-right: 20px;
  height: 40px;
  background: ${helpers.theme_color};
  .icon-back {
    font-size: 24px;
    color: ${helpers.font_color_light};
  }
  .box {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: ${helpers.theme_color};
    color: ${helpers.highlight_background_color};
    font-size: ${helpers.font_size_m};
    outline: none;
    border: none;
    border-bottom: 1px solid ${helpers.border_color};
    &::placeholder {
      color: ${helpers.font_color_light};
    }
  }
  .icon-delete {
    font-size: 16px;
    color: ${helpers.background_color};
  }
`;

interface SearchBoxProps {
  newQuery: string; // 从父组件热门搜索中拿到的新关键词
  handleQuery: (q: string) => void; // 父组件针对搜索关键字发请求相关的处理
  back: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  newQuery,
  handleQuery,
  back,
}) => {
  const queryRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState('');

  // 缓存方法
  const handleQueryDebounce = useMemo(() => {
    return debounce(handleQuery, 500);
  }, [handleQuery]);

  useEffect(() => {
    queryRef.current?.focus();
  }, []);

  useEffect(() => {
    handleQueryDebounce(query); // 防抖
    // eslint-disable-next-line
  }, [query]);

  useEffect(() => {
    if (newQuery !== query) setQuery(newQuery);
    // eslint-disable-next-line
  }, [newQuery]);

  // 监听 input 框的内容
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  const clearQuery = () => {
    setQuery('');
    queryRef.current?.focus();
  };

  // 根据关键字是否存在决定清空按钮的显示 / 隐藏
  const displayStyle = query ? { display: 'block' } : { display: 'none' };

  return (
    <SearchBoxWrapper>
      <i className="iconfont icon-back" onClick={() => back()}>&#xe655;</i>
      <input ref={queryRef} className="box" placeholder="搜索歌曲、歌手、专辑" value={query} onChange={handleChange} />
      <i className="iconfont icon-delete" onClick={clearQuery} style={displayStyle}>&#xe600;</i>
    </SearchBoxWrapper>
  )
};

export default React.memo<typeof SearchBox>(SearchBox);
