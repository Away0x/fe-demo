import React, { useState } from 'react';

import Horizen from '@/components/Horizen';
import { categoryTypes, alphaTypes } from '@/constants';

import {
  NavContainer,
} from './index.style';

const Singers: React.FC = () => {
  const [category, setCategory] = useState('');
  const [alpha, setAlpha] = useState('');

  const handleUpdateCatetory = (val: string) => setCategory(val);

  const handleUpdateAlpha = (val: string) => setAlpha(val);

  return (
    <NavContainer>
      <Horizen
        list={categoryTypes}
        title={"分类 (默认热门):"}
        handleClick={(val) => handleUpdateCatetory(val.key)}
        oldVal={category} />
      <Horizen
        list={alphaTypes}
        title={"首字母:"}
        handleClick={(val) => handleUpdateAlpha(val.key)}
        oldVal={alpha} />
    </NavContainer>
  )
};

export default React.memo(Singers);
