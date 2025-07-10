import { configureStore } from "@reduxjs/toolkit";
import allSongsReducer from '../fetchSongs/fetchSongsSlice';
import allPlaylistsReducer from '../fetchPlaylists/fetchPlaylistsSlice'
import songPlayerReducer from "../songPlayer/songPlayerSlice";
import queueReducer from "../queueSlice/queueSlice"
import searchReducer from "../searchSlice/searchSlice"
import {createLogger} from "redux-logger"

const logger = createLogger();

const store = configureStore({
    reducer:{
        allSongsStore: allSongsReducer,
        allPlaylistsStore: allPlaylistsReducer,
        songPlayerStore: songPlayerReducer,
        queueStore: queueReducer,
        searchStore: searchReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store