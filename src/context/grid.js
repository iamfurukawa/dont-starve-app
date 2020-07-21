import { createContext } from "react";

const GridContext = createContext({
  setGridMin: () => {},
  setGridMax: () => {}
});

export default GridContext;