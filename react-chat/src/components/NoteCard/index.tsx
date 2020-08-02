import React from 'react';

import StyledNoteCard, {
  NoteImage,
  NoteTitle,
  NoteExcerpt,
  NotePublishTime,
} from './style';

interface NoteCardProps {
  image: string;
  title?: string;
  excerpt?: string;
  publishedAt?: string;
  children?: React.ReactNode;
}

function NoteCard({
  image,
  title,
  excerpt,
  publishedAt,
  children,
  ...rest
}: NoteCardProps) {
  return (
    <StyledNoteCard {...rest}>
      <NoteImage src={image} />
      <NoteTitle>{title}</NoteTitle>
      <NoteExcerpt>{excerpt}</NoteExcerpt>
      <NotePublishTime>{publishedAt}</NotePublishTime>
    </StyledNoteCard>
  );
}

export default NoteCard;
