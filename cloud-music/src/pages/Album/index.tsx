import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import Header from '@/components/Header';

import {
  Container,
} from './index.style';

const Album: React.FC<RouteComponentProps> = ({
  history,
}) => {
  const [showStatus, setShowStatus] = useState(true);

  const handleBack = () => {
    setShowStatus(false);
  };

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={history.goBack}>
      <Container>
        <Header title={"返回"} handleClick={handleBack} />
      </Container>
    </CSSTransition>
  )
};

export default React.memo(withRouter(Album));
