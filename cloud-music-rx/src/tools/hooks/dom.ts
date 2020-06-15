import { useState, useEffect, useRef } from 'react';

export function useEventListener(eventName: string, handler: (e: Event) => void, element: EventTarget = window) {
  const ref = useRef<typeof handler>();

  useEffect(() => {
    ref.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener: EventListenerOrEventListenerObject = event => {
      if (!ref.current) return;
      ref.current(event);
    };

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

export function useWindowSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) return;

    function handleResize() {
      setWindowSize(getSize)
    }

    useEventListener('resize', handleResize);
  }, []);

  return windowSize;
}