// REFERENCE: https://github.com/mantinedev/mantine/blob/master/packages/@mantine/hooks/src/use-debounced-value/use-debounced-value.ts
// Usage: https://mantine.dev/hooks/use-debounced-value/#usage

import { useEffect, useRef, useState } from 'react';

export const useDebouncedValue = <T = any>(value: T, wait = 300, options = { leading: false }) => {
  const [_value, setValue] = useState(value);
  const mountedRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);
  const cooldownRef = useRef(false);

  const cancel = () => window.clearTimeout(timeoutRef.current!);

  useEffect(() => {
    if (mountedRef.current) {
      if (!cooldownRef.current && options.leading) {
        cooldownRef.current = true;
        setValue(value);
      } else {
        cancel();
        timeoutRef.current = window.setTimeout(() => {
          cooldownRef.current = false;
          setValue(value);
        }, wait);
      }
    }
  }, [value, options.leading, wait]);

  useEffect(() => {
    mountedRef.current = true;
    return cancel;
  }, []);

  return [_value, cancel] as const;
};
