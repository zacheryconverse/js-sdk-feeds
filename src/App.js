import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Feed from "./components/Feed";
// import stream from 'getstream';

function App() {
  const [view, setView] = useState("login");
  const [client, setClient] = useState("");
  const [feed, setFeed] = useState("");

  return (
    <div className="App">
      {view === "login" ? (
        <Login setView={setView} setClient={setClient} setFeed={setFeed} />
      ) : view === "feed" ? (
        <Feed client={client} feed={feed} />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
