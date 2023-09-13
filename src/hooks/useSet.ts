import { useState } from "react";

/**
 * Custom hook for managing a Set data structure with additional utility functions.
 *
 * @template T - The type of values stored in the Set.
 * @param {T[]} [initialValues=[]] - An optional array of initial values to initialize the Set.
 */
function useSet<T>(initialValues: T[] = []) {
  // Create a state variable to store the Set.
  const [set, setSet] = useState(new Set<T>(initialValues));

  /**
   * Add a value to the Set.
   *
   * @param {T} value - The value to add to the Set.
   */
  const add = (value: T) => {
    setSet((prevSet) => new Set([...prevSet, value]));
  };

  /**
   * Remove a value from the Set.
   *
   * @param {T} value - The value to remove from the Set.
   */
  const remove = (value: T) => {
    setSet((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.delete(value);
      return newSet;
    });
  };

  /**
   * Clear all values from the Set.
   */
  const clear = () => {
    setSet(new Set());
  };

  /**
   * Check if a value exists in the Set.
   *
   * @param {T} value - The value to check for in the Set.
   * @returns {boolean} True if the value exists in the Set, false otherwise.
   */
  const has = (value: T): boolean => set.has(value);

  // Convert the Set to an array to access its values.
  const values = Array.from(set);

  return {
    add,
    remove,
    clear,
    has,
    values,
    size: values.length,
  };
}

export default useSet;
