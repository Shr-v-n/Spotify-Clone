import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPlaylists } from './fetchPlaylistsSlice';

function FetchPlaylistsView() {
  const dispatch = useDispatch();
  const allPlaylistsReducer = useSelector(state => state.allPlaylistsStore);

  useEffect(() => {
    dispatch(fetchAllPlaylists());
  }, [dispatch]);

  return (
    <>
      {allPlaylistsReducer.loading && <h1>Loading Playlists...</h1>}
      {!allPlaylistsReducer.loading && allPlaylistsReducer.allPlaylists.length > 0 ? (
        <div>
          {allPlaylistsReducer.allPlaylists.map(playlist => (
            <div key={playlist.id} style={{ marginBottom: '30px' }}>
              <h2>{playlist.name}</h2>
              {playlist.image && <img src={playlist.image} alt={playlist.name} width="200" />}
              <p><strong>Song IDs:</strong> {playlist.songIds.join(', ')}</p>
              <hr />
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}

export default FetchPlaylistsView;
