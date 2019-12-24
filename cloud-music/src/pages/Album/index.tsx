import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import {
  Container,
} from './index.style';

const Album: React.FC<RouteComponentProps> = ({
  history,
}) => {
  const [showStatus, setShowStatus] = useState(true);

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={history.goBack}>
      <Container>
        Album
      </Container>
    </CSSTransition>
  )
};

export default React.memo(withRouter(Album) as any);
