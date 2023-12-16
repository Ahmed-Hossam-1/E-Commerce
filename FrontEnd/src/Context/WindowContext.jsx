import { createContext, useEffect, useState } from "react";

export const WindowSize = createContext("");

const WindowContext = ({ children }) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  useEffect(() => {
    function setWindowWidth() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener("resize", setWindowWidth);

    // Clean UP Function
    return () => {
      window.removeEventListener("resize", setWindowWidth);
    };
  }, []);
  return (
    <WindowSize.Provider value={{ windowSize, setWindowSize }}>
      {children}
    </WindowSize.Provider>
  );
};

export default WindowContext;
