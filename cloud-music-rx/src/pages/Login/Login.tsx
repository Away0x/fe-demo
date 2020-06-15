import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import './Login.module.less';

const Login = () => {
  const [inPhone, setInPhone] = useState(true);
  const [agreed, setAgreed] = useState(false);

  return (
    <>
      <CSSTransition
        in={!inPhone}
        timeout={500}
        classNames="push-out">
        <div className="login-page">
          <div className="logoContainer">
            <div>
              <img style={{ width: '70px' }} src={require('@/assets/images/netease-logo-white.svg')} alt="" />
            </div>
          </div>
        </div>
      </CSSTransition>

      <CSSTransition
        in={inPhone}
        timeout={500}
        classNames="push-in">
        <div className="loginContainer">
          loginContainer
        </div>
      </CSSTransition>
    </>
  );
};

export default React.memo(Login);
