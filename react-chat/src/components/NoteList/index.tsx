import React from 'react';
import { animated } from 'react-spring';

import FilterList from 'components/FilterList';
import NoteCard from 'components/NoteCard';
import useStaggeredList from 'tools/hooks/useStaggeredList';

import notesData from 'data/notes';

import StyledNoteList, { Notes } from './style';

interface NoteListProps {
  children?: React.ReactNode;
}

function NoteList({ children, ...rest }: NoteListProps) {
  const trailAnimes = useStaggeredList(notesData.length);

  return (
    <StyledNoteList {...rest}>
      <FilterList
        options={['最新笔记优先', '有改动的优先']}
        actionLabel="添加笔记">
        <Notes>
          {notesData.map((note, i) => (
            <animated.div key={note.id} style={trailAnimes[i]}>
              <NoteCard
                image={note.image}
                title={note.title}
                excerpt={note.excerpt}
                publishedAt={note.publishedAt}
              />
            </animated.div>
          ))}
        </Notes>
      </FilterList>
    </StyledNoteList>
  );
}

export default NoteList;
