import { create } from "domain";
import React, { useState, createContext } from "react";
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });



export const GlobalFeedContext = createContext();

export const GlobalFeedProvider = (props) => {
  const [globalFeed, setGlobalFeed] = useState(null);
  return (
    <GlobalFeedContext.Provider value={[globalFeed, setGlobalFeed]}>
      {props.children}
    </GlobalFeedContext.Provider>
  );
};

export const ReactionFeedContext = createContext();

export const ReactionFeedProvider = (props) => {
  const [reactionFeed, setReactionFeed] = useState(null);
  return (
    <ReactionFeedContext.Provider value={[reactionFeed, setReactionFeed]}>
      {props.children}
    </ReactionFeedContext.Provider>
  );
};

export const UserFeedContext = createContext();

export const UserFeedProvider = (props) => {
const [userFeed, setUserFeed] = useState(null);
return (
  <ReactionFeedContext.Provider value={[userFeed, setUserFeed]}>
    {props.children}
  </ReactionFeedContext.Provider>
);
}
