import React from 'react';

import note1 from 'assets/images/note-1.jpg';

import StyledNoteCard, {
  NoteImage,
  NoteTitle,
  NoteExcerpt,
  NotePublishTime,
} from './style';

interface NoteCardProps {
  children?: React.ReactNode;
}

function NoteCard({ children, ...rest }: NoteCardProps) {
  return (
    <StyledNoteCard {...rest}>
      <NoteImage src={note1} />
      <NoteTitle>这是笔记标题</NoteTitle>
      <NoteExcerpt>这是笔记内容摘要</NoteExcerpt>
      <NotePublishTime>2020-02-08</NotePublishTime>
    </StyledNoteCard>
  );
}

export default NoteCard;
