import { useRef, useEffect } from 'react';

export function useMemoCompare<T>(value: T, compare: (a: T | null, b: T) => boolean): T | null {
  const previousRef = useRef<T | null>(null);
  const previous = previousRef.current;

  const isEqual = compare(previous, value);

  useEffect(() => {
    if (!isEqual) {
      previousRef.current = value;
    }
  });

  return isEqual ? previous : value;
}

export function usePrevious<T>(value: T): T | null {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}