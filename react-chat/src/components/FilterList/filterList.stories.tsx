import React from 'react';

import FilterList from '.';

export default {
  title: '列表/FilterList',
  component: FilterList,
};

export const Default = () => (
  <FilterList actionLabel="do" options={['thing1', 'thing2']}>
    <ul>
      <li>item 1</li>
      <li>item 2</li>
      <li>item 3</li>
    </ul>
  </FilterList>
);
