import { createSlice,createAsyncThunk,PayloadAction } from '@reduxjs/toolkit'
import { playlistsInfo } from '../../data/playlistsInfo'

 interface PlaylistInterface {
  id: number;
  name: string;
  image: string;
  description: string;
  songIds: number[];
}

interface AllPlaylistsState {
  allPlaylists: PlaylistInterface[];
  loading: boolean;
  error: string;
}

const initialState:AllPlaylistsState = {
    allPlaylists: [],
    loading: false,
    error: '',
  };
  
  const fetchAllPlaylists = createAsyncThunk<PlaylistInterface[]>(
  'playlists/fetchAllPlaylists',
  () => {
    return new Promise<PlaylistInterface[]>((resolve, reject) => {
      try {
        resolve(playlistsInfo);
      } catch (error) {
        reject(error);
      }
    });
  }
);

  
  const allPlaylistsSlice = createSlice({
  name: 'allPlaylistsReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPlaylists.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchAllPlaylists.fulfilled, (state, action: PayloadAction<PlaylistInterface[]>) => {
        state.loading = false;
        state.allPlaylists = action.payload;
        state.error = '';
      })
      .addCase(fetchAllPlaylists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message !== undefined ? action.error.message : "Error";
      });
  },
});
  
  export { fetchAllPlaylists }
  export default allPlaylistsSlice.reducer