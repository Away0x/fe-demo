import React from 'react';
import { animated } from 'react-spring';

import FilterList from 'components/FilterList';
import NoteCard from 'components/NoteCard';
import useStaggeredList from 'tools/hooks/useStaggeredList';

import StyledNoteList, { Notes } from './style';

interface NoteListProps {
  children?: React.ReactNode;
}

function NoteList({ children, ...rest }: NoteListProps) {
  const trailAnimes = useStaggeredList(7);

  return (
    <StyledNoteList {...rest}>
      <FilterList
        options={['最新笔记优先', '有改动的优先']}
        actionLabel="添加笔记">
        <Notes>
          {new Array(7).fill(0).map((_, i) => (
            <animated.div key={i} style={trailAnimes[i]}>
              <NoteCard />
            </animated.div>
          ))}
        </Notes>
      </FilterList>
    </StyledNoteList>
  );
}

export default NoteList;
