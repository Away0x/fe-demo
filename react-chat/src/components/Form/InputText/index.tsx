import React from 'react';

import LabelContainer from 'components/Form/LabelContainer';

import StyledInputText, { InputUnderline } from './style';

interface InputTextProps {
  label?: string;
  placeholder?: string;
  children?: React.ReactNode;
}

function InputText({
  label,
  placeholder = '请输入内容',
  children,
  ...rest
}: InputTextProps) {
  const input = <InputUnderline type="text" placeholder={placeholder} />;

  return (
    <StyledInputText {...rest}>
      {label ? <LabelContainer label={label}>{input}</LabelContainer> : input}
    </StyledInputText>
  );
}

export default InputText;
