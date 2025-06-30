import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { fetchAllSongs } from './fetchSongsSlice'

function FetchSongsView() {
    const dispatch = useDispatch();
    const allSongsReducer = useSelector(state => state.allSongsStore);

    useEffect(() => {
        dispatch(fetchAllSongs())
    },[dispatch])

  return (
    <>
        {allSongsReducer.loading && <h1>Loading!</h1>}
        {!allSongsReducer.loading && allSongsReducer.allSongs.length>0 ? 
          <div>
            {
              allSongsReducer.allSongs.map(song => {
                return <React.Fragment key={song.id}>
                <h1>{song.title} {song.id}</h1>
                  <audio controls>
                    <source src={song.file} type='audio/mp3' />
                  </audio>
                  <br />
                  </React.Fragment>
              })
          }
          </div>
        : null}
    </>
  )
}

export default FetchSongsView
