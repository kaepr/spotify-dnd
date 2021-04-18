import React, { useEffect, useState } from 'react';
import { SpotifyAuthListener } from 'react-spotify-auth';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from 'lodash';

import Card from '../Card/Card';
import UserPlaylist from '../Panes/UserPlaylist';
import SpotifyPlaylist from '../Panes/SpotifyPlaylist';

const Home = ({ dataSpotify }) => {
  console.log('data spotify = ', dataSpotify);

  const [state, setState] = useState({
    userlist: {
      title: 'User List',
      items: [],
    },
    spotifylist: {
      title: 'Spotify List',
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
    <div className="flex w-full justify-around">
      {/* <SpotifyPlaylist data={data} />
      <UserPlaylist /> */}

      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
          return (
            <div key={key} className="w-full p-2">
              <h3>{data.title}</h3>
              <Droppable droppableId={key}>
                {(provided, snapshot) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="w-full bg-gray-600 p-10 flex flex-col"
                    >
                      {data.items.map((el, index) => {
                        return (
                          <Draggable
                            key={el.uuid}
                            index={index}
                            draggableId={el.uuid}
                          >
                            {(provided, snapshot) => {
                              return (
                                <Card
                                  provided={provided}
                                  data={el}
                                  snapshot={snapshot}
                                />
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
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
