import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Login from './components/Login';
import Feed from './components/Feed';
// import stream from 'getstream';
const stream = require('getstream');
const key = process.env['REACT_APP_KEY'];
const appID = process.env["REACT_APP_ID"];

function App() {
  const [view, setView] = useState('login');
  const [client, setClient] = useState("");

  return (
    <div className="App">
      {view === 'login' ? (
        <Login setView={setView} setClient={setClient} />
        ) : view === 'feed' ? (
          <Feed client={client} />
        ) : '' }
    </div>
  )
}

export default App;
