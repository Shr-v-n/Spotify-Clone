import { createSlice } from "@reduxjs/toolkit";

interface QueueState {
  queueID: Number;
  queueSongIDs: Number[];
}

const initialState: QueueState = {
  queueID: 0,
  queueSongIDs: [],
};

const queueSlice = createSlice({
  name: "queueReducer",
  initialState,
  reducers: {
    setQueue: (state, action) => {
      state.queueID = action.payload.id;
      state.queueSongIDs = action.payload.songs;
    },
    shuffleSongs:(state) => {
      const shuffledSongs = state.queueSongIDs.sort(() => Math.random() - 0.5);
      state.queueSongIDs = shuffledSongs;
    },
    clearQueue: (state) => {
      state.queueID = 0;
      state.queueSongIDs = [];
    },
  },
});

export const { setQueue, clearQueue, shuffleSongs } = queueSlice.actions;
export default queueSlice.reducer;
