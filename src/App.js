import { useState } from "react";
import "./App.css";
// import stream from 'getstream';
import ActivityList from "./components/ActivityList/ActivityList";
import FeedSelector from "./components/FeedSelector/FeedSelector";
import Login from "./components/Login";
import PostToFeed from "./components/PostToFeed/PostToFeed";
import { Banner } from "./components/Banner/Banner";

function App() {
  const [activeFeed, setActiveFeed] = useState("timeline");
  const [client, setClient] = useState("");
  const [feed, setFeed] = useState("");
  const [view, setView] = useState("login");

  return (
    <div className="App">
      {view === "login" ? (
        <Login setView={setView} setClient={setClient} setFeed={setFeed} />
      ) : (
        <div>
          <Banner />
          <FeedSelector setFeed={setFeed} setActiveFeed={setActiveFeed} />
          <PostToFeed client={client} feed={feed} />
          <ActivityList client={client} feed={feed} activeFeed={activeFeed} />
        </div>
      )}
    </div>
  );
}

export default App;
