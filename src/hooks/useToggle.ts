import { useState } from "react";

/**
 * Custom hook for managing a boolean toggle state.
 * @param {boolean} [initialValue=false] - An optional initial value for the toggle.
 */
function useToggle(initialValue: boolean = false): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  /**
   * Toggle the boolean state.
   */
  const toggle = () => {
    setValue((prevValue) => !prevValue);
  };

  // Return a tuple containing the current toggle state and the toggle function.
  return [value, toggle];
}

export default useToggle;
