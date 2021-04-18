// export const options = {
//   method: 'GET',
//   url:
//     'https://api.spotify.com/v1/browse/featured-playlists?country=IN&limit=10',
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//     Authorization:
//       'Bearer BQDpoc45yypCtkykXKKKoDSjDk6yIZGK1Ja7eVYROEq5tiSmn8LZSP-gW602w4Ruzq62t-EtmSC4Vtix5t59R3s87NyjiFbHqLHzpSKMuwELiwfmGRVdx5yeNjTfqkoNonSuQbdxxSk5Su4YbuyJPxzrOUpQ9ZLtIIE',
//   },
// };

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
