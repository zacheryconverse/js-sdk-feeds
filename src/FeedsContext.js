import React, { useState, createContext } from "react";
const stream = require("getstream");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });



export const GlobalFeedContext = createContext();

export const GlobalFeedProvider = (props) => {
  const [globalFeed, setGlobalFeed] = useState([]);
  return (
    <GlobalFeedContext.Provider value={[globalFeed, setGlobalFeed]}>
      {props.children}
    </GlobalFeedContext.Provider>
  );
};

export const ReactionFeedContext = createContext();

export const ReactionFeedProvider = (props) => {
  // const [globalFeed] = useState(StreamChat.getInstance(appKey));
  // return (
  //   <ChatClientContext.Provider value={chatClient}>
  //     {props.children}
  //   </ChatClientContext.Provider>
  // );
};

export const UserFeedProvider = (props) => {

}
