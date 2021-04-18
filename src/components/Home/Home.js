import React, { useEffect, useState } from 'react';
import { SpotifyAuthListener } from 'react-spotify-auth';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from 'lodash';

import UserPlaylist from '../Panes/UserPlaylist';
import SpotifyPlaylist from '../Panes/SpotifyPlaylist';

const item = {
  id: uuid(),
  name: 'Clean the house',
};

const item2 = {
  id: uuid(),
  name: 'Wash the Car',
};

const Home = ({ data }) => {
  console.log('data here = ', data);

  const [state, setState] = useState({
    userlist: {
      title: 'User List',
      items: [item, item2],
    },
    spotifylist: {
      title: 'Spotify List',
      items: [],
    },
  });

  const handleDragEnd = ({ destination, source }) => {
    console.log('dest:', destination);
    console.log('src:', source);

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
          console.log(data, key);
          return (
            <div key={key} className="pr-10 border-black min-h-screen">
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
                            key={el.id}
                            index={index}
                            draggableId={el.id}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  className="text-lg p-5 bg-blue-600"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {el.name}
                                </div>
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
