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
    clearQueue: (state) => {
      state.queueID = 0;
      state.queueSongIDs = [];
    },
  },
});

export const { setQueue, clearQueue } = queueSlice.actions;
export default queueSlice.reducer;
