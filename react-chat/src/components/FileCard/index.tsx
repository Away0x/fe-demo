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

const fileIcons = {
  zip: FileZip,
  image: FileImage,
  pdf: FilePdf,
  word: FileWord,
  excel: FileExcel,
  ppt: FilePpt,
};

interface FileCardProps {
  children?: React.ReactNode;
}

function FileCard({ children, ...rest }: FileCardProps) {
  return (
    <StyledFileCard {...rest}>
      <FileIcon icon={fileIcons.zip} />
      <FileName>Source Code.zip</FileName>
      <FileSize>1.5M</FileSize>
      <Options>
        <Icon icon={OptionsIcon} opacity={0.3} />
      </Options>
      <Time>2019年02月03日</Time>
    </StyledFileCard>
  );
}

export default FileCard;
