import React from 'react';

import Radio from './Radio';

export default {
  title: '表单/Radio',
  component: Radio,
};

export const Default = () => <Radio>选项</Radio>;

export const RadioGroup = () => (
  <Radio.Group label="请选择">
    <Radio name="option">选项1</Radio>
    <Radio name="option">选项2</Radio>
    <Radio name="option">选项3</Radio>
  </Radio.Group>
);
