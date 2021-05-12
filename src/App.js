import { useState } from "react";
import "./App.css";
import ActivityList from "./components/ActivityList/ActivityList";
import FeedSelector from "./components/FeedSelector/FeedSelector";
import Login from "./components/Login";
import PostToFeed from "./components/PostToFeed/PostToFeed";
import { Banner } from "./components/Banner/Banner";

function App() {
  const [activeFeed, setActiveFeed] = useState("timeline");
  const [client, setClient] = useState("");
  const [userFeed, setUserFeed] = useState("");
  const [timelineFeed, setTimelineFeed] = useState("");
  const [view, setView] = useState("login");

  return (
    <div className="App">
      {view === "login" ? (
        <Login
          setView={setView}
          setClient={setClient}
          setUserFeed={setUserFeed}
          setTimelineFeed={setTimelineFeed}
        />
      ) : (
        <div>
          <Banner />
          <FeedSelector
            setUserFeed={setUserFeed}
            setActiveFeed={setActiveFeed}
          />
          <PostToFeed client={client} userFeed={userFeed} />
          <ActivityList
            client={client}
            userFeed={userFeed}
            timelineFeed={timelineFeed}
            activeFeed={activeFeed}
          />
        </div>
      )}
    </div>
  );
}

export default App;
