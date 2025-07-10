import Styles from "./Library.module.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";
import { chooseSong } from "../../redux/songPlayer/songPlayerSlice";
import { setQueue } from "../../redux/queueSlice/queueSlice";
import { useEffect } from "react";
import { fetchAllPlaylists } from "../../redux/fetchPlaylists/fetchPlaylistsSlice";
import type { AppDispatch } from "../../redux/store/store";

export interface PlaylistInterface {
  id: number;
  name: string;
  image: string;
  description: string;
  songIds: number[];
}

const Library = () => {
  const dispatch: AppDispatch = useDispatch();

  const { allPlaylists, loading, error } = useSelector(
    (state: RootState) => state.allPlaylistsStore
  );
  const playlists = allPlaylists as PlaylistInterface[];
  const currentQueueID = useSelector(
    (state: RootState) => state.queueStore.queueID
  );

  const handleSelectPlaylist = (playlist: any) => {
    if (playlist.songIds.length > 0) {
      dispatch(
        setQueue({
          id: playlist.id,
          songs: playlist.songIds,
        })
      );
      dispatch(chooseSong(playlist.songIds[0]));
    }
  };

  useEffect(() => {
    dispatch(fetchAllPlaylists());
  }, [dispatch]);

  return (
    <div className={Styles.mainContainer}>
      <header className={Styles.header}>
        <p>Your Library</p>
      </header>

      <div className={Styles.playlistsContainer}>
        {playlists
          .filter((pl) => pl.id !== 0)
          .map((playlist) => (
            <div
              key={playlist.id}
              className={`${Styles.playlistItem} ${
                currentQueueID === playlist.id ? Styles.active : ""
              }`}
              onClick={() => handleSelectPlaylist(playlist)}
            >
              <img className={Styles.playlistImage} src = {playlist.image} alt={playlist.name}/>

              <div className={Styles.playlistText}>
                <p className={Styles.playlistName}>{playlist.name}</p>
                <p className={Styles.playlistDesc}>{playlist.description}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Library;
