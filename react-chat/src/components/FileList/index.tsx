import React from 'react';
import { animated } from 'react-spring';

import FilterList from 'components/FilterList';
import FileCard from 'components/FileCard';
import useStaggeredList from 'tools/hooks/useStaggeredList';

import StyledFileList, { Files } from './style';

interface FileListProps {
  children?: React.ReactNode;
}

function FileList({ children, ...rest }: FileListProps) {
  const trailAnimes = useStaggeredList(7);

  return (
    <StyledFileList {...rest}>
      <FilterList options={['最新文件优先', '按文件名排序']}>
        <Files>
          {new Array(7).fill(0).map((_, i) => (
            <animated.div key={i} style={trailAnimes[i]}>
              <FileCard />
            </animated.div>
          ))}
        </Files>
      </FilterList>
    </StyledFileList>
  );
}

export default FileList;
