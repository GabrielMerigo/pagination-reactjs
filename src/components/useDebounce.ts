/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";

export default function useDebounce(fn: any, delay: any) {
  const timeoutRef = useRef<any>(null);

  function debouncedFn(...args: any) {
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      fn(...args);
    }, delay);
  }

  return debouncedFn;
}
