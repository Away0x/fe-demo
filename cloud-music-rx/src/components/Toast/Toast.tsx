import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import s from './Toast.module.less';

type ToastProps = {
  text: string;
};

export interface ToastHandlers {
  show(): void;
}

const Toast = forwardRef<ToastHandlers, ToastProps>(({
  text,
}, ref) => {
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState<any>(null);

  useImperativeHandle(ref, () => ({
    show() {
      if (timer) clearTimeout(timer);
      setShow(true);
      setTimer(setTimeout(() => {
        setShow(false)
      }, 3000));
    }
  }));

  return (
    <CSSTransition in={show} timeout={300} classNames="toastdrop" unmountOnExit>
      <div className={s.wrapper}>
        <div className={s.text}>{text}</div>
      </div>
    </CSSTransition>
  );
});

export default React.memo(Toast);
