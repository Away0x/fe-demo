import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import {
  Container,
} from './index.style';

const Search: React.FC<RouteComponentProps> = ({
  history,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames="fly"
      unmountOnExit
      onExited={history.goBack}>
      <Container>
        <div onClick={() => setShow(false)}> 返回 </div>
      </Container>
    </CSSTransition>
  )
};

export default React.memo<typeof Search>(Search);
