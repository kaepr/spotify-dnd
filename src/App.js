import React, { useEffect, useState } from 'react';
import { SpotifyAuth } from 'react-spotify-auth';
import Cookies from 'js-cookie';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import 'react-spotify-auth/dist/index.css';
import './App.css';
import { getOptions } from './utils/api';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';

function App() {
  const spotifyClient = 'd9549e8167064e369e7c84b6bba6da7d';
  const token = Cookies.get('spotifyAuthToken');

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getPlayists = async () => {
      setLoading(true);
      try {
        const options = getOptions(token);
        const res = await axios(options);

        const playlistData = res.data.playlists.items || [];

        playlistData.forEach((x, _) => {
          x['uuid'] = uuid();
        });
        console.log('res data', res.data.playlists.items);
        setData(res.data.playlists.items);
      } catch (err) {
        Cookies.remove('spotifyAuthToken');
        console.log('Error in fetching API call');
      }
      setLoading(false);
    };

    getPlayists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {token ? (
        <div>
          <Navbar />
          {loading ? (
            <div className="animate-spin" />
          ) : (
            <Home dataSpotify={data} />
          )}
        </div>
      ) : (
        <SpotifyAuth
          redirectUri="http://localhost:3000"
          clientID={spotifyClient}
          title="Sign in with Spotify. Reload if successfully logged in"
          onAccessToken={() => {
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}

export default App;
