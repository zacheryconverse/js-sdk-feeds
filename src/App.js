import { useState } from "react";
import "./App.css";
import ActivityList from "./components/ActivityList/ActivityList";
import FeedSelector from "./components/FeedSelector/FeedSelector";
import Login from "./components/Login";
import PostToFeed from "./components/PostToFeed/PostToFeed";
import { Banner } from "./components/Banner/Banner";

function App() {
  const [activeFeed, setActiveFeed] = useState("");
  const [client, setClient] = useState("");
  const [userFeed, setUserFeed] = useState("");

  return (
    <div className="App">
      {!activeFeed ? (
        <Login
          setActiveFeed={setActiveFeed}
          setClient={setClient}
          setUserFeed={setUserFeed}
        />
      ) : (
        <div>
          <Banner />
          <FeedSelector
            client={client}
            setActiveFeed={setActiveFeed}
          />
          <PostToFeed client={client} activeFeed={activeFeed} />
          <ActivityList
            client={client}
            userFeed={userFeed}
            setActiveFeed={setActiveFeed}
            activeFeed={activeFeed}
          />
        </div>
      )}
    </div>
  );
}

export default App;
