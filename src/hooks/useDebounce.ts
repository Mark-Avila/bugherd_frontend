import { useState, useEffect } from "react";

/**
 * Custom hook for debouncing a value
 *
 * @param value Value to debounce
 * @param delay Debounce delay
 * @returns
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // This cleanup function will run before the effect is re-invoked,
    // which means it will clear the previous timer if "value" or "delay" changes again.
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
