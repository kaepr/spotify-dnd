import React, { useEffect, useState } from 'react';
import axios from 'axios';

import UserPlaylist from '../Panes/UserPlaylist';
import SpotifyPlaylist from '../Panes/SpotifyPlaylist';

import { options } from '../../utils/api';

const Home = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlayists = async () => {
      setLoading(true);
      const res = await axios(options);
      setData(res.data.playlists);
      console.log('res = ', res.data.playlists);
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
    </div>
  );
};

export default Home;
