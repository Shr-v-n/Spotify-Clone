import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  queueID: 0,        
  queueSongIDs: [],   
};

const queueSlice = createSlice({
  name: 'queueReducer',
  initialState: initialState,
  reducers: {
    setQueue: (state, action) => {
      const { queueID, songIDs } = action.payload;
      state.queueID = queueID;
      state.queueSongIDs = songIDs;
    },
    clearQueue: (state) => {
      state.queueID = 0;
      state.queueSongIDs = [];
    }
  }
});

export const { setQueue, clearQueue } = queueSlice.actions;
export default queueSlice.reducer;
