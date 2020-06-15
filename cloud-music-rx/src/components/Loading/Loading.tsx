import React, { memo } from 'react';

import './Loading.module.less';

const Loading = memo(() => {
  return (
    <div className="loading-component">
      <div></div>
      <div></div>
    </div>
  );
})

export default Loading;
