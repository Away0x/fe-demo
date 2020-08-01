import React from 'react';
import { useTheme } from 'styled-components';

import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import Icon from 'components/Icon';

import StyledInput, { InputContainer, Prefix, Suffix } from './style';
import InputText from '../InputText';

interface InputProps {
  placeholder?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

function Input({
  placeholder = '请输入内容...',
  prefix,
  suffix,
  ...rest
}: InputProps) {
  return (
    <InputContainer {...rest}>
      {prefix && <Prefix>{prefix}</Prefix>}
      <StyledInput placeholder={placeholder} />
      {suffix && <Suffix>{suffix}</Suffix>}
    </InputContainer>
  );
}

interface SearchProps extends InputProps {}

function Search({ placeholder = '请输入内容...', ...rest }: SearchProps) {
  const theme = useTheme();

  return (
    <Input
      placeholder={placeholder}
      prefix={
        <Icon icon={SearchIcon} color={theme.gray3} width={18} height={18} />
      }
      {...rest}
    />
  );
}

Input.Search = Search;
Input.Text = InputText;

export default Input;
