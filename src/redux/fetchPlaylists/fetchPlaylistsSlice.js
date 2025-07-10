import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { playlistsInfo } from '../../data/playlistsInfo'



const initialState = {
    allPlaylists: [],
    loading: false,
    error: '',
  };
  
  const fetchAllPlaylists = createAsyncThunk('playlists/fetchAllPlaylists', () => {
    return new Promise((resolve, reject) => {
        try {
            resolve(playlistsInfo);
        } catch (error) {
            reject(error);
        }
    });
  });
  
  const allPlaylistsSlice = createSlice({
    name: 'allPlaylistsReducer',
    initialState: initialState,
    extraReducers: (builder) => {
      builder.addCase(fetchAllPlaylists.pending, (state) => {
        state.loading = true;
        state.error = '';
      });
      builder.addCase(fetchAllPlaylists.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.allPlaylists = action.payload;
        console.log(state)
      });
      builder.addCase(fetchAllPlaylists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    },
  });
  
  export { fetchAllPlaylists }
  export default allPlaylistsSlice.reducer