import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playSong, pauseSong } from '../../redux/songPlayer/songPlayerSlice';
import type { RootState } from '../../redux/store/store';
import Styles from './HomePage.module.css'
import Navbar from '../../components/navbar/Navbar'
import Library from '../../components/Library/Library'
import SongCatalog from '../../components/SongCatalog/SongCatalog'
import CurrentSong from '../../components/CurrentSong/CurrentSong'
import Footer from '../../components/Footer/Footer'


const FrontPage = () => {
   const dispatch = useDispatch();
  const isPlaying = useSelector((state: RootState) => state.songPlayerStore.playing);
  const songChosen = useSelector((state: RootState) => state.songPlayerStore.songChosen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName || '')) {
        e.preventDefault();
        if (songChosen) {
          dispatch(isPlaying ? pauseSong() : playSong());
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch, isPlaying, songChosen]);

  return (
    <div className={Styles.mainContainer}>

      <Navbar />

      <div className={Styles.middleContainer}> 

        <Library />

        <SongCatalog />

        <CurrentSong />

      </div>

      <Footer />

    </div>
  )
}

export default FrontPage
