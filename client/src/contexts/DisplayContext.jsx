import { createContext, useState } from "react";

export const DisplayContext = createContext({
  display: "",
  dispatchDisplay: () => {},
});

export function DisplayProvider({ children }) {
  const [display, setDisplay] = useState("");

  return (
    <DisplayContext
      value={{
        display,
        dispatchDisplay: (value) => {
          if (screen.orientation.type.includes("portrait")) setDisplay(value);
        },
      }}
    >
      {children}
    </DisplayContext>
  );
}
