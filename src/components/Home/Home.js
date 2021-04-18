import React, { useEffect, useState } from 'react';
import { SpotifyAuthListener } from 'react-spotify-auth';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import _ from 'lodash';

import Column from '../Column/Column';

const Home = ({ dataSpotify }) => {
  // console.log('data spotify = ', dataSpotify);

  const [state, setState] = useState({
    userlist: {
      title: 'My Playlists',
      items: [],
    },
    spotifylist: {
      title: 'Featured Playlists',
      items: dataSpotify,
    },
  });

  useEffect(() => {
    try {
      const userdata = JSON.parse(localStorage.getItem('list'));

      if (userdata !== [] && userdata !== null) {
        setState((prev) => {
          prev = { ...prev };
          prev['userlist'].items = userdata;
          return prev;
        });
      }
    } catch (err) {
      console.log('error in getting local storage');
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('list', JSON.stringify(state.userlist.items));
    } catch (err) {
      console.log('Error in setting local storage');
    }
  });

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    const itemCopy = { ...state[source.droppableId].items[source.index] };

    setState((prev) => {
      prev = { ...prev };

      prev[source.droppableId].items.splice(source.index, 1);

      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );
      return prev;
    });
  };

  return (
    <div className="pt-2 flex w-full justify-around text-gray-100 bg-black ">
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
          return (
            <div
              key={key}
              className="w-full pt-4 m-4 rounded-xl bg-gray-600 text-center "
            >
              <div className="text-3xl font-extrabold">{data.title}</div>
              <Droppable droppableId={key}>
                {(provided) => {
                  return <Column provided={provided} data={data} />;
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>

      <SpotifyAuthListener />
    </div>
  );
};

export default Home;
