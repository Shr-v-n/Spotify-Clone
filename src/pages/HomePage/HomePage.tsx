import Styles from './HomePage.module.css'
import Navbar from '../../components/navbar/Navbar'
import Library from '../../components/Library/Library'
import SongCatalog from '../../components/SongCatalog/SongCatalog'
import CurrentSong from '../../components/CurrentSong/CurrentSong'
import Footer from '../../components/Footer/Footer'

const FrontPage = () => {
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
