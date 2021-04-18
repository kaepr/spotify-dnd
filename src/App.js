import React from 'react';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import Cookies from 'js-cookie';
import 'react-spotify-auth/dist/index.css';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';

function App() {
  const spotifyClient = '84d766bc595e4f4e8c0169f861d4d8e2';
  const token = Cookies.get('spotifyAuthToken');
  return (
    <div>
      {token ? (
        <div>
          <Navbar />
          <Home />
        </div>
      ) : (
        <SpotifyAuth
          redirectUri="http://localhost:3000"
          clientID={spotifyClient}
          scopes={[Scopes.userReadPrivate, 'user-read-email']} // either style will work
        />
      )}
    </div>
  );
}

export default App;
