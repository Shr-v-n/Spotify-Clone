import Styles from "./SongCatalog.module.css";
import React, { useEffect } from "react";
import SongCard from "./SongCard/SongCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSongs } from "../../redux/fetchSongs/fetchSongsSlice";
import type { RootState, AppDispatch } from "../../redux/store/store";
import { chooseSong } from "../../redux/currentSong/currentSongIDSlice";

interface SongInterface {
  id: Number;
  title: String;
  artist: String;
  file: String;
  img: String;
  lyricsAvailable: Boolean;
  lyrics: String;
  durationDisplay: String;
  durationSeconds: Number;
}

const SongCatalog = () => {
  const dispatch: AppDispatch = useDispatch();
  const allSongsReducer = useSelector(
    (state: RootState) => state.allSongsStore
  );

  const {
    allSongs,
    loading,
    error,
  }: {
    allSongs: SongInterface[];
    loading: boolean;
    error: string | null;
  } = allSongsReducer;

  useEffect(() => {
    dispatch(fetchAllSongs());
  }, [dispatch]);

  return (
    <div className={`${Styles.mainContainer}`}>
      <div className={`${Styles.header}`}>
        <p>All songs</p>
      </div>

      <div className={`${Styles.allSongsContainer}`}>
        {allSongs.length > 0
          ? allSongs.map((song) => {
              return <SongCard song={song} key={song.id} onClick={() => dispatch(chooseSong(song.id))}/>;
            })
          : null}
      </div>
    </div>
  );
};

export default SongCatalog;
