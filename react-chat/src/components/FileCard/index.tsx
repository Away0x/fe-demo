import React from 'react';

import Icon from 'components/Icon';
import { ReactComponent as FileZip } from 'assets/icons/fileZip.svg';
import { ReactComponent as FileExcel } from 'assets/icons/fileExcel.svg';
import { ReactComponent as FileWord } from 'assets/icons/fileWord.svg';
import { ReactComponent as FilePpt } from 'assets/icons/filePpt.svg';
import { ReactComponent as FileImage } from 'assets/icons/fileImage.svg';
import { ReactComponent as FilePdf } from 'assets/icons/filePdf.svg';
import { ReactComponent as OptionsIcon } from 'assets/icons/options.svg';

import StyledFileCard, {
  FileName,
  FileSize,
  Options,
  Time,
  FileIcon,
} from './style';

const fileIcons: { [k: string]: any } = {
  zip: FileZip,
  image: FileImage,
  pdf: FilePdf,
  word: FileWord,
  excel: FileExcel,
  ppt: FilePpt,
};

interface FileCardProps {
  name?: string;
  size?: string;
  updatedAt?: string;
  type: string;
  children?: React.ReactNode;
}

function FileCard({
  name,
  size,
  updatedAt,
  type,
  children,
  ...rest
}: FileCardProps) {
  return (
    <StyledFileCard {...rest}>
      <FileIcon icon={fileIcons[type]} />
      <FileName>{name}</FileName>
      <FileSize>{size}</FileSize>
      <Options>
        <Icon icon={OptionsIcon} opacity={0.3} />
      </Options>
      <Time>{updatedAt}</Time>
    </StyledFileCard>
  );
}

export default FileCard;
