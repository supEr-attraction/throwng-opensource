const listenSong = (title: string, artist: string) => {
  const musicName = encodeURIComponent(title);
  const artistName = encodeURIComponent(artist);
  const youtubeMusicWebURL = `https://music.youtube.com/search?q=${musicName}-${artistName}`;
  window.location.href = youtubeMusicWebURL;
};

export default listenSong;
