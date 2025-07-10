import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
};

const searchSlice = createSlice({
  name: 'searchReducer',
  initialState: initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
      console.log(state.query);
    },
    clearQuery: (state) => {
      state.query = "";
    }
  }
});

export const { setQuery, clearQuery } = searchSlice.actions;
export default searchSlice.reducer;
