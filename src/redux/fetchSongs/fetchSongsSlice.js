import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { songsInfo } from '../../data/songsInfo'


const initialState = {
    allSongs: [],
    loading: false,
    error: ''
}

const fetchAllSongs = createAsyncThunk('songs/fetchAllSongs',() => {
    return new Promise ((resolve,reject) => {
        try{
            resolve(songsInfo);
        }
        catch (error){
            reject(error);
        }
    })
})

const allSongsSlice = createSlice({
    name: 'allSongsReducer',
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchAllSongs.pending, (state) => {
            state.loading = true;
            state.error = '';
        });
        builder.addCase(fetchAllSongs.fulfilled, (state,action) => {
            state.loading = false;
            state.error = '';
            state.allSongs = action.payload;
        });
        builder.addCase(fetchAllSongs.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export {fetchAllSongs}
export default allSongsSlice.reducer