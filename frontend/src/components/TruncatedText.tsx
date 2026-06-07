// components
import Truncate from 'react-truncate';
import { useState, useEffect } from 'react';

import { TruncatedTextProps } from '../types/components';

const TruncatedText = ({ text, lines = 2, className, width }: TruncatedTextProps) => {
  const [truncated, setTruncated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return (
    <span className={className ? className : ''}>
      {mounted && (
        <Truncate lines={lines} ellipsis={<span>...</span>} width={width} onTruncate={() => setTruncated(!truncated)}>
          {text}
        </Truncate>
      )}
    </span>
  );
};

export default TruncatedText;
