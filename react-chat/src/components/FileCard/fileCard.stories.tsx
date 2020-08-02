import React from 'react';

import FileCard from '.';
import filesData from 'data/files';

export default {
  title: 'UI 组件/FileCard',
  component: FileCard,
};

export const Default = () => <FileCard {...filesData[0]} />;
