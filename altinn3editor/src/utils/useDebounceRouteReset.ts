import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useHasChanged } from './useHasChanged';

export default function useDebounceRouteReset<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const {pathname} = useLocation();
  const hasChanged = useHasChanged(pathname);

  useEffect(() => {
    if(hasChanged){
      setDebouncedValue(value);
      return;
    }
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay, hasChanged])

  return debouncedValue
}
