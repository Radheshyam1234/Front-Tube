import { createContext, useContext, useState } from "react";

export const VideosDataContext = createContext();

export const VideosDataProvider = ({ children }) => {
  const [videosList, setVideosList] = useState([]);

  return (
    <VideosDataContext.Provider value={{ videosList, setVideosList }}>
      {children}
    </VideosDataContext.Provider>
  );
};

export const useVideosDataProvider = () => useContext(VideosDataContext);
