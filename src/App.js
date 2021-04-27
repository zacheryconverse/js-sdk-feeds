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
  // const [token, setToken] = useState('');
  const [view, setView] = useState('login');

  // useEffect(() => {
  //   axios.post('http://localhost:8000/token', {})
  //   // .then((res) => setToken(res.data))
  //   .catch((err) => console.error(err));
  // }, []);

  // const client = stream.connect(key, token, appID);
  // console.log('CLIENT', client);

  return (
    <div className="App">
      {view === 'login' ? (
        <Login setView={setView} />
        ) : view === 'feed' ? (
          <Feed />
        ) : '' }
    </div>
  )
}

export default App;
