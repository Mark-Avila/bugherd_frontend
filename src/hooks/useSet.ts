import { useState } from "react";

function useSet<T>(initialValues = []) {
  const [set, setSet] = useState(new Set<T>(initialValues));

  const add = (value: T) => {
    setSet((prevSet) => new Set([...prevSet, value]));
  };

  const remove = (value: T) => {
    setSet((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.delete(value);
      return newSet;
    });
  };

  const clear = () => {
    setSet(new Set());
  };

  const values = Array.from(set);

  return {
    add,
    remove,
    clear,
    values,
    size: values.length,
  };
}

export default useSet;
