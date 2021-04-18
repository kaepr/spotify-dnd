export const getOptions = (token) => {
  const optons = {
    method: 'GET',
    url:
      'https://api.spotify.com/v1/browse/featured-playlists?country=IN&limit=10',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return optons;
};
