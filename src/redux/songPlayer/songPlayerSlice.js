import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSongID: 0,
  songChosen: false,
  playing: false,
  looped: false,
  volume: 0.5,
  isMuted: false
};

const songPlayerSlice = createSlice({
    name: 'songPlayerReducer',
    initialState: initialState,
    reducers:{
        chooseSong: (state,action) => {
            state.currentSongID = action.payload;
            state.songChosen = true;
            state.playing = true;
        },
        pauseSong: (state) => {
            state.playing = false;
        },
        playSong: (state) => {
            state.playing = true;
        },
        loopSong: (state) => {
            state.looped = true;
        },
        unLoopSong: (state) => {
            state.looped = false;
        },
        setVolume: (state, action) => {
            state.volume = action.payload;
            state.isMuted = action.payload === 0;
        },
        toggleMute: (state) => {
            if(state.isMuted){
                state.isMuted = false;
                state.volume = 0.5;
            }
            else{
                state.isMuted = true;
                state.volume = 0; 
            }
        }
    }
})

export default songPlayerSlice.reducer;
export const  {chooseSong,pauseSong,playSong,loopSong,unLoopSong,setVolume,toggleMute} = songPlayerSlice.actions;