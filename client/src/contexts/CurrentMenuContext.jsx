import { createContext, useState } from "react";

export const CurrentMenuContext = createContext({
  current: null,
  setCurrent: () => {},
});

export function CurrentMenuProvider({ children }) {
  const [current, setCurrent] = useState(null);

  return (
    <CurrentMenuContext value={{ current, setCurrent }}>
      {children}
    </CurrentMenuContext>
  );
}
