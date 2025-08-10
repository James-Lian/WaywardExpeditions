import { useContext } from "react";
import { GlobalContext } from "./Context";

export const useGlobals = () => useContext(GlobalContext)