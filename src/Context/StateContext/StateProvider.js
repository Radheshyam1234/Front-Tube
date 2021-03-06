import { createContext, useContext, useReducer } from "react";
import { stateReducer } from "./StateReducer";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const initialState = {
    playlists: [],
    watchLater: [],
    watchHistory: [],
    likedVideos: [],
  };
  const [state, dispatch] = useReducer(stateReducer, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
