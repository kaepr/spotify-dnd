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
  const spotifyClient = '84d766bc595e4f4e8c0169f861d4d8e2';
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

        setData(res.data.playlists.items);
      } catch (err) {
        console.log('Error in fetching API call');
      }
      setLoading(false);
    };

    getPlayists();
  }, []);

  return (
    <div>
      {token ? (
        <div>
          <Navbar />
          {loading ? <div className="animate-spin" /> : <Home data={data} />}
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
