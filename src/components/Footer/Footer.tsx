import Styles from "./Footer.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";

interface SongInterface {
  id: number;
  title: string;
  artist: string;
  file: string;
  img: string;
  lyricsAvailable: boolean;
  lyrics: string;
  durationDisplay: string;
  durationSeconds: number;
}

const Footer = () => {
  const currentSongID = useSelector(
    (state: RootState) => state.currentSongIDStore.currentSongID
  );
  const allSongs = useSelector(
    (state: RootState) => state.allSongsStore.allSongs
  ) as SongInterface[];

  const currentSong = allSongs.find(
    (song) => song.id === currentSongID
  ) as SongInterface;
  return (
    <div className={Styles.mainContainer}>
      {currentSong != undefined ? (
        <>
          <div className={Styles.songDataContainer}>
            <img id={`${Styles.imgContainer}`} src={currentSong.img} />
            <p id={`${Styles.songNameContainer}`}>
              {currentSong.title} - {currentSong.artist}
            </p>
          </div>

          <div className={Styles.songControlsContainer}>
            <audio controls id={Styles.audioControls} key={currentSongID} autoPlay> 
              <source src={currentSong.file} type="audio/mp3"></source>
            </audio>
          </div>

          <div className={Styles.songVolumeContainer}></div>
        </>
      ) : null}
    </div>
  );
};

export default Footer;
