import { useEffect, useRef, useState } from 'react';

interface Size {
  width: number;
  height: number;
}

function useParentSize(): [React.RefObject<HTMLDivElement>, Size] {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        setSize({
          width: entries[0].contentRect.width,
          height: entries[0].contentRect.height,
        });
      }
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return [ref, size];
}

export default useParentSize;
