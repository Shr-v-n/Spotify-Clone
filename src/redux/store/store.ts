import { configureStore } from "@reduxjs/toolkit";
import allSongsReducer from '../fetchSongs/fetchSongsSlice';
import allPlaylistsReducer from '../fetchPlaylists/fetchPlaylistsSlice'
import currentSongIDReducer from "../currentSong/currentSongIDSlice";
// import {createLogger} from 'redux-logger';

// const logger = createLogger();

const store = configureStore({
    reducer:{
        allSongsStore: allSongsReducer,
        allPlaylistsStore: allPlaylistsReducer,
        currentSongIDStore: currentSongIDReducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store