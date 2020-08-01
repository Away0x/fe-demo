import React from 'react';

import FilterList from 'components/FilterList';
import FileCard from 'components/FileCard';

import StyledFileList, { Files } from './style';

interface FileListProps {
  children?: React.ReactNode;
}

function FileList({ children, ...rest }: FileListProps) {
  return (
    <StyledFileList {...rest}>
      <FilterList options={['最新文件优先', '按文件名排序']}>
        <Files>
          {new Array(10).fill(0).map((_, i) => (
            <FileCard key={i} />
          ))}
        </Files>
      </FilterList>
    </StyledFileList>
  );
}

export default FileList;
