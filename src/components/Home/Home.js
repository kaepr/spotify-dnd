import React, { useEffect, useState } from 'react';
import { SpotifyAuthListener } from 'react-spotify-auth';
import { v4 as uuid } from 'uuid';

import UserPlaylist from '../Panes/UserPlaylist';
import SpotifyPlaylist from '../Panes/SpotifyPlaylist';

const Home = ({ data }) => {
  console.log('data here = ', data);

  return (
    <div className="flex">
      <SpotifyPlaylist data={data} />
      <UserPlaylist />
      <SpotifyAuthListener />
    </div>
  );
};

export default Home;
