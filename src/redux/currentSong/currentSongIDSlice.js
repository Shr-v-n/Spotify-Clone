import { createSlice} from "@reduxjs/toolkit";

const initialState = {
  currentSongID: 0,
  songChosen: false,
  playing: false
};

const currentSongIDSlice = createSlice({
    name: 'currentSongReducer',
    initialState: initialState,
    reducers:{
        chooseSong: (state,action) => {
            state.currentSongID = action.payload;
            state.songChosen = true;
        }
    }
})

export default currentSongIDSlice.reducer;
export const  {chooseSong} = currentSongIDSlice.actions;