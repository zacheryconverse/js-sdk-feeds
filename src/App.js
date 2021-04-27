import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Feed from './components/Feed';
// import stream from 'getstream';

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
