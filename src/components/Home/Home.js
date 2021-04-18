import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { SpotifyAuthListener } from 'react-spotify-auth';

import UserPlaylist from '../Panes/UserPlaylist';
import SpotifyPlaylist from '../Panes/SpotifyPlaylist';
import { getOptions } from '../../utils/api';

const Home = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const token = Cookies.get('spotifyAuthToken');
  // console.log('token : ', token);

  useEffect(() => {
    const getPlayists = async () => {
      setLoading(true);
      try {
        const options = getOptions(token);
        const res = await axios(options);
        setData(res.data.playlists.items);
        console.log('res = ', res.data.playlists.items);
      } catch (err) {
        console.log('Error in fetching API call');
      }
      setLoading(false);
    };

    getPlayists();
  }, []);

  if (loading) {
    return (
      <div className="flex">
        <div className="flex-grow animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex">
      <SpotifyPlaylist data={data} />
      <UserPlaylist />
      <SpotifyAuthListener />
    </div>
  );
};

export default Home;
