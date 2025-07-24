import Styles from "./SongCatalog.module.css";
import React, { useEffect, useCallback, useMemo } from "react";
import SongCard from "./SongCard/SongCard";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { fetchAllSongs } from "../../redux/fetchSongs/fetchSongsSlice";
import type { RootState, AppDispatch } from "../../redux/store/store";
import { chooseSong } from "../../redux/songPlayer/songPlayerSlice";
import { setQueue } from "../../redux/queueSlice/queueSlice";

interface SongInterface {
  id: number;
  title: string;
  artist: string[];
  file: string;
  img: string;
  lyricsAvailable: boolean;
  lyrics: string;
  durationDisplay: string;
  durationSeconds: number;
}

const SongCatalog = () => {
  const dispatch: AppDispatch = useDispatch();

  const [activeTab, setActiveTab] = React.useState<"all" | "queue">("all");

const queueSongIDs = useSelector(
  (state: RootState) => state.queueStore.queueSongIDs
);

const handleTabClick = useCallback((tab: "all" | "queue") => {
  setActiveTab(tab);
}, []);


  const allSongs = useSelector(
    (state: RootState) => state.allSongsStore.allSongs,
    shallowEqual
  );

  const searchQuery = useSelector(
    (state: RootState) => state.searchStore.query
  );

  const allPlaylists = useSelector(
    (state: RootState) => state.allPlaylistsStore.allPlaylists,
    shallowEqual
  );

  const currentSongID = useSelector(
    (state: RootState) => state.songPlayerStore.currentSongID
  );

  const defaultPlaylist = useMemo(
    () => allPlaylists.find((playlist) => playlist.id === 0),
    [allPlaylists]
  );

  const handleChoose = useCallback(
  (id: number) => {
    if (id !== currentSongID) {
      dispatch(chooseSong(id));
    }

    if (activeTab === "all") {
      if (defaultPlaylist) {
        dispatch(
          setQueue({
            id: defaultPlaylist.id,
            songs: defaultPlaylist.songIds,
          })
        );
      }
    }
  },
  [dispatch, defaultPlaylist, currentSongID, activeTab]
  );

  useEffect(() => {
    dispatch(fetchAllSongs());
  }, [dispatch]);

  return (
  <div className={Styles.mainContainer}>
    <div className={Styles.header}>
  <p
    onClick={() => handleTabClick("all")}
    className={activeTab === "all" ? Styles.activeTab : ""}
  >
    All Songs
  </p>
  {
    
  <p
    onClick={() => handleTabClick("queue")}
    className={activeTab === "queue" ? Styles.activeTab : ""}
  >
    Queue
  </p>

  }
</div>

<div className={Styles.allSongsContainer}>
  {(activeTab === "all"
    ? allSongs
    : allSongs.filter((song: SongInterface) => queueSongIDs.includes(song.id))
  )
    .filter((song: SongInterface) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      song.artist.some((artistName) =>
       artistName.toLowerCase().includes(searchQuery.toLowerCase())
  )
    )
    .map((song: SongInterface) => (
      <SongCard
        song={song}
        key={song.id}
        onClick={() => handleChoose(song.id)}
        selected={song.id === currentSongID}
      />
    ))}
</div>

  </div>
);

};

export default React.memo(SongCatalog);
