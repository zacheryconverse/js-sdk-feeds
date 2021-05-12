import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import PostToFeed from "./components/PostToFeed/PostToFeed";
// import stream from 'getstream';
import FeedSelector from './components/FeedSelector/FeedSelector'
import ActivityList from './components/ActivityList/ActivityList'
import { Banner } from './components/Banner/Banner'
function App() {
  const [view, setView] = useState("login");
  const [client, setClient] = useState("");
  const [feed, setFeed] = useState("");
  const [activeFeed, setActiveFeed] = useState('myfeed')

  // const followZach = () => {
  //   feed.follow('user', 'Zachery')
  // }
  return (
    <div className="App">
      {view === "login" ? (
        <Login setView={setView} setClient={setClient} setFeed={setFeed} />
      ) : view === "feed" ? (
        <div>
        {/* <Feed client={client} feed={feed} /> */}
        <Banner />
        <FeedSelector activeFeed={activeFeed} setActiveFeed={setActiveFeed}/>
        <PostToFeed client={client}/>
        <ActivityList client={client} feed={feed} />
        {/* <button onClick={() => followZach()}>Follow Zach</button> */}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
