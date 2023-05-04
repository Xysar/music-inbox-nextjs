export const retrieveAlbumByName = async (input: string) => {
  let albumID: string = "";
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${input}&api_key=${process.env.NEXT_PUBLIC_LASTFM_KEY}&format=json`
  );
  const jsonData = await response.json();
  const album = jsonData.results.albummatches.album[0];
  return album;
};

export const retrieveAlbumById = async (albumId: string) => {
  const album = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${process.env.NEXT_PUBLIC_LASTFM_KEY}&mbid=${albumId}&format=json`
  );
  const albumData = await album.json();
  return albumData.album;
};
