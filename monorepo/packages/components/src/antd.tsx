import React from 'react';
import { Button } from 'antd';

export const AntdButton = () => {
  return (
    <div onClick={console.log}>
      我是 antd button <Button>12312321</Button>
    </div>
  );
};
