import React from 'react';

import Icon from 'components/Icon';
import { ReactComponent as ClipIcon } from 'assets/icons/clip.svg';
import { ReactComponent as SmileIcon } from 'assets/icons/smile.svg';

import Input from './Input';

export default {
  title: '表单/Input',
  component: Input,
};

export const Default = () => <Input />;

export const Search = () => <Input.Search />;

export const WithAffix = () => (
  <Input
    prefix={<Icon icon={ClipIcon} color="#cccccc" />}
    suffix={<Icon icon={SmileIcon} color="#cccccc" />}
  />
);

export const InputTextWithLabel = () => <Input.Text label="昵称" />;
export const InputTextWithoutLabel = () => <Input.Text />;
