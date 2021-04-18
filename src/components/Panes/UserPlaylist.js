import React, { useState, useEffect } from 'react';

const UserPlaylist = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('my-list');
    if (data) {
      setUserList(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('my-list', JSON.stringify(userList));
  });

  return <div className="flex-grow">User Playlist</div>;
};

export default UserPlaylist;
