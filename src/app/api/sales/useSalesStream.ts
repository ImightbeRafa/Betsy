import { useEffect, useState } from 'react';

interface SalesStreamOptions {
  onData?: (data: string) => void;
  onError?: (error: string) => void;
}

export function useSalesStream({ onData, onError }: SalesStreamOptions) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const eventSource = new EventSource('/api/sales/stream');
    setIsConnected(true);

    eventSource.onmessage = (event) => {
      if (event.data.startsWith('ERROR:')) {
        onError?.(event.data.substring(6));
      } else {
        onData?.(event.data);
      }
    };

    eventSource.onerror = () => {
      setIsConnected(false);
      eventSource.close();
    };

    return () => {
      eventSource.close();
      setIsConnected(false);
    };
  }, [onData, onError]);

  return { isConnected };
}