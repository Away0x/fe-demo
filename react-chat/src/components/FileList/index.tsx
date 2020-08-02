import React from 'react';
import { animated } from 'react-spring';

import FilterList from 'components/FilterList';
import FileCard from 'components/FileCard';
import useStaggeredList from 'tools/hooks/useStaggeredList';

import filesData from 'data/files';

import StyledFileList, { Files } from './style';

interface FileListProps {
  children?: React.ReactNode;
}

function FileList({ children, ...rest }: FileListProps) {
  const trailAnimes = useStaggeredList(filesData.length);

  return (
    <StyledFileList {...rest}>
      <FilterList options={['最新文件优先', '按文件名排序']}>
        <Files>
          {filesData.map((file, i) => (
            <animated.div key={file.id} style={trailAnimes[i]}>
              <FileCard
                name={file.name}
                size={file.size}
                type={file.type}
                updatedAt={file.updatedAt}
              />
            </animated.div>
          ))}
        </Files>
      </FilterList>
    </StyledFileList>
  );
}

export default FileList;
