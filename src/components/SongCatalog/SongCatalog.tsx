import Styles from "./SongCatalog.module.css";
import React, { useEffect, useCallback } from "react";
import SongCard from "./SongCard/SongCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSongs } from "../../redux/fetchSongs/fetchSongsSlice";
import type { RootState, AppDispatch } from "../../redux/store/store";
import { chooseSong } from "../../redux/songPlayer/songPlayerSlice";

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

  const searchQuery = useSelector(
    (state: RootState) => state.searchStore.query
  );

  const {
    allSongs,
  }: {
    allSongs: SongInterface[];
  } = allSongsReducer;

  const currentSongID = useSelector(
    (state: RootState) => state.songPlayerStore.currentSongID
  );

  const handleChoose = useCallback(
    (id: Number) => () => dispatch(chooseSong(id)
  ),[dispatch]);

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
          ? allSongs
              .filter((song) =>
                song.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((song) => {
                return (
                  <SongCard
                    song={song}
                    key={song.id}
                    onClick={handleChoose(song.id)}
                    selected={song.id === currentSongID}
                  />
                );
              })
          : null}
      </div>
    </div>
  );
};

export default SongCatalog;
