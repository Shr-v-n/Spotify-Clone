import { useEffect, useRef } from "react";
import Styles from "./CurrentSong.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";
import { artistInfo } from "../../data/artistInfo";

interface SongInterface {
  id: number;
  title: string;
  artist: string[];
  album?: string;
  file: string;
  img: string;
  lyricsAvailable: boolean;
  lyrics: string;
  durationDisplay: string;
  durationSeconds: number;
}

const CurrentSong = () => {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const songPlayer = useSelector((state: RootState) => state.songPlayerStore);
  const allSongs = useSelector(
    (state: RootState) => state.allSongsStore.allSongs
  ) as SongInterface[];

  const currentSong = allSongs.find(
    (song) => song.id === songPlayer.currentSongID
  ) as SongInterface;

  const currentArtists = currentSong?.artist?.length
    ? artistInfo.filter((info) => currentSong.artist.includes(info.name))
    : [];

  useEffect(() => {
    if (songPlayer.songChosen && mainContainerRef.current) {
      mainContainerRef.current.style.display = "flex";
    }
  }, [songPlayer.songChosen]);

  return (
    <div className={Styles.mainContainer} ref={mainContainerRef}>
      {songPlayer.songChosen && currentSong && (
        <>
          <img src={currentSong.img} alt="Song" className={Styles.songImg} />

          <div className={Styles.details}>
            <h2 className={Styles.title}>{currentSong.title}</h2>

            {currentSong.artist.length ? (
              <>
                <p className={Styles.primaryArtist}>{currentSong.artist[0]}</p>
                {currentSong.artist.slice(1).map((a, i) => (
                  <p className={Styles.featuringArtist} key={i}>
                    ft. {a}
                  </p>
                ))}
              </>
            ) : (
              <p className={Styles.primaryArtist}>Artist unknown</p>
            )}

            {currentSong.album && (
              <p className={Styles.album}>Album: {currentSong.album}</p>
            )}

            <p className={Styles.duration}>Duration: {currentSong.durationDisplay}</p>
          </div>

          {currentSong.lyricsAvailable && currentSong.lyrics && (
            <div className={Styles.lyricsContainer}>
              <pre className={Styles.lyrics}>{currentSong.lyrics}</pre>
            </div>
          )}

          {currentArtists.length > 0 && (
            <div className={Styles.artistDetailsContainer}>
              {currentArtists.map((artist, index) => (
                <div className={Styles.artistCard} key={index}>
                  <p className={Styles.artistName}>{artist.name}</p>
                  <p className={Styles.monthlyListeners}>
                    {artist.monthlyListeners.toLocaleString()} monthly listeners
                  </p>
                  <p className={Styles.artistBio}>{artist.bio}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CurrentSong;
